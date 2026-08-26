#!/usr/bin/env python3
"""Responsive bilingual audit using headless Chromium/CDP."""
import asyncio
import json
import subprocess
import sys
import time
import urllib.request

import websockets

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8899/index.html"
WIDTHS = [320, 375, 414, 768, 1280, 1920]
PORT = 9333

JS_AUDIT = r"""
(() => {
  const out = {
    lang: document.documentElement.lang || "",
    dir: document.documentElement.dir || "",
    faMode: document.body.classList.contains("fa-mode"),
    vw: window.innerWidth,
    visualW: window.visualViewport ? window.visualViewport.width : 0,
    overflow: [], taps: [], twoLine: [], contrast: []
  };

  out.docScrollW = document.documentElement.scrollWidth;
  out.docClientW = document.documentElement.clientWidth;

  for (const el of document.querySelectorAll("body *")) {
    if (el.classList.contains("skip")) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const r = el.getBoundingClientRect();
    if ((r.width || r.height) && (r.right > window.innerWidth + 1 || r.left < -1)) {
      out.overflow.push({
        sel: el.tagName.toLowerCase() + "." + String(el.className || "").split(" ")[0],
        left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width)
      });
    }
  }

  const textLines = (el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const ys = [];
    let n;
    while ((n = walker.nextNode())) {
      if (!n.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      for (const rect of range.getClientRects()) ys.push(Math.round(rect.top));
    }
    return [...new Set(ys)].length;
  };

  for (const el of document.querySelectorAll("a, button")) {
    if (el.classList.contains("skip")) continue;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (!r.width || !r.height || cs.display === "none" || cs.visibility === "hidden") continue;
    if (r.height < 44) out.taps.push({ name: (el.textContent || "").trim().slice(0, 44), h: Math.round(r.height) });
    const name = (el.textContent || "").trim();
    const lines = textLines(el);
    if (lines > 1 && name && name.length < 30) {
      out.twoLine.push({ name: name.slice(0, 44), lines, h: Math.round(r.height) });
    }
  }

  const ctx = document.createElement("canvas").getContext("2d");
  const color = (css) => {
    if (!css || css === "transparent") return null;
    ctx.fillStyle = css;
    const n = ctx.fillStyle;
    const m = n.match(/^rgba?\(([^)]+)\)$/);
    if (m) return m[1].split(",").slice(0, 3).map(Number);
    const hex = n.match(/^#([0-9a-f]{6})$/i);
    if (hex) return [parseInt(hex[1].slice(0, 2), 16), parseInt(hex[1].slice(2, 4), 16), parseInt(hex[1].slice(4, 6), 16)];
    return null;
  };
  const lum = (c) => {
    const [r, g, b] = c.map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const bg = color(getComputedStyle(n).backgroundColor);
      if (bg) return bg;
      n = n.parentElement;
    }
    return color(getComputedStyle(document.documentElement).backgroundColor) || [255, 255, 255];
  };

  for (const el of document.querySelectorAll("body *")) {
    if (el.classList.contains("skip")) continue;
    const direct = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!direct) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const fg = color(cs.color);
    const bg = bgOf(el);
    if (!fg || !bg) continue;
    const ratio = (Math.max(lum(fg), lum(bg)) + 0.05) / (Math.min(lum(fg), lum(bg)) + 0.05);
    const px = parseFloat(cs.fontSize);
    const large = px >= 24 || (parseInt(cs.fontWeight) >= 700 && px >= 18.66);
    const need = large ? 3 : 4.5;
    if (ratio < need) out.contrast.push({
      sel: el.tagName.toLowerCase() + "." + String(el.className || "").split(" ")[0],
      txt: (el.textContent || "").trim().slice(0, 32), ratio: +ratio.toFixed(2), need, px: Math.round(px)
    });
  }

  return out;
})()
"""


def launch():
    proc = subprocess.Popen(
        ["chromium", "--headless=new", "--no-sandbox", "--disable-gpu",
         f"--remote-debugging-port={PORT}", "--hide-scrollbars", "about:blank"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    for _ in range(60):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=1)
            return proc
        except Exception:
            time.sleep(0.5)
    raise RuntimeError("chromium devtools never came up")


async def audit(ws_url):
    results = {"en": {}, "fa": {}}
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
            for width in WIDTHS:
                mobile = width < 768
                metrics = {
                    "width": width, "height": 900,
                    "deviceScaleFactor": 2 if mobile else 1,
                    "mobile": mobile,
                    "screenWidth": width, "screenHeight": 900,
                    "viewport": {"x": 0, "y": 0, "width": width, "height": 900, "scale": 1},
                }
                await send("Emulation.setDeviceMetricsOverride", metrics)
                await send("Page.navigate", {"url": URL})

                ready = False
                state = {}
                for _ in range(100):
                    q = await send("Runtime.evaluate", {
                        "expression": "({ready:document.readyState,url:location.href,toggle:!!document.getElementById('langToggle')})",
                        "returnByValue": True,
                    })
                    state = q.get("result", {}).get("result", {}).get("value", {})
                    if state.get("ready") in ("interactive", "complete") and state.get("toggle"):
                        ready = True
                        break
                    await asyncio.sleep(0.1)
                if not ready:
                    raise RuntimeError(f"site page not ready at {width}px ({lang}); state={state}")

                q = await send("Runtime.evaluate", {
                    "expression": "({fa:document.body.classList.contains('fa-mode'),lang:document.documentElement.lang})",
                    "returnByValue": True,
                })
                current = q.get("result", {}).get("result", {}).get("value", {})
                if bool(current.get("fa")) != (lang == "fa"):
                    await send("Runtime.evaluate", {
                        "expression": "document.getElementById('langToggle').click()",
                        "returnByValue": True,
                    })
                    changed = False
                    for _ in range(50):
                        q = await send("Runtime.evaluate", {
                            "expression": "({lang:document.documentElement.lang,dir:document.documentElement.dir,fa:document.body.classList.contains('fa-mode')})",
                            "returnByValue": True,
                        })
                        s = q.get("result", {}).get("result", {}).get("value", {})
                        if s.get("lang") == lang and s.get("dir") == ("rtl" if lang == "fa" else "ltr") and s.get("fa") == (lang == "fa"):
                            changed = True
                            break
                        await asyncio.sleep(0.1)
                    if not changed:
                        raise RuntimeError(f"language toggle did not reach {lang} at {width}px")

                # Re-apply viewport after language changes so the audit measures the requested viewport.
                await send("Emulation.setDeviceMetricsOverride", metrics)
                await asyncio.sleep(0.3)

                q = await send("Runtime.evaluate", {"expression": JS_AUDIT, "returnByValue": True})
                result = q.get("result", {}).get("result", {}).get("value")
                if not result:
                    raise RuntimeError(f"audit JS returned no result at {width}px ({lang})")
                results[lang][width] = result
    return results


def main():
    proc = launch()
    try:
        tabs = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/list"))
        candidates = [t for t in tabs if t.get("type") == "page" and t.get("webSocketDebuggerUrl")]
        if not candidates:
            raise RuntimeError(f"no page target found; targets={[{'type': t.get('type'), 'url': t.get('url')} for t in tabs]}")
        tab = next((t for t in candidates if t.get("url") in ("about:blank", "")), candidates[0])
        res = asyncio.run(audit(tab["webSocketDebuggerUrl"]))
    finally:
        proc.terminate()

    failures = 0
    for lang, label in (("en", "English"), ("fa", "Persian")):
        print(f"\n######## {label} ({lang}) ########")
        for width, r in res[lang].items():
            state_ok = (
                r["lang"] == lang and
                r["dir"] == ("rtl" if lang == "fa" else "ltr") and
                r["faMode"] == (lang == "fa")
            )
            horizontal = r["docScrollW"] > r["docClientW"] + 1
            viewport_bad = abs(r["vw"] - width) > 1 or abs(r["visualW"] - width) > 1
            print(f"\n=== {width}px [{r['lang'] or 'unknown'} / {r['dir'] or 'unknown'}] fa-mode={'on' if r['faMode'] else 'off'} (innerW {r['vw']} / visualW {r['visualW']:.0f} / scrollW {r['docScrollW']} / clientW {r['docClientW']})")
            print(f"  language state      : {'pass' if state_ok else 'FAIL'}")
            print(f"  viewport state      : {'FAIL' if viewport_bad else 'pass'}")
            print(f"  horizontal scroll   : {'FAIL' if horizontal else 'pass'}")
            print(f"  overflowing els     : {len(r['overflow'])}" + (f" -> {r['overflow'][:4]}" if r['overflow'] else ""))
            print(f"  tap < 44px          : {len(r['taps'])}" + (f" -> {r['taps'][:4]}" if r['taps'] else ""))
            print(f"  two-line clickable  : {len(r['twoLine'])}" + (f" -> {r['twoLine'][:4]}" if r['twoLine'] else ""))
            print(f"  contrast failures   : {len(r['contrast'])}" + (f" -> {r['contrast'][:5]}" if r['contrast'] else ""))
            failures += int(not state_ok) + int(viewport_bad) + int(horizontal) + len(r["overflow"]) + len(r["taps"]) + len(r["twoLine"]) + len(r["contrast"])

    print(f"\nTOTAL ISSUES: {failures}")
    return 0 if failures == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
