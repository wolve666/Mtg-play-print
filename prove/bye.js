// Prova della V2: tre schede = tre telefoni, collegati con il trasporto di prova (?nettest)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = require('path').resolve(__dirname, '..'), SHOTS = path.join(__dirname, 'out', 'shots');
fs.mkdirSync(SHOTS, {recursive:true});
const ORIGIN = 'http://mpp.test';
const TYPES = {html:'text/html', js:'text/javascript', png:'image/png', json:'application/json', webmanifest:'application/manifest+json'};
const log = (...a) => console.log(...a);
let fails = 0;
const check = (ok, msg) => { log((ok ? 'OK   ' : 'FAIL ') + msg); if(!ok) fails++ };

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({viewport:{width:412, height:880}, reducedMotion:'reduce', hasTouch:false});
  await ctx.route(ORIGIN + '/**', async route => {
    const u = new URL(route.request().url()); let f = u.pathname === '/' ? '/index.html' : u.pathname;
    const fp = path.join(ROOT, f);
    if(f === '/app-config.js') return route.fulfill({status:200, contentType:'text/javascript', body:''});
    if(!fs.existsSync(fp)) return route.fulfill({status:404, body:''});
    route.fulfill({status:200, contentType:TYPES[f.split('.').pop()] || 'application/octet-stream', body:fs.readFileSync(fp)});
  });
  // tutto il resto (Scryfall, font...) non serve alla prova
  await ctx.route(/^https?:\/\/(?!mpp\.test)/, r => r.abort());
  // ogni scheda ha la sua memoria, come un telefono diverso
  await ctx.addInitScript(() => {
    const dev = new URLSearchParams(location.search).get('dev') || '';
    const P = Storage.prototype, g = P.getItem, s = P.setItem, r = P.removeItem;
    P.getItem = function(k){ return g.call(this, dev + ':' + k) };
    P.setItem = function(k, v){ return s.call(this, dev + ':' + k, v) };
    P.removeItem = function(k){ return r.call(this, dev + ':' + k) };
    if(g.call(localStorage, dev + ':smtg-tut-014') == null) s.call(localStorage, dev + ':smtg-tut-014', '1');
    window.confirm = () => true;
  });
  const errs = [];
  const open = async dev => {
    const p = await ctx.newPage();
    p.on('pageerror', e => errs.push(dev + ': ' + e.message));
    await p.goto(`${ORIGIN}/index.html?nettest&dev=${dev}`);
    await p.waitForTimeout(600);
    return p;
  };
  const shot = (p, n) => p.screenshot({path:path.join(SHOTS, n + '.png')});
  const wait = ms => new Promise(r => setTimeout(r, ms));


  const A = await open('A');
  await A.evaluate(() => { SET.netName = 'Federico'; saveSet(); startGame('commander', 4) }); await wait(700);
  // tasto indietro sul tavolo normale: pagina di scelta; lì il tasto indietro non chiude più nulla
  await A.goBack(); await wait(500);
  check(await A.evaluate(() => stack[stack.length - 1] === 'wizard' && WZ.step === 1), 'indietro dal tavolo: pagina di scelta del gioco');
  await A.goBack(); await wait(500);
  check(await A.evaluate(() => stack[stack.length - 1] === 'wizard'), 'indietro sulla pagina di scelta: resta lì (nell\'app esce)');
  await A.click('#wzClose'); await wait(500);
  check(await A.evaluate(() => !stack.length && document.querySelectorAll('#board .cell').length === 4), '«Indietro» della pagina di scelta torna al tavolo');
  await A.evaluate(() => openNet()); await wait(300); await A.click('[data-na="host"]'); await wait(300);
  const B = await open('B');
  await B.click('#wzNet'); await B.fill('#netName', 'Bea'); await B.dispatchEvent('#netName', 'change');
  await B.waitForSelector('[data-na="join"]'); await B.click('[data-na="join"]');
  await A.waitForSelector('[data-na="yes"]'); await A.click('[data-na="yes"]');
  await B.waitForFunction(() => NET.role === 'client'); await wait(300);
  await A.evaluate(() => netSeat(Object.keys(NET.names).find(id => id !== NID()), 1)); await wait(400);
  await A.evaluate(() => closeAllOv()); await wait(400);
  await A.evaluate(() => changeLife(1, -7)); await wait(500);
  // ospite: indietro sul tavolo chiede se tornare al tavolo o uscire
  await B.goBack(); await wait(500);
  check(await B.evaluate(() => RS.net === 'back' && stack[stack.length - 1] === 'resume'), 'ospite, indietro sul tavolo: «Torna al tavolo» o «Esci e torna al menu»');
  await B.click('#rsGo'); await wait(400);
  check(await B.evaluate(() => NV() && NET.role === 'client' && !stack.length), '«Torna al tavolo»: di nuovo nel suo campo');
  // il principale chiude la partita: l'ospite può continuarla offline
  await A.evaluate(() => { openTokens() }); await wait(300); await A.evaluate(() => renderMenu());
  await A.click('#tkMenu [data-act="netexit"]'); await wait(900);
  check(await A.evaluate(() => !NET.role && stack[stack.length - 1] === 'wizard'), 'il principale chiude dal menu e torna alla pagina di scelta');
  check(await B.evaluate(() => RS.net === 'bye'), 'Bea vede «Partita chiusa» con «Continua qui, offline»');
  await shot(B, '20-bea-partita-chiusa');
  await B.click('#rsGo'); await wait(600);
  check(await B.evaluate(() => !NET.role && !NV() && S.count === 4 && S.players[1].life === 33 && document.querySelectorAll('#board .cell').length === 4), 'Bea continua la partita su un telefono solo, con le vite di prima');
  await shot(B, '21-bea-offline');
  check(errs.length === 0, 'nessun errore JavaScript' + (errs.length ? ': ' + errs.join(' | ') : ''));
  await browser.close();
  log(fails ? `\n${fails} controlli falliti` : '\nTutti i controlli passati');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2) });
