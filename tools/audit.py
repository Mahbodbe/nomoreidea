#!/usr/bin/env python3
"""Responsive bilingual audit using headless Chrome/CDP."""
import asyncio, json, subprocess, sys, time, urllib.request
import websockets

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8899/index.html"
WIDTHS = [320, 375, 414, 768, 1280, 1920]
PORT = 9333

# Google Chrome is installed by CI; avoid Ubuntu's chromium snap wrapper.
CHROME_BIN = "google-chrome-stable"

# Keep the existing audit body unchanged below; only the browser launcher is explicit.

JS_AUDIT = r'''(() => {
  const out = {
    lang: document.documentElement.lang || "",
    dir: document.documentElement.dir || "",
    faMode: document.body.classList.contains("fa-mode"),
    vw: innerWidth,
    visualW: visualViewport ? visualViewport.width : 0,
    overflow: [], taps: [], twoLine: [], contrast: []
  };
  out.docScrollW = document.documentElement.scrollWidth;
  out.docClientW = document.documentElement.clientWidth;

  for (const el of document.querySelectorAll("body *")) {
    if (el.classList.contains("skip")) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const r = el.getBoundingClientRect();
    if ((r.width || r.height) && (r.right > innerWidth + 1 || r.left < -1)) {
      out.overflow.push({
        sel: el.tagName.toLowerCase() + "." + String(el.className || "").split(" ")[0],
        left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width)
      });
    }
  }

  const interactive = document.querySelectorAll(
    "button, .nav__cta, .lang-toggle, .cta-type, .row__arrow"
  );
  for (const el of interactive) {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (!r.width || !r.height || cs.display === "none" || cs.visibility === "hidden") continue;
    if (r.height < 44 || r.width < 44) {
      out.taps.push({ name: (el.textContent || "").trim().slice(0, 44), w: Math.round(r.width), h: Math.round(r.height) });
    }
  }

  const textLines = (el) => {
    const ys = [];
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (!n.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      for (const rect of range.getClientRects()) ys.push(Math.round(rect.top));
    }
    return [...new Set(ys)].length;
  };
  for (const el of document.querySelectorAll("button, .nav__cta, .lang-toggle, .cta-type, .row__arrow")) {
    const name = (el.textContent || "").trim();
    const lines = textLines(el);
    if (name && lines > 1) out.twoLine.push({ name: name.slice(0, 44), lines, h: Math.round(el.getBoundingClientRect().height) });
  }

  const ctx = document.createElement("canvas").getContext("2d");
  const color = css => {
    if (!css || css === "transparent") return null;
    ctx.fillStyle = css;
    const v = ctx.fillStyle;
    const m = v.match(/^rgba?\(([^)]+)\)$/);
    if (m) return m[1].split(",").slice(0, 3).map(Number);
    const h = v.match(/^#([0-9a-f]{6})$/i);
    if (h) return [parseInt(h[1].slice(0,2),16), parseInt(h[1].slice(2,4),16), parseInt(h[1].slice(4,6),16)];
    return null;
  };
  const lum = c => {
    const [r,g,b] = c.map(v => { v/=255; return v <= .03928 ? v/12.92 : Math.pow((v+.055)/1.055,2.4); });
    return .2126*r + .7152*g + .0722*b;
  };
  const bgOf = el => {
    for (let n=el; n && n!==document.documentElement; n=n.parentElement) {
      const bg=color(getComputedStyle(n).backgroundColor); if (bg) return bg;
    }
    return [16,24,35];
  };
  for (const el of document.querySelectorAll("body *")) {
    if (el.classList.contains("skip")) continue;
    const direct=[...el.childNodes].some(n=>n.nodeType===3 && n.textContent.trim().length>1);
    if (!direct) continue;
    const cs=getComputedStyle(el); if (cs.display === "none" || cs.visibility === "hidden") continue;
    const fg=color(cs.color), bg=bgOf(el); if (!fg || !bg) continue;
    const ratio=(Math.max(lum(fg),lum(bg))+.05)/(Math.min(lum(fg),lum(bg))+.05);
    const px=parseFloat(cs.fontSize), large=px>=24 || (parseInt(cs.fontWeight)>=700 && px>=18.66), need=large?3:4.5;
    if (ratio < need) out.contrast.push({sel:el.tagName.toLowerCase()+"."+String(el.className||"").split(" ")[0],txt:(el.textContent||"").trim().slice(0,32),ratio:+ratio.toFixed(2),need,px:Math.round(px)});
  }
  return out;
})()'''

async def send_cmd(ws, counter, method, params=None):
    counter[0] += 1
    await ws.send(json.dumps({"id": counter[0], "method": method, "params": params or {}}))
    while True:
        msg = json.loads(await ws.recv())
        if msg.get("id") == counter[0]: return msg

async def audit(ws_url):
    results={"en":{},"fa":{}}
    async with websockets.connect(ws_url, max_size=40_000_000) as ws:
        c=[0]
        await send_cmd(ws,c,"Page.enable")
        for lang in ("en","fa"):
            for width in WIDTHS:
                mobile=width<768
                metrics={"width":width,"height":900,"deviceScaleFactor":2 if mobile else 1,"mobile":mobile,"screenWidth":width,"screenHeight":900,"viewport":{"x":0,"y":0,"width":width,"height":900,"scale":1}}
                await send_cmd(ws,c,"Emulation.setDeviceMetricsOverride",metrics)
                await send_cmd(ws,c,"Page.navigate",{"url":URL})
                ready=False
                for _ in range(100):
                    q=await send_cmd(ws,c,"Runtime.evaluate",{"expression":"({ready:document.readyState,toggle:!!document.getElementById('langToggle'),url:location.href})","returnByValue":True})
                    s=q.get("result",{}).get("result",{}).get("value",{})
                    if s.get("ready") in ("interactive","complete") and s.get("toggle"):
                        ready=True; break
                    await asyncio.sleep(.1)
                if not ready: raise RuntimeError(f"site page not ready at {width}px ({lang})")
                q=await send_cmd(ws,c,"Runtime.evaluate",{"expression":"({fa:document.body.classList.contains('fa-mode'),lang:document.documentElement.lang})","returnByValue":True})
                cur=q.get("result",{}).get("result",{}).get("value",{})
                if bool(cur.get("fa")) != (lang=="fa"):
                    await send_cmd(ws,c,"Runtime.evaluate",{"expression":"document.getElementById('langToggle').click()"})
                    for _ in range(50):
                        q=await send_cmd(ws,c,"Runtime.evaluate",{"expression":"({lang:document.documentElement.lang,dir:document.documentElement.dir,fa:document.body.classList.contains('fa-mode')})","returnByValue":True})
                        st=q.get("result",{}).get("result",{}).get("value",{})
                        if st.get("lang")==lang and st.get("dir")==('rtl' if lang=='fa' else 'ltr') and st.get("fa")== (lang=='fa'): break
                        await asyncio.sleep(.1)
                    else: raise RuntimeError(f"language toggle did not reach {lang} at {width}px")
                await send_cmd(ws,c,"Emulation.setDeviceMetricsOverride",metrics)
                await asyncio.sleep(.25)
                q=await send_cmd(ws,c,"Runtime.evaluate",{"expression":JS_AUDIT,"returnByValue":True})
                results[lang][width]=q["result"]["result"]["value"]
    return results

def main():
    proc=subprocess.Popen([CHROME_BIN,"--headless=new","--no-sandbox","--disable-gpu",f"--remote-debugging-port={PORT}","--hide-scrollbars","about:blank"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    try:
        for _ in range(60):
            try: urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version",timeout=1); break
            except Exception: time.sleep(.5)
        tabs=json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/list"))
        pages=[t for t in tabs if t.get("type")=="page" and t.get("webSocketDebuggerUrl")]
        if not pages: raise RuntimeError("no page target found")
        tab=next((t for t in pages if t.get("url") in ("about:blank","")),pages[0])
        res=asyncio.run(audit(tab["webSocketDebuggerUrl"]))
    finally: proc.terminate()
    failures=0
    for lang,label in (("en","English"),("fa","Persian")):
        print(f"\n######## {label} ({lang}) ########")
        for width,r in res[lang].items():
            state_ok=r["lang"]==lang and r["dir"]==('rtl' if lang=='fa' else 'ltr') and r["faMode"]==(lang=='fa')
            viewport_bad=abs(r["vw"]-width)>1 or abs(r["visualW"]-width)>1
            horizontal=r["docScrollW"]>r["docClientW"]+1
            print(f"\n=== {width}px [{r['lang'] or 'unknown'} / {r['dir'] or 'unknown'}] fa-mode={'on' if r['faMode'] else 'off'} (innerW {r['vw']} / visualW {r['visualW']:.0f} / scrollW {r['docScrollW']} / clientW {r['docClientW']})")
            print(f"  language state      : {'pass' if state_ok else 'FAIL'}")
            print(f"  viewport state      : {'FAIL' if viewport_bad else 'pass'}")
            print(f"  horizontal scroll   : {'FAIL' if horizontal else 'pass'}")
            print(f"  overflowing els     : {len(r['overflow'])}")
            print(f"  tap < 44px          : {len(r['taps'])}" + (f" -> {r['taps'][:4]}" if r['taps'] else ""))
            print(f"  two-line clickable  : {len(r['twoLine'])}" + (f" -> {r['twoLine'][:4]}" if r['twoLine'] else ""))
            print(f"  contrast failures   : {len(r['contrast'])}")
            failures += int(not state_ok)+int(viewport_bad)+int(horizontal)+len(r['overflow'])+len(r['taps'])+len(r['twoLine'])+len(r['contrast'])
    print(f"\nTOTAL ISSUES: {failures}")
    return 0 if failures==0 else 1

if __name__=="__main__": sys.exit(main())