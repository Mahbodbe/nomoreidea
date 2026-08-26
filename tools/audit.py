#!/usr/bin/env python3
"""Responsive bilingual audit with real mobile emulation."""
import asyncio, json, subprocess, sys, time, urllib.request
import websockets

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8899/index.html"
WIDTHS = [320, 375, 414, 768, 1280, 1920]
PORT = 9333

JS_AUDIT = r'''(() => {
  const out = {
    lang: document.documentElement.lang || '',
    dir: document.documentElement.dir || '',
    faMode: document.body.classList.contains('fa-mode'),
    vw: innerWidth, overflow: [], taps: [], twoLine: [], contrast: []
  };
  out.docScrollW = document.documentElement.scrollWidth;
  out.docClientW = document.documentElement.clientWidth;
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if ((r.width || r.height) && (r.right > innerWidth + 1 || r.left < -1)) {
      out.overflow.push({sel: el.tagName.toLowerCase()+'.'+String(el.className||'').split(' ')[0], left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width)});
    }
  }
  for (const el of document.querySelectorAll('a,button')) {
    const r=el.getBoundingClientRect(); if(!r.width&&!r.height)continue;
    const cs=getComputedStyle(el); if(cs.position==='absolute'&&r.left<0)continue;
    const name=(el.textContent||'').trim().slice(0,44);
    if(r.height<44)out.taps.push({name,h:Math.round(r.height)});
    const lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.2, lines=Math.round(r.height/lh);
    if(lines>1&&name&&name.length<30&&!el.querySelector('h1,h2,h3,p,ul'))out.twoLine.push({name,lines,h:Math.round(r.height)});
  }
  const lum=c=>{const[r,g,b]=c.map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b};
  const parse=s=>{const m=s.match(/[\d.]+/g);return m?m.slice(0,3).map(Number):null};
  const bgOf=el=>{let n=el;while(n&&n!==document.documentElement){const c=getComputedStyle(n).backgroundColor,p=parse(c);if(p&&!/rgba\(0, 0, 0, 0\)|transparent/.test(c))return p;n=n.parentElement}return[255,255,255]};
  for(const el of document.querySelectorAll('body *')){const direct=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>1);if(!direct)continue;const cs=getComputedStyle(el),fg=parse(cs.color);if(!fg)continue;const bg=bgOf(el),a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05),px=parseFloat(cs.fontSize),large=px>=24||(parseInt(cs.fontWeight)>=700&&px>=18.66),need=large?3:4.5;if(ratio<need)out.contrast.push({sel:el.tagName.toLowerCase()+'.'+String(el.className||'').split(' ')[0],txt:(el.textContent||'').trim().slice(0,32),ratio:+ratio.toFixed(2),need,px:Math.round(px)});}
  return out;
})()'''

async def audit(ws_url):
    results = {}
    async with websockets.connect(ws_url, max_size=40_000_000) as ws:
        msg_id = 0
        async def send(method, params=None):
            nonlocal msg_id
            msg_id += 1
            await ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get("id") == msg_id:
                    return msg

        await send("Page.enable")
        for lang in ("en", "fa"):
            results[lang] = {}
            for width in WIDTHS:
                mobile = width < 768
                await send("Emulation.setDeviceMetricsOverride", {"width": width, "height": 900, "deviceScaleFactor": 2 if mobile else 1, "mobile": mobile, "screenWidth": width, "screenHeight": 900, "viewport": {"x":0,"y":0,"width":width,"height":900,"scale":1}})
                await send("Page.navigate", {"url": URL})
                ready = False
                for _ in range(100):
                    q = await send("Runtime.evaluate", {"expression": "({ready:document.readyState,toggle:!!document.getElementById('langToggle'),url:location.href,title:document.title,body:!!document.body,script:[...document.scripts].map(s=>s.src)})", "returnByValue": True})
                    v=q.get("result",{}).get("result",{}).get("value",{})
                    if v.get("ready") in ("interactive","complete") and v.get("toggle"):
                        ready=True; break
                    await asyncio.sleep(0.1)
                if not ready:
                    raise RuntimeError(f"site page not ready at {width}px ({lang}); state={v}")
                q=await send("Runtime.evaluate", {"expression":"({fa:document.body.classList.contains('fa-mode'),lang:document.documentElement.lang})","returnByValue":True})
                current=q.get("result",{}).get("result",{}).get("value",{})
                if bool(current.get("fa")) != (lang=="fa"):
                    await send("Runtime.evaluate", {"expression":"document.getElementById('langToggle').click()","returnByValue":True})
                    changed=False
                    for _ in range(30):
                        q=await send("Runtime.evaluate", {"expression":"({lang:document.documentElement.lang,dir:document.documentElement.dir,fa:document.body.classList.contains('fa-mode')})","returnByValue":True})
                        s=q.get("result",{}).get("result",{}).get("value",{})
                        if s.get("lang")==lang and s.get("dir")==('rtl' if lang=='fa' else 'ltr') and s.get("fa")== (lang=='fa'):
                            changed=True; break
                        await asyncio.sleep(0.1)
                    if not changed: raise RuntimeError(f"language toggle did not reach {lang} at {width}px")
                await asyncio.sleep(0.2)
                q=await send("Runtime.evaluate", {"expression":JS_AUDIT,"returnByValue":True})
                result=q.get("result",{}).get("result",{}).get("value")
                if not result: raise RuntimeError(f"audit JS returned no result at {width}px ({lang})")
                results[lang][width]=result
    return results

def main():
    proc=subprocess.Popen(["chromium","--headless=new","--no-sandbox","--disable-gpu",f"--remote-debugging-port={PORT}","--hide-scrollbars","about:blank"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    try:
        for _ in range(60):
            try: urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version",timeout=1); break
            except Exception: time.sleep(.5)
        else: raise RuntimeError("chromium devtools never came up")
        tabs=json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/list"))
        candidates=[t for t in tabs if t.get("type")=="page" and t.get("webSocketDebuggerUrl")]
        if not candidates: raise RuntimeError(f"no page target found; targets={[{'type':t.get('type'),'url':t.get('url')} for t in tabs]}")
        # Prefer the blank page; it is a clean, stable page target for navigation.
        tab=next((t for t in candidates if t.get("url") in ("about:blank","")), candidates[0])
        res=asyncio.run(audit(tab["webSocketDebuggerUrl"]))
    finally: proc.terminate()
    failures=0
    for lang,label in (("en","English"),("fa","Persian")):
        print(f"\n######## {label} ({lang}) ########")
        for width,r in res[lang].items():
            state_ok=r["lang"]==lang and r["dir"]==("rtl" if lang=="fa" else "ltr") and r["faMode"]==(lang=="fa")
            horizontal=r["docScrollW"]>r["docClientW"]+1
            print(f"\n=== {width}px [{r['lang'] or 'unknown'} / {r['dir'] or 'unknown'}] fa-mode={'on' if r['faMode'] else 'off'} (innerW {r['vw']} / scrollW {r['docScrollW']} / clientW {r['docClientW']})")
            print(f"  language state      : {'pass' if state_ok else 'FAIL'}")
            print(f"  horizontal scroll   : {'FAIL' if horizontal else 'pass'}")
            print(f"  overflowing els     : {len(r['overflow'])}"+(f" -> {r['overflow'][:4]}" if r['overflow'] else ""))
            print(f"  tap < 44px          : {len(r['taps'])}"+(f" -> {r['taps'][:4]}" if r['taps'] else ""))
            print(f"  two-line clickable  : {len(r['twoLine'])}"+(f" -> {r['twoLine'][:4]}" if r['twoLine'] else ""))
            print(f"  contrast failures   : {len(r['contrast'])}"+(f" -> {r['contrast'][:5]}" if r['contrast'] else ""))
            failures += int(not state_ok)+int(horizontal)+len(r['overflow'])+len(r['taps'])+len(r['twoLine'])+len(r['contrast'])
    print(f"\nTOTAL ISSUES: {failures}")
    return 0 if failures==0 else 1

if __name__=="__main__": sys.exit(main())