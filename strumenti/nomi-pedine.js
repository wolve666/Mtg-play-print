// Elenco dei nomi per capire le richieste a voce: pedine, emblemi, tipi e sottotipi, presi da Scryfall una volta sola.
// Li scrive dentro index.html, tra /*NOMI:INIZIO*/ e /*NOMI:FINE*/: così arrivano anche con gli aggiornamenti in app
// (che scaricano solo index.html) e funzionano offline.
// Si rilancia a mano quando escono set nuovi:  node strumenti/nomi-pedine.js
const fs = require('fs'), path = require('path');
const HTML = path.resolve(__dirname, '..', 'index.html');
const UA = {'User-Agent': 'MagicPlayPrint-tools/1.0', Accept: 'application/json'};
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function get(url){
  for(let k = 0; ; k++){
    const r = await fetch(url, {headers: UA});
    if(r.status === 404) return null;
    if(r.ok) return r.json();
    if(k >= 3) throw new Error(url + ' → ' + r.status);
    await sleep(1000 * (k + 1));
  }
}
async function search(q){
  const out = [];
  let url = 'https://api.scryfall.com/cards/search?unique=cards&include_extras=true&q=' + encodeURIComponent(q);
  while(url){ const d = await get(url); if(!d) break; out.push(...d.data); url = d.has_more ? d.next_page : null; await sleep(120) }
  return out;
}
const faces = c => c.card_faces && !c.image_uris ? c.card_faces : c.card_faces ? c.card_faces : [c];

(async () => {
  // tipi e sottotipi
  const CAT = ['card-types', 'supertypes', 'creature-types', 'artifact-types', 'enchantment-types', 'land-types', 'planeswalker-types', 'battle-types', 'spell-types'];
  const cat = {};
  for(const c of CAT){ cat[c] = (await get('https://api.scryfall.com/catalog/' + c)).data; await sleep(120) }
  const pw = cat['planeswalker-types'];
  const tipi = [...new Set(CAT.filter(c => c !== 'planeswalker-types').flatMap(c => cat[c]))].sort();

  // pedine: nomi di tutte le facce che sono pedine (non le carte vere stampate sul retro)
  const tokens = await search('is:token game:paper');
  const pedine = new Set(), usati = new Set();
  for(const c of tokens) for(const f of faces(c)){
    const tl = f.type_line || c.type_line || '';
    if(!/\bToken\b|^(Artifact|Enchantment|Creature)/.test(tl) || /Emblem/.test(tl) || !f.name || f.name === 'Card') continue;
    pedine.add(f.name);
    (tl.split('—')[1] || '').trim().split(/\s+/).forEach(t => tipi.includes(t) && usati.add(t));
  }

  // emblemi: uno per nome (la stampa più recente), con il planeswalker a cui appartengono
  const emb = await search('layout:emblem prefer:newest');
  const byName = new Map();
  for(const c of emb){ if(!c.image_uris) continue; const o = byName.get(c.name); if(!o || c.released_at > o.released_at) byName.set(c.name, c) }
  const emblemi = [], senza = [];
  for(const c of [...byName.values()].sort((a, b) => a.name.localeCompare(b.name))){
    const base = c.name.replace(/\s+Emblem$/, '');
    const sub = (c.type_line.split('—')[1] || '').trim();
    // il planeswalker: sottotipo dell'emblema se c'è, altrimenti il primo tipo di planeswalker nel nome
    // (Sephiroth, la Triade Capitolina: senza planeswalker, vale il nome dell'emblema senza «The» e senza titolo)
    const who = pw.includes(sub) ? sub : pw.find(p => new RegExp("(^|[\\s,])" + p.replace(/[.]/g, '\\.') + "($|[\\s,'’])").test(base)) || '';
    if(!who) senza.push(c.name);
    const m = c.image_uris.large.match(/\/([0-9a-f-]{36})\.jpg\?(\d+)/);
    emblemi.push([who || base.replace(/^The /, '').split(',')[0], base, m ? m[1] : c.id, m ? m[2] : '', c.set_name]);
  }

  // tipi: tutti; tp: i sottotipi che compaiono davvero sulle pedine (per le parole da preferire)
  const data = {v: new Date().toISOString().slice(0, 10), tipi, tp: [...usati].sort(), pw, pedine: [...pedine].sort(), emblemi};
  const txt = '/*NOMI:INIZIO*/\n// generato da strumenti/nomi-pedine.js (Scryfall, ' + data.v + '): non modificare a mano\n'
    + 'const NOMI_PEDINE = ' + JSON.stringify(data).replace(/\],\[/g, '],\n[') + ';\n/*NOMI:FINE*/';
  const html = fs.readFileSync(HTML, 'utf8'), re = /\/\*NOMI:INIZIO\*\/[\s\S]*?\/\*NOMI:FINE\*\//;
  if(!re.test(html)) throw new Error('in index.html mancano i segnaposto /*NOMI:INIZIO*/ … /*NOMI:FINE*/');
  fs.writeFileSync(HTML, html.replace(re, () => txt));
  console.log(`tipi ${tipi.length} (sulle pedine ${usati.size}), planeswalker ${pw.length}, pedine ${pedine.size}, emblemi ${emblemi.length}, ${(txt.length / 1024).toFixed(1)} KB`);
  if(senza.length) console.log('emblemi senza planeswalker riconosciuto:', senza.join('; '));
})().catch(e => { console.error(e); process.exit(1) });
