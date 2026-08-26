#!/usr/bin/env python3
"""Responsive bilingual audit with real mobile emulation."""
import asyncio, json, subprocess, sys, time, urllib.request
import websockets

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8899/index.html"
WIDTHS = [320, 375, 414, 768, 1280, 1920]
PORT = 9333

JS_AUDIT = r'''
(() => {
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
      out.overflow.push({sel: el.tagName.toLowerCase() + '.' + String(el.className || '').split(' ')[0], left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width)});
    }
  }
  for (const el of document.querySelectorAll('a,button')) {
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) continue;
    const cs = getComputedStyle(el);
    if (cs.position === 'absolute' && r.left < 0) continue;
    const name = (el.textContent || '').trim().slice(0, 44);
    if (r.height < 44) out.taps.push({name, h: Math.round(r.height)});
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
    const lines = Math.round(r.height / lh);
    if (lines > 1 && name && name.length < 30 && !el.querySelector('h1,h2,h3,p,ul')) out.twoLine.push({name, lines, h: Math.round(r.height)});
  }
  const lum = c => { const [r,g,b]=c.map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}); return .2126*r+.7152*g+.0722*b; };
  const parse = s => { const m=s.match(/[\d.]+/g); return m ? m.slice(0,3).map(Number) : null; };
  const bgOf = el => { let n=el; while(n&&n!==document.documentElement){ const c=getComputedStyle(n).backgroundColor,p=parse(c); if(p&&!/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return p; n=n.parentElement; } return [255,255,255]; };
  for(const el of document.querySelectorAll('body *')){
    const direct=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>1); if(!direct) continue;
    const cs=getComputedStyle(el), fg=parse(cs.color); if(!fg) continue;
    const bg=bgOf(el), a=lum(fg), b=lum(bg), ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05), px=parseFloat(cs.fontSize), large=px>=24||(parseInt(cs.fontWeight)>=700&&px>=18.66), need=large?3:4.5;
    if(ratio<need) out.contrast.push({sel:el.tagName.toLowerCase()+'.'+String(el.className||'').split(' ')[0],txt:(el.textContent||'').trim().slice(0,32),ratio:+ratio.toFixed(2),need,px:Math.round(px)});
  }
  return out;
})()
'''

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
                await send("Emulation.setDeviceMetricsOverride", {
                    "width": width, "height": 900, "deviceScaleFactor": 2 if mobile else 1,
                    "mobile": mobile, "screenWidth": width, "screenHeight": 900,
                    "viewport": {"x":0,"y":0,"width":width,"height":900,"scale":1},
                })
                nav = await send("Page.navigate", {"url": URL})
                nav_error = nav.get("errorText")
                if nav_error:
                    raise RuntimeError(f"navigation failed at {width}px ({lang}): {nav_error}")

                ready = False
                last_state = {}
                for _ in range(100):
                    q = await send("Runtime.evaluate", {
                        "expression": "({ready:document.readyState,url:location.href,title:document.title,toggle:!!document.getElementById('langToggle'),body:!!document.body,hasScript:[...document.scripts].some(s => (s.src||'').includes('/js/i18n.js'))})",
                        "returnByValue": True,
                    })
                    last_state = q.get("result", {}).get("result", {}).get("value", {}) or {}
                    if last_state.get("ready") in ("interactive", "complete") and last_state.get("body") and last_state.get("toggle"):
                        ready = True
                        break
                    await asyncio.sleep(0.1)
                if not ready:
                    raise RuntimeError(f"page/i18n UI not ready at {width}px ({lang}); state={last_state}")

                q = await send("Runtime.evaluate", {
                    "expression": "({fa:document.body.classList.contains('fa-mode'), lang:document.documentElement.lang})",
                    "returnByValue": True,
                })
                current = q.get("result", {}).get("result", {}).get("value", {}) or {}
                if bool(current.get("fa")) != (lang == "fa"):
                    click = await send("Runtime.evaluate", {
                        "expression": "document.getElementById('langToggle').click()",
                        "returnByValue": True,
                    })
                    if click.get("result", {}).get("exceptionDetails"):
                        raise RuntimeError(f"language toggle failed at {width}px ({lang})")
                    changed = False
                    for _ in range(40):
                        q = await send("Runtime.evaluate", {
                            "expression": "({lang:document.documentElement.lang,dir:document.documentElement.dir,fa:document.body.classList.contains('fa-mode')})",
                            "returnByValue": True,
                        })
                        s = q.get("result", {}).get("result", {}).get("value", {}) or {}
                        if s.get("lang") == lang and s.get("dir") == ("rtl" if lang == "fa" else "ltr") and s.get("fa") == (lang == "fa"):
                            changed = True
                            break
                        await asyncio.sleep(0.1)
                    if not changed:
                        raise RuntimeError(f"language toggle did not reach {lang} at {width}px")

                await asyncio.sleep(0.2)
                q = await send("Runtime.evaluate", {"expression": JS_AUDIT, "returnByValue": True})
                result = q.get("result", {}).get("result", {}).get("value")
                if not result:
                    raise RuntimeError(f"audit JS returned no result at {width}px ({lang})")
                results[lang][width] = result
    return results

def main():
    proc = subprocess.Popen(["chromium","--headless=new","--no-sandbox","--disable-gpu",f"--remote-debugging-port={PORT}","--hide-scrollbars","about:blank"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        for _ in range(60):
            try:
                urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=1)
                break
            except Exception: time.sleep(0.5)
        else: raise RuntimeError("chromium devtools never came up")
        tabs = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/list"))
        res = asyncio.run(audit(tabs[0]["webSocketDebuggerUrl"]))
    finally:
        proc.terminate()

    failures = 0
    for lang,label in (("en","English"),("fa","Persian")):
        print(f"\n######## {label} ({lang}) ########")
        for width,r in res[lang].items():
            state_ok=r["lang"]==lang and r["dir"]==("rtl" if lang=="fa" else "ltr") and r["faMode"]==(lang=="fa")
            horizontal=r["docScrollW"]>r["docClientW"]+1
            print(f"\n=== {width}px [{r['lang'] or 'unknown'} / {r['dir'] or 'unknown'}] fa-mode={'on' if r['faMode'] else 'off'} (innerW {r['vw']} / scrollW {r['docScrollW']} / clientW {r['docClientW']})")
            print(f"  language state      : {'pass' if state_ok else 'FAIL'}")
            print(f"  horizontal scroll   : {'FAIL' if horizontal else 'pass'}")
            print(f"  overflowing els     : {len(r['overflow'])}" + (f" -> {r['overflow'][:4]}" if r['overflow'] else ""))
            print(f"  tap < 44px          : {len(r['taps'])}" + (f" -> {r['taps'][:4]}" if r['taps'] else ""))
            print(f"  two-line clickable  : {len(r['twoLine'])}" + (f" -> {r['twoLine'][:4]}" if r['twoLine'] else ""))
            print(f"  contrast failures   : {len(r['contrast'])}" + (f" -> {r['contrast'][:5]}" if r['contrast'] else ""))
            failures += int(not state_ok)+int(horizontal)+len(r["overflow"])+len(r["taps"])+len(r["twoLine"])+len(r["contrast"])
    print(f"\nTOTAL ISSUES: {failures}")
    return 0 if failures==0 else 1

if __name__ == "__main__": sys.exit(main())
