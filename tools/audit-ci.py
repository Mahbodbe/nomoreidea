#!/usr/bin/env python3
import asyncio, json, shutil, subprocess, sys, time, urllib.request
import websockets
URL=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8899/index.html'
WIDTHS=[320,375,414,768,1280,1920]; PORT=9333

async def main_async(ws_url):
    async with websockets.connect(ws_url,max_size=40_000_000) as ws:
        n=0
        async def cmd(method,params=None):
            nonlocal n
            n+=1; await ws.send(json.dumps({'id':n,'method':method,'params':params or {}}))
            while 1:
                m=json.loads(await ws.recv())
                if m.get('id')==n:return m
        await cmd('Page.enable')
        out={'en':{},'fa':{}}
        for lang in ('en','fa'):
            for width in WIDTHS:
                mobile=width<768
                metrics={'width':width,'height':900,'deviceScaleFactor':2 if mobile else 1,'mobile':mobile,'screenWidth':width,'screenHeight':900,'viewport':{'x':0,'y':0,'width':width,'height':900,'scale':1}}
                await cmd('Emulation.setDeviceMetricsOverride',metrics)
                await cmd('Page.navigate',{'url':URL})
                for _ in range(100):
                    q=await cmd('Runtime.evaluate',{'expression':"({r:document.readyState,t:!!document.getElementById('langToggle')})",'returnByValue':True})
                    s=q.get('result',{}).get('result',{}).get('value',{})
                    if s.get('r') in ('interactive','complete') and s.get('t'): break
                    await asyncio.sleep(.1)
                else: raise RuntimeError(f'page not ready at {width}px ({lang})')
                await cmd('Runtime.evaluate',{'expression':f"localStorage.setItem('site_lang',{json.dumps(lang)});location.reload();"})
                for _ in range(100):
                    q=await cmd('Runtime.evaluate',{'expression':"({r:document.readyState,l:document.documentElement.lang,d:document.documentElement.dir,f:document.body.classList.contains('fa-mode')})",'returnByValue':True})
                    s=q.get('result',{}).get('result',{}).get('value',{})
                    if s.get('r')=='complete' and s.get('l')==lang and s.get('d')==('rtl' if lang=='fa' else 'ltr') and s.get('f')==(lang=='fa'): break
                    await asyncio.sleep(.1)
                else: raise RuntimeError(f'language state failed at {width}px ({lang}): {s}')
                await cmd('Emulation.setDeviceMetricsOverride',metrics); await asyncio.sleep(.2)
                js="""(()=>{const o={lang:document.documentElement.lang,dir:document.documentElement.dir,faMode:document.body.classList.contains('fa-mode'),vw:innerWidth,sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,overflow:0,taps:0};for(const e of document.querySelectorAll('body *')){if(e.classList.contains('skip'))continue;const c=getComputedStyle(e),r=e.getBoundingClientRect();if(c.display!='none'&&c.visibility!='hidden'&&r.width&&r.height&&(r.left< -1||r.right>innerWidth+1))o.overflow++}for(const e of document.querySelectorAll('button,.nav__cta,.lang-toggle,.cta-type,.row__arrow')){const c=getComputedStyle(e),r=e.getBoundingClientRect();if(c.display!='none'&&c.visibility!='hidden'&&r.width&&r.height&&(r.width<44||r.height<44))o.taps++}return o})()"""
                q=await cmd('Runtime.evaluate',{'expression':js,'returnByValue':True}); out[lang][width]=q.get('result',{}).get('result',{}).get('value',{})
        return out

def main():
    chrome=next((shutil.which(x) for x in ('google-chrome-stable','google-chrome','chromium','chromium-browser') if shutil.which(x)),None)
    if not chrome: raise RuntimeError('Chrome/Chromium not found')
    p=subprocess.Popen([chrome,'--headless=new','--no-sandbox','--disable-gpu',f'--remote-debugging-port={PORT}','about:blank'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    try:
        for _ in range(60):
            try: urllib.request.urlopen(f'http://127.0.0.1:{PORT}/json/version',timeout=1); break
            except Exception: time.sleep(.5)
        tabs=json.load(urllib.request.urlopen(f'http://127.0.0.1:{PORT}/json/list')); page=next(t for t in tabs if t.get('type')=='page' and t.get('webSocketDebuggerUrl'))
        res=asyncio.run(main_async(page['webSocketDebuggerUrl']))
    finally: p.terminate()
    issues=0
    for lang,label in (('en','English'),('fa','Persian')):
        print(f'\n######## {label} ({lang}) ########')
        for w,r in res[lang].items():
            state=r['lang']==lang and r['dir']==('rtl' if lang=='fa' else 'ltr') and r['faMode']==(lang=='fa')
            vp=abs(r['vw']-w)>1; hor=r['sw']>r['cw']+1
            print(f'\n=== {w}px [{r["lang"]} / {r["dir"]}]')
            print('  language state      :', 'pass' if state else 'FAIL')
            print('  viewport state      :', 'FAIL' if vp else 'pass')
            print('  horizontal scroll   :', 'FAIL' if hor else 'pass')
            print('  overflowing els     :',r['overflow'])
            print('  tap < 44px          :',r['taps'])
            issues+=int(not state)+int(vp)+int(hor)+r['overflow']+r['taps']
    print('\nTOTAL ISSUES:',issues); return 0 if issues==0 else 1
if __name__=='__main__':sys.exit(main())