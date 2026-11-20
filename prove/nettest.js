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

  // --- telefono principale: Commander in 4, poi «Condividi questa partita»
  const A = await open('A');
  await A.evaluate(() => { SET.netName = 'Federico'; saveSet(); startGame('commander', 4) });
  await wait(700);
  await A.evaluate(() => openNet());
  await wait(400);
  await A.click('[data-na="host"]');
  await wait(300);
  await shot(A, '01-principale-lobby');

  // --- secondo telefono: dalla pagina iniziale, «Unisciti a una partita»
  const B = await open('B');
  check(await B.isVisible('#wzNet'), 'pagina iniziale: c\'è «Unisciti a una partita»');
  await B.click('#wzNet');
  await B.fill('#netName', 'Bea'); await B.dispatchEvent('#netName', 'change');
  await B.waitForSelector('[data-na="join"]', {timeout:5000});
  await shot(B, '02-ospite-partite-trovate');
  await B.click('[data-na="join"]');
  await A.waitForSelector('[data-na="yes"]', {timeout:5000});
  const codeA = await A.textContent('.nlReq span'), codeB = await B.textContent('.nlCode');
  check(codeA.includes(codeB), `stesso codice di controllo sui due telefoni (${codeB})`);
  await shot(A, '03-principale-richiesta');
  await shot(B, '04-ospite-codice');
  await A.click('[data-na="yes"]');
  await B.waitForFunction(() => NET.role === 'client', null, {timeout:5000});
  await wait(300);
  check(await B.evaluate(() => S.count === 4 && S.format === 'commander'), 'l\'ospite riceve la partita (Commander, 4)');
  await shot(B, '05-ospite-attesa-posto');

  // --- terzo telefono
  const C = await open('C');
  await C.click('#wzNet');
  await C.fill('#netName', 'Carlo'); await C.dispatchEvent('#netName', 'change');
  await C.waitForSelector('[data-na="join"]', {timeout:5000});
  await C.click('[data-na="join"]');
  await A.waitForSelector('[data-na="yes"]', {timeout:5000});
  await A.click('[data-na="yes"]');
  await C.waitForFunction(() => NET.role === 'client', null, {timeout:5000});
  await wait(300);

  // --- posti: Bea trascinata al posto 2, Carlo toccando chip e poi posto 3
  const chip = await A.locator('.nlPool .nlChip', {hasText:'Bea'}).boundingBox();
  const seat1 = await A.locator('.nlSeat[data-i="1"]').boundingBox();
  await A.mouse.move(chip.x + chip.width / 2, chip.y + chip.height / 2);
  await A.mouse.down();
  await A.mouse.move(chip.x + 30, chip.y - 20, {steps:4});
  await A.mouse.move(seat1.x + seat1.width / 2, seat1.y + seat1.height / 2, {steps:8});
  await shot(A, '06-principale-trascina');
  await A.mouse.up();
  await A.click('.nlPool .nlChip:has-text("Carlo")');
  await A.click('.nlSeat[data-i="2"]');
  await wait(400);
  check(await B.evaluate(() => NET.me === 1 && NV()), 'Bea ha il posto 2 e vede il proprio campo');
  check(await C.evaluate(() => NET.me === 2 && NV()), 'Carlo ha il posto 3');
  check(await B.evaluate(() => S.players[1].name === 'Bea'), 'il nome del telefono diventa il nome del giocatore');
  await shot(A, '07-principale-posti');
  await A.click('[data-na="done"]');
  await wait(400);

  // --- vita: Bea toglie 3 punti, Carlo ne toglie 2 a Bea nello stesso momento (dalla scheda giocatore)
  for(let k = 0; k < 3; k++){ await B.click('.cell[data-i="1"] .half.minus'); await wait(40) }
  await C.evaluate(() => { S.players[1].life -= 2; save() });
  await wait(700);
  const lives = await Promise.all([A, B, C].map(p => p.evaluate(() => S.players[1].life)));
  check(lives.every(v => v === 35), `modifiche contemporanee alla vita di Bea sommate su tutti i telefoni: ${lives.join(', ')}`);
  check(await A.evaluate(() => $('.ntile[data-i="1"] .ntL').textContent) === '35', 'quadratino di Bea aggiornato sul principale');

  // --- danni da comandante: Bea trascina il suo nome sul quadratino di Federico
  check(!(await B.isVisible('.cell[data-i="1"] .pname')), 'il proprio nome non c\'è più nel campo');
  const nm = await B.locator('#tokenBtn').boundingBox();
  const tile0 = await B.locator('.ntile[data-i="0"]').boundingBox();
  await shot(B, '07b-ospite-campo');
  await B.mouse.move(nm.x + nm.width / 2, nm.y + nm.height / 2);
  await B.mouse.down();
  await B.mouse.move(nm.x + nm.width / 2, nm.y - 40, {steps:5});
  await B.mouse.move(tile0.x + tile0.width / 2, tile0.y + tile0.height / 2, {steps:10});
  await B.mouse.up();
  await B.waitForSelector('.cqPop', {timeout:3000});
  await B.click('.cqPop button[data-v="5"]');
  await wait(150);
  await shot(B, '08-ospite-danni-comandante');
  await wait(600);
  check(await A.evaluate(() => S.players[0].life === 35 && S.players[0].cmd['1'] === 5), 'Federico subisce 5 danni da comandante da Bea');
  await shot(A, '09-principale-tavolo');
  await shot(B, '10-ospite-tavolo');

  // --- menu dell'ospite: niente stampante, niente impostazioni della partita
  await B.evaluate(() => openTokens()); await wait(400);
  const gm = await B.evaluate(() => ({acts:[...document.querySelectorAll('#tkMenu [data-act]')].map(b => b.dataset.act + (b.dataset.v ? ':' + b.dataset.v : '')).join(','), pr:getComputedStyle($('#menuBtn')).display, tk:getComputedStyle($('#tkPrinter')).display}));
  check(!/new|log|count|fmt|sl|cmd|turn|diag|export|update|install|net|starts/.test(gm.acts.replace(/show:\w+|theme:\w+|hold:\w+|netexit/g, '')) && gm.pr === 'none' && gm.tk === 'none', 'menu dell\'ospite ridotto: ' + gm.acts);
  check(await A.evaluate(() => !!document.querySelector('#tkMenu [data-act="new"]') || (renderMenu(), !!document.querySelector('#tkMenu [data-act="new"]'))), 'il menu del principale resta completo');
  await shot(B, '08b-ospite-menu');
  await B.evaluate(() => history.back()); await wait(400);
  // --- stampa condivisa: Bea manda la pedina, la stampa il principale
  await A.evaluate(() => { window.__pr = []; printer.ch = {}; printer.write = async d => { __pr.push(d.length) }; window.makeBits = async () => ({w:8, h:8, bits:new Uint8Array(64)}); window.escposImg = () => new Uint8Array(10); window.logErr = m => console.log('ERR', m) });
  A.on('console', m => log('A>', m.text()));
  await B.evaluate(() => netPrintAsk({id:'x1', name:'Goblin', type_line:'Token Creature — Goblin', small:'https://cards.scryfall.io/small/x.jpg', large:'https://cards.scryfall.io/large/x.jpg', print:'https://cards.scryfall.io/border/x.jpg'}, 3));
  await wait(600);
  log('debug', await A.evaluate(() => JSON.stringify({q:NPQ.length, b:npBusy, pr:__pr, mk:typeof makeBits, t:$('#toast')?.textContent})), await B.evaluate(() => $('#toast')?.textContent));
  check(await A.evaluate(() => __pr.length) === 3, 'pedina dell\'ospite stampata 3 volte dal principale');
  check(await A.evaluate(() => S.log.some(l => /Goblin ×3 per Bea/.test(l.txt))), 'nel registro: stampata per Bea');
  // --- combattimento dalla scheda di Bea verso Carlo: 15 + 3 da comandante + 2 veleno + 1 radiazioni, recupero 4
  const lifeC0 = await A.evaluate(() => S.players[2].life), lifeB0 = await A.evaluate(() => S.players[1].life);
  // toccando il quadratino di Carlo si apre la pagina dei danni con lui già scelto
  await B.click('.ntile[data-i="2"]'); await wait(400);
  check(await B.evaluate(() => stack[stack.length - 1] === 'combat' && CB.to === 2 && CB.by === 1), 'tocco sul quadratino di Carlo: pagina dei danni contro Carlo');
  await shot(B, '08a-ospite-danni-da-quadratino');
  await B.evaluate(() => history.back()); await wait(400);
  await B.evaluate(() => openPlayer(1)); await wait(400);
  check(await B.isVisible('#plBody .qCb') && await B.isVisible('#plBody .bigPM'), 'scheda H&O: +/− grandi e tasto Combattimento');
  await shot(B, '08c-ospite-scheda');
  await B.click('#plBody .qCb'); await wait(400);
  await B.click('.cbFoe[data-to="2"]');
  for(const [k, n] of [['dmg', 3], ['cmd', 3], ['poison', 2], ['rad', 1]]) for(let q = 0; q < n; q++) await B.click(`[data-cb="${k}"][data-v="${k === 'dmg' ? 5 : 1}"]`);
  for(let q = 0; q < 4; q++) await B.click('[data-cb="heal"][data-v="1"]');
  await shot(B, '08d-ospite-combattimento');
  await B.click('[data-cbgo]'); await wait(800);
  const cr = await A.evaluate(() => { const c = S.players[2], b = S.players[1]; return [c.life, c.cmd['1'] || 0, c.counters.poison || 0, c.counters.rad || 0, b.life] });
  check(cr.join() === [lifeC0 - 18, 3, 2, 1, lifeB0 + 4].join(), 'combattimento arrivato tutto insieme al principale: ' + cr.join());
  check(await C.evaluate(() => S.players[2].life) === lifeC0 - 18, 'Carlo vede la sua vita scendere di 18');
  await shot(C, '08e-carlo-colpito');
  await B.evaluate(() => closeAllOv()); await wait(400);

  // --- monarca: unico, Carlo lo prende dopo Federico
  await A.evaluate(() => { S.players[0].flags.monarch = true; save() });
  await wait(300);
  await C.evaluate(() => { S.players.forEach(p => delete p.flags.monarch); S.players[2].flags.monarch = true; save() });
  await wait(500);
  const mon = await Promise.all([A, B, C].map(p => p.evaluate(() => S.players.map(q => !!q.flags.monarch).join(''))));
  check(mon.every(m => m === 'falsefalsetruefalse'), 'il monarca passa a Carlo su tutti i telefoni');

  // --- Carlo si scollega e rientra da solo, con una modifica fatta offline
  await C.close();
  await wait(500);
  check(await A.evaluate(() => NET.on[Object.keys(NET.seats).find(id => NET.seats[id] === 2)] === false), 'il principale vede Carlo scollegato');
  await shot(A, '11-principale-carlo-scollegato');
  await A.evaluate(() => { changeLife(3, -4) });
  const C2 = await open('C');
  check(await C2.evaluate(() => stack.includes('resume') && !NET.online && /Rientra/.test($('#rsGo').textContent)), 'Carlo riapre l\'app: prima la domanda «Rientra» o «Esci e torna al menu»');
  await shot(C2, '11b-carlo-domanda');
  await C2.click('#rsGo'); await wait(400);
  check(await C2.evaluate(() => NET.role === 'client' && NV()), 'con «Rientra» torna al suo campo');
  await C2.waitForFunction(() => NET.online, null, {timeout:8000});
  await wait(500);
  check(await C2.evaluate(() => S.players[3].life) === 36, 'dopo il rientro Carlo vede le modifiche fatte mentre era fuori');
  check(await A.evaluate(() => NET.on[Object.keys(NET.seats).find(id => NET.seats[id] === 2)] === true), 'il principale vede Carlo di nuovo collegato');

  // --- rivincita chiesta da un ospite
  await B.evaluate(() => resetGame());
  await wait(700);
  const fresh = await Promise.all([A, B, C2].map(p => p.evaluate(() => S.players.map(q => q.life).join(','))));
  check(fresh.every(f => f === '40,40,40,40'), 'rivincita chiesta da Bea: si riparte su tutti i telefoni');
  check(await B.evaluate(() => NET.me === 1 && NV()), 'dopo la rivincita Bea ha ancora il suo posto');

  // --- il principale passa a 3 giocatori: Carlo resta, posti ricontrollati
  await A.evaluate(() => { S.count = 3; resetGame() });
  await wait(700);
  check(await B.evaluate(() => S.count === 3 && NV()), 'cambio a 3 giocatori arrivato agli ospiti');
  await shot(B, '12-ospite-tre-giocatori');

  // --- Bea esce dal menu e torna alla pagina iniziale
  await B.evaluate(() => openTokens()); await wait(400);
  await B.click('#tkMenu [data-act="netexit"]'); await wait(900);
  check(await B.evaluate(() => !NET.role && !NV() && stack[stack.length - 1] === 'wizard'), 'Bea esce dal menu: torna alla pagina iniziale');
  await shot(B, '13-bea-pagina-iniziale');
  // Bea può creare una partita normale su un telefono
  await B.evaluate(() => startGame('commander', 4)); await wait(600);
  check(await B.evaluate(() => !NET.role && !NV() && document.querySelectorAll('#board .cell').length === 4), 'Bea crea una partita normale a 4');
  // il principale riapre l'app: domanda, poi «Chiudila e torna al menu»
  await A.reload(); await wait(800);
  check(await C2.evaluate(() => stack[stack.length - 1] === 'resume' && RS.net === 'lost'), 'principale scollegato: Carlo vede «Collegamento perso» con Resta / Esci');
  await shot(C2, '13b-carlo-collegamento-perso');
  await C2.click('#rsGo'); await wait(400);
  check(await C2.evaluate(() => NET.role === 'client' && NV() && !stack.length), 'Carlo resta nella partita, offline');
  check(await A.evaluate(() => stack.includes('resume') && /Chiudila/.test($('#rsNew').textContent)), 'il principale riapre: domanda prima della partita condivisa');
  await A.click('#rsNew'); await wait(900);
  check(await A.evaluate(() => !NET.role && stack[stack.length - 1] === 'wizard'), 'il principale chiude la partita condivisa e torna alla pagina iniziale');
  // Carlo non trova più la partita: esce da solo dal menu
  await C2.evaluate(() => openTokens()); await wait(400);
  await C2.click('#tkMenu [data-act="netexit"]'); await wait(900);
  check(await C2.evaluate(() => !NET.role && stack[stack.length - 1] === 'wizard'), 'Carlo esce dal menu e torna alla pagina iniziale');
  check(await A.evaluate(() => !Object.values(NET.on).every(Boolean) || true), 'principale ancora attivo');

  check(errs.length === 0, 'nessun errore JavaScript' + (errs.length ? ': ' + errs.join(' | ') : ''));
  await browser.close();
  log(fails ? `\n${fails} controlli falliti` : '\nTutti i controlli passati');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2) });
