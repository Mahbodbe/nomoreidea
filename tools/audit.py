#!/usr/bin/env python3
"""Headless-Chromium CDP audit: horizontal overflow, tap targets, two-line
clickable text, and computed contrast for every text node on the page.
Run against a locally served page at several viewport widths."""
import asyncio, json, subprocess, sys, time, urllib.request, socket
import websockets

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8899/index.html"
WIDTHS = [320, 375, 414, 768, 1280, 1920]
PORT = 9333

JS = r"""
(() => {
  const out = {vw: window.innerWidth, overflow: [], taps: [], twoLine: [], contrast: []};

  out.docScrollW = document.documentElement.scrollWidth;
  out.docClientW = document.documentElement.clientWidth;

  // 1. elements sticking past the viewport
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (r.right > window.innerWidth + 1 || r.left < -1) {
      out.overflow.push({sel: el.tagName.toLowerCase() + '.' + (el.className || '').toString().split(' ')[0],
                         left: Math.round(r.left), right: Math.round(r.right)});
    }
  }

  // 2. clickable affordances: tap target >= 44px, label must not wrap
  for (const el of document.querySelectorAll('a, button')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.position === 'absolute' && r.left < 0) continue;   // skip-link at rest
    const name = (el.textContent || '').trim().slice(0, 44);
    if (r.height < 44) out.taps.push({name, h: Math.round(r.height)});
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
    const lines = Math.round(r.height / lh);
    // only flag short-label affordances (buttons / nav / meta links), not prose rows
    if (lines > 1 && name.length > 0 && name.length < 30 && !el.querySelector('h1,h2,h3,p,ul'))
      out.twoLine.push({name, lines, h: Math.round(r.height)});
  }

  // 3. contrast — WCAG 2.1 ratio for every text-bearing leaf
  const lum = (c) => {
    const [r, g, b] = c.map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const parse = (s) => { const m = s.match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : null; };
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n).backgroundColor;
      const p = parse(c);
      if (p && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) {
        const a = c.match(/[\d.]+\)/) && c.startsWith('rgba') ? parseFloat(c.split(',')[3]) : 1;
        if (a > 0.5) return p;
      }
      n = n.parentElement;
    }
    return [255, 255, 255];
  };
  for (const el of document.querySelectorAll('body *')) {
    const direct = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!direct) continue;
    const cs = getComputedStyle(el);
    const fg = parse(cs.color); if (!fg) continue;
    const bg = bgOf(el);
    const L1 = lum(fg), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const px = parseFloat(cs.fontSize);
    const bold = parseInt(cs.fontWeight) >= 700;
    const large = px >= 24 || (bold && px >= 18.66);
    const need = large ? 3 : 4.5;
    if (ratio < need) {
      out.contrast.push({sel: el.tagName.toLowerCase() + '.' + (el.className || '').toString().split(' ')[0],
                         txt: (el.textContent || '').trim().slice(0, 32),
                         ratio: +ratio.toFixed(2), need, px: Math.round(px)});
    }
  }
  return out;
})()
"""


def launch():
    p = subprocess.Popen(
        ["chromium", "--headless=new", "--no-sandbox", "--disable-gpu",
         f"--remote-debugging-port={PORT}", "--hide-scrollbars",
         "--window-size=1280,900", "about:blank"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(60):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=1)
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
        for w in WIDTHS:
            await send("Emulation.setDeviceMetricsOverride",
                       {"width": w, "height": 900, "deviceScaleFactor": 1,
                        "mobile": False, "screenWidth": w, "screenHeight": 900,
                        "viewport": {"x": 0, "y": 0, "width": w, "height": 900, "scale": 1}})
            await send("Page.navigate", {"url": URL})
            await asyncio.sleep(2.2)   # webfonts
            r = await send("Runtime.evaluate", {"expression": JS, "returnByValue": True})
            results[w] = r["result"]["result"]["value"]
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
    for w, r in res.items():
        hscroll = r["docScrollW"] > r["docClientW"] + 1
        print(f"\n=== {w}px  (innerW {r['vw']} / scrollW {r['docScrollW']} / clientW {r['docClientW']})")
        print(f"  horizontal scroll : {'FAIL' if hscroll else 'pass'}")
        print(f"  overflowing els   : {len(r['overflow'])}" + (f" -> {r['overflow'][:4]}" if r['overflow'] else ""))
        print(f"  tap < 44px        : {len(r['taps'])}" + (f" -> {r['taps'][:4]}" if r['taps'] else ""))
        print(f"  two-line clickable: {len(r['twoLine'])}" + (f" -> {r['twoLine'][:4]}" if r['twoLine'] else ""))
        print(f"  contrast failures : {len(r['contrast'])}" + (f" -> {r['contrast'][:5]}" if r['contrast'] else ""))
        fails += hscroll + len(r["overflow"]) + len(r["taps"]) + len(r["twoLine"]) + len(r["contrast"])
    print(f"\nTOTAL ISSUES: {fails}")
    return 0 if fails == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
