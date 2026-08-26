#!/usr/bin/env python3
"""Responsive bilingual audit with real mobile emulation."""
import asyncio, json, subprocess, sys, time, urllib.request
import websockets

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8899/index.html"
WIDTHS = [320, 375, 414, 768, 1280, 1920]
PORT = 9333

JS = r'''(() => {
  const out = {
    lang: document.documentElement.lang || '',
    dir: document.documentElement.dir || '',
    faMode: document.body.classList.contains('fa-mode'),
    vw: innerWidth,
    overflow: [],
    taps: [],
    twoLine: [],
    contrast: []
  };

  out.docScrollW = document.documentElement.scrollWidth;
  out.docClientW = document.documentElement.clientWidth;

  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if ((r.width || r.height) && (r.right > innerWidth + 1 || r.left < -1)) {
      out.overflow.push({
        sel: el.tagName.toLowerCase() + '.' + String(el.className || '').split(' ')[0],
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width)
      });
    }
  }

  for (const el of document.querySelectorAll('a, button')) {
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) continue;
    const cs = getComputedStyle(el);
    if (cs.position === 'absolute' && r.left < 0) continue;
    const name = (el.textContent || '').trim().slice(0, 44);
    if (r.height < 44) out.taps.push({name, h: Math.round(r.height)});
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
    const lines = Math.round(r.height / lh);
    if (lines > 1 && name && name.length < 30 && !el.querySelector('h1,h2,h3,p,ul')) {
      out.twoLine.push({name, lines, h: Math.round(r.height)});
    }
  }

  const lum = c => {
    const [r, g, b] = c.map(v => {
      v /= 255;
      return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4);
    });
    return .2126 * r + .7152 * g + .0722 * b;
  };
  const parse = s => {
    const m = s.match(/[\\d.]+/g);
    return m ? m.slice(0, 3).map(Number) : null;
  };
  const bgOf = el => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n).backgroundColor;
      const p = parse(c);
      if (p && !/rgba\\(0, 0, 0, 0\\)|transparent/.test(c)) return p;
      n = n.parentElement;
    }
    return [255,255,255];
  };
  for (const el of document.querySelectorAll('body *')) {
    const direct = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!direct) continue;
    const cs = getComputedStyle(el);
    const fg = parse(cs.color);
    if (!fg) continue;
    const bg = bgOf(el);
    const a = lum(fg), b = lum(bg);
    const ratio = (Math.max(a,b) + .05) / (Math.min(a,b) + .05);
    const px = parseFloat(cs.fontSize);
    const large = px >= 24 || (parseInt(cs.fontWeight) >= 700 && px >= 18.66);
    const need = large ? 3 : 4.5;
    if (ratio < need) {
      out.contrast.push({
        sel: el.tagName.toLowerCase() + '.' + String(el.className || '').split(' ')[0],
        txt: (el.textContent || '').trim().slice(0,32),
        ratio: +ratio.toFixed(2), need, px: Math.round(px)
      });
    }
  }
  return out;
})()'''


def launch():
    p = subprocess.Popen(
        [
            "chromium", "--headless=new", "--no-sandbox", "--disable-gpu",
            f"--remote-debugging-port={PORT}", "--hide-scrollbars", "about:blank"
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    for _ in range(60):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=1)
            return p
        except Exception:
            time.sleep(.5)
    raise RuntimeError("chromium devtools never came up")


async def audit(ws_url):
    results = {}
    async with websockets.connect(ws_url, max_size=40_000_000) as ws:
        i = 0

        async def send(method, params=None):
            nonlocal i
            i += 1
            await ws.send(json.dumps({"id": i, "method": method, "params": params or {}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get("id") == i:
                    return msg

        await send("Page.enable")

        for lang in ("en", "fa"):
            results[lang] = {}
            for w in WIDTHS:
                mobile = w < 768
                await send("Emulation.setDeviceMetricsOverride", {
                    "width": w,
                    "height": 900,
                    "deviceScaleFactor": 2 if mobile else 1,
                    "mobile": mobile,
                    "screenWidth": w,
                    "screenHeight": 900,
                    "viewport": {"x":0,"y":0,"width":w,"height":900,"scale":1}
                })
                await send("Page.navigate", {"url": URL})

                ready = False
                for _ in range(60):
                    q = await send("Runtime.evaluate", {
                        "expression": "document.readyState",
                        "returnByValue": True
                    })
                    state = q.get("result", {}).get("result", {}).get("value")
                    if state == "complete":
                        ready = True
                        break
                    await asyncio.sleep(.1)
                if not ready:
                    raise RuntimeError(f"page did not reach complete at {w}px ({lang})")

                await asyncio.sleep(.3)

                # Normalize language through the real UI instead of depending on
                # a global setLang() implementation detail.
                q = await send("Runtime.evaluate", {
                    "expression": "({lang:document.documentElement.lang, faMode:document.body.classList.contains('fa-mode'), toggle:!!document.getElementById('langToggle')})",
                    "returnByValue": True
                })
                current = q.get("result", {}).get("result", {}).get("value", {})
                if not current.get("toggle"):
                    raise RuntimeError(f"language toggle missing at {w}px ({lang})")

                current_is_fa = bool(current.get("faMode"))
                want_fa = lang == "fa"
                if current_is_fa != want_fa:
                    q = await send("Runtime.evaluate", {
                        "expression": "document.getElementById('langToggle').click()",
                        "returnByValue": True
                    })
                    if q.get("result", {}).get("exceptionDetails"):
                        raise RuntimeError(f"language toggle failed at {w}px ({lang})")
                    await asyncio.sleep(.3)

                q = await send("Runtime.evaluate", {
                    "expression": "({lang:document.documentElement.lang, dir:document.documentElement.dir, faMode:document.body.classList.contains('fa-mode')})",
                    "returnByValue": True
                })
                state = q.get("result", {}).get("result", {}).get("value", {})
                expected = (
                    state.get("lang") == lang and
                    state.get("dir") == ("rtl" if want_fa else "ltr") and
                    state.get("faMode") == want_fa
                )
                if not expected:
                    raise RuntimeError(f"language state failed at {w}px ({lang}): {state}")

                await asyncio.sleep(.2)
                q = await send("Runtime.evaluate", {"expression": JS, "returnByValue": True})
                results[lang][w] = q["result"]["result"]["value"]

    return results


def main():
    proc = launch()
    try:
        tabs = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/list"))
        res = asyncio.run(audit(tabs[0]["webSocketDebuggerUrl"]))
    finally:
        proc.terminate()

    fails = 0
    for lang, label in (("en", "English"), ("fa", "Persian")):
        print(f"\\n######## {label} ({lang}) ########")
        for w, r in res[lang].items():
            expected = (
                r["lang"] == lang and
                r["dir"] == ("rtl" if lang == "fa" else "ltr") and
                r["faMode"] == (lang == "fa")
            )
            h = r["docScrollW"] > r["docClientW"] + 1
            print(
                f"\\n=== {w}px [{r['lang'] or 'unknown'} / {r['dir'] or 'unknown'}] "
                f"fa-mode={'on' if r['faMode'] else 'off'} "
                f"(innerW {r['vw']} / scrollW {r['docScrollW']} / clientW {r['docClientW']})"
            )
            print(f"  language state      : {'pass' if expected else 'FAIL'}")
            print(f"  horizontal scroll   : {'FAIL' if h else 'pass'}")
            print(f"  overflowing els     : {len(r['overflow'])}" + (f" -> {r['overflow'][:4]}" if r['overflow'] else ""))
            print(f"  tap < 44px          : {len(r['taps'])}" + (f" -> {r['taps'][:4]}" if r['taps'] else ""))
            print(f"  two-line clickable  : {len(r['twoLine'])}" + (f" -> {r['twoLine'][:4]}" if r['twoLine'] else ""))
            print(f"  contrast failures   : {len(r['contrast'])}" + (f" -> {r['contrast'][:5]}" if r['contrast'] else ""))
            fails += (not expected) + h + len(r["overflow"]) + len(r["taps"]) + len(r["twoLine"]) + len(r["contrast"])

    print(f"\\nTOTAL ISSUES: {fails}")
    return 0 if fails == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
