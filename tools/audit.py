#!/usr/bin/env python3
"""Headless-Chromium CDP audit for the bilingual site.
Checks English and Persian at phone/tablet/desktop widths for horizontal overflow,
tap targets, clickable wrapping, RTL activation, and computed contrast.
"""
import asyncio
import json
import subprocess
import sys
import time
import urllib.request

import websockets

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8899/index.html"
WIDTHS = [320, 375, 414, 768, 1280, 1920]
LANGS = [("en", "English"), ("fa", "Persian")]
PORT = 9333

JS = r"""
(() => {
  const out = {
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    faMode: document.body.classList.contains('fa-mode'),
    vw: window.innerWidth,
    overflow: [], taps: [], twoLine: [], contrast: []
  };

  out.docScrollW = document.documentElement.scrollWidth;
  out.docClientW = document.documentElement.clientWidth;

  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (r.right > window.innerWidth + 1 || r.left < -1) {
      out.overflow.push({
        sel: el.tagName.toLowerCase() + '.' +
             (el.className || '').toString().split(' ')[0],
        left: Math.round(r.left), right: Math.round(r.right),
        width: Math.round(r.width)
      });
    }
  }

  for (const el of document.querySelectorAll('a, button')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.position === 'absolute' && r.left < 0) continue;
    const name = (el.textContent || '').trim().slice(0, 44);
    if (r.height < 44) out.taps.push({name, h: Math.round(r.height)});
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
    const lines = Math.round(r.height / lh);
    if (lines > 1 && name.length > 0 && name.length < 30 &&
        !el.querySelector('h1,h2,h3,p,ul')) {
      out.twoLine.push({name, lines, h: Math.round(r.height)});
    }
  }

  const lum = (c) => {
    const [r, g, b] = c.map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const parse = (s) => {
    const m = s.match(/[\d.]+/g);
    return m ? m.slice(0, 3).map(Number) : null;
  };
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n).backgroundColor;
      const p = parse(c);
      if (p && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) {
        const a = c.startsWith('rgba') ? parseFloat(c.split(',')[3]) : 1;
        if (a > 0.5) return p;
      }
      n = n.parentElement;
    }
    return [255, 255, 255];
  };
  for (const el of document.querySelectorAll('body *')) {
    const direct = Array.from(el.childNodes).some(
      n => n.nodeType === 3 && n.textContent.trim().length > 1
    );
    if (!direct) continue;
    const cs = getComputedStyle(el);
    const fg = parse(cs.color);
    if (!fg) continue;
    const bg = bgOf(el);
    const L1 = lum(fg), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const px = parseFloat(cs.fontSize);
    const bold = parseInt(cs.fontWeight) >= 700;
    const large = px >= 24 || (bold && px >= 18.66);
    const need = large ? 3 : 4.5;
    if (ratio < need) {
      out.contrast.push({
        sel: el.tagName.toLowerCase() + '.' +
             (el.className || '').toString().split(' ')[0],
        txt: (el.textContent || '').trim().slice(0, 32),
        ratio: +ratio.toFixed(2), need, px: Math.round(px)
      });
    }
  }
  return out;
})()
"""


def launch():
    p = subprocess.Popen(
        [
            "chromium", "--headless=new", "--no-sandbox", "--disable-gpu",
            f"--remote-debugging-port={PORT}", "--hide-scrollbars",
            "--window-size=1280,900", "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    for _ in range(60):
        try:
            urllib.request.urlopen(
                f"http://127.0.0.1:{PORT}/json/version", timeout=1
            )
            return p
        except Exception:
            time.sleep(0.5)
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
        for lang, _label in LANGS:
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
                    "viewport": {
                        "x": 0, "y": 0, "width": w, "height": 900, "scale": 1
                    },
                })
                await send("Page.navigate", {"url": URL})
                await asyncio.sleep(2.5)

                switch = (
                    f"localStorage.setItem('site_lang', '{lang}');"
                    f"if (typeof setLang === 'function') setLang('{lang}');"
                )
                await send("Runtime.evaluate", {
                    "expression": switch,
                    "awaitPromise": True,
                    "returnByValue": True,
                })
                await asyncio.sleep(0.6)

                r = await send("Runtime.evaluate", {
                    "expression": JS,
                    "returnByValue": True,
                })
                results[lang][w] = r["result"]["result"]["value"]
    return results


def main():
    proc = launch()
    try:
        tabs = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/list"))
        ws_url = tabs[0]["webSocketDebuggerUrl"]
        res = asyncio.run(audit(ws_url))
    finally:
        proc.terminate()

    fails = 0
    for lang, label in LANGS:
        print(f"\n######## {label} ({lang}) ########")
        for w, r in res[lang].items():
            state_ok = (
                r["lang"] == lang and
                r["dir"] == ("rtl" if lang == "fa" else "ltr") and
                r["faMode"] == (lang == "fa")
            )
            hscroll = r["docScrollW"] > r["docClientW"] + 1
            state_fail = 0 if state_ok else 1
            print(
                f"\n=== {w}px [{r['lang'] or 'unknown'} / {r['dir'] or 'unknown'}] "
                f"fa-mode={'on' if r['faMode'] else 'off'} "
                f"(innerW {r['vw']} / scrollW {r['docScrollW']} / clientW {r['docClientW']})"
            )
            print(f"  language state      : {'pass' if state_ok else 'FAIL'}")
            print(f"  horizontal scroll   : {'FAIL' if hscroll else 'pass'}")
            print(
                f"  overflowing els     : {len(r['overflow'])}" +
                (f" -> {r['overflow'][:4]}" if r['overflow'] else "")
            )
            print(
                f"  tap < 44px          : {len(r['taps'])}" +
                (f" -> {r['taps'][:4]}" if r['taps'] else "")
            )
            print(
                f"  two-line clickable  : {len(r['twoLine'])}" +
                (f" -> {r['twoLine'][:4]}" if r['twoLine'] else "")
            )
            print(
                f"  contrast failures   : {len(r['contrast'])}" +
                (f" -> {r['contrast'][:5]}" if r['contrast'] else "")
            )
            fails += (
                state_fail + hscroll + len(r["overflow"]) + len(r["taps"]) +
                len(r["twoLine"]) + len(r["contrast"])
            )

    print(f"\nTOTAL ISSUES: {fails}")
    return 0 if fails == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
