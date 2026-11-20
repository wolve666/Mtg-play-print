const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{ const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:412,height:880},reducedMotion:'reduce'});
let cfg = '';
await ctx.route('http://mpp.test/**', r=>{ const f=new URL(r.request().url()).pathname; if(f==='/app-config.js') return r.fulfill({status:200,contentType:'text/javascript',body:cfg}); const fp=require('path').resolve(__dirname, '..')+f; if(!fs.existsSync(fp)) return r.fulfill({status:200,body:''}); r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html':'image/png',body:fs.readFileSync(fp)}) });
await ctx.route(/^https?:\/\/(?!mpp\.test)/, r=>r.abort());
await ctx.addInitScript(()=>localStorage.setItem('smtg-tut-014','1'));
const errs=[];
for (const [name, c] of [['scaduta', `window.APP_REPO='wolve666/MagicPlayPrint-app';window.APP_CHANNEL='test';window.APP_EXPIRES=${Date.now()-1000};`],
                         ['in-scadenza', `window.APP_REPO='wolve666/MagicPlayPrint-app';window.APP_CHANNEL='test';window.APP_EXPIRES=${Date.now()+2*86400000};`],
                         ['beta', `window.APP_REPO='wolve666/MagicPlayPrint-app';window.APP_CHANNEL='test';window.APP_LABEL='beta';window.APP_EXPIRES=${Date.now()+2*86400000};`],
                         ['stabile', `window.APP_REPO='wolve666/Mtg-play-print';`]]) {
  cfg = c; const p=await ctx.newPage(); p.on('pageerror',e=>errs.push(name+': '+e.message));
  await p.goto('http://mpp.test/index.html'); await p.waitForTimeout(2000);
  const info = await p.evaluate(()=>({canale:CHANNEL, repo:REPO, bloccata:!!document.querySelector('#expired'), ver:document.querySelector('#wzVer').textContent, toast:document.querySelector('#toast').textContent}));
  console.log(name, JSON.stringify(info));
  if(name==='scaduta') await p.screenshot({path:'shots/scaduta.png'});
  await p.close();
}
console.log('errori:', errs); await b.close(); })();
