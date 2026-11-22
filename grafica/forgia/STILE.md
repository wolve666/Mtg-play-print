# Forgia: scheda di stile e richieste per le immagini

Il tema del Rosso, il primo nato (v0.17). Le immagini le disegna ChatGPT, io le controllo, le comprimo in WebP, le salvo qui in `grafica/forgia/` e le animo. Prima una pagina di prova pubblicata da provare sul telefono (`grafica/prove/prova-forgia.html`); nell'app si monta solo dopo il sì di Federico.

## Lo stile
- **Mondo**: una forgia dei nani nel cuore della montagna, di notte. Fuoco, braci, acciaio battuto, lava. Potente e rabbioso, ma pulito: niente sangue, niente teschi.
- **Materiali**: acciaio scuro martellato, ferro nero, rivetti, ottone, braci arancioni, crepe di lava fusa, pietra scura.
- **Colori** (gli stessi dell'app): fondo #0B0A0D, acciaio #0F0E13 / #17161C / #211F28, brace #FF4A1C, brace chiara #FF8A2A, oro #FFC24A / #C98A1E, rosso scuro #7A1405 / #B8240A, testo #F3EFE8.
- **Il fulmine resta mio**: cuore blu e quattro aloni bianchi, scintille e scosse fatti a codice, già approvati. Le immagini danno solo la **materia**: dove il fulmine colpisce, cosa si rompe, cosa vola.
- **Resa**: realistica dipinta, fantasy, ricca di dettagli. Niente cartone animato, niente foto.
- **Luce**: morbida da in alto a sinistra, più il bagliore caldo delle braci e della lava.
- **Vista**: gli oggetti del campo (bruciature, crepe, schegge, martello) **dall'alto**, leggermente di lato quando sono oggetti. Le parti dell'interfaccia (cornice, tasti, elemento centrale) **di fronte, piatte**.
- **Forme**: angoli tagliati, come già nell'app (caselle con l'angolo smussato, tasti a parallelogramma, esagoni). Niente forme tonde nell'interfaccia.
- **Carattere**: resta quello di oggi, Big Shoulders Display per i numeri della vita, Barlow per il resto. Numeri, tasti + e − e contatori restano puliti.
- **Regole fisse**: sfondo trasparente vero (niente quadrettato finto, niente fondo nero pieno), soggetto intero con un po' di margine, niente testo, rune vere, loghi o simboli, niente ombra sotto, niente stile di artisti o carte di Magic.

## Il colpo, come lo immagino
Il fulmine che passa da un telefono all'altro resta com'è (approvato). Cambia quello che lascia sul campo colpito:
1. **Mira e lancio**: come oggi. Il fulmine vivo segue il dito, si aggancia al quadratino, al rilascio attraversa ed esce dal bordo in alto.
2. **Impatto**: sul telefono colpito il fulmine entra dall'alto e scarica sul centro del campo. Dove tocca, il fondo si **spacca e si arroventa**: compare una **bruciatura con crepe incandescenti** che si accende di colpo e poi si raffredda (da giallo a arancione a rosso scuro) in un paio di secondi.
3. **Schegge e braci**: dalla crepa saltano **schegge di metallo rovente** che girano e cadono, con le scintille mie; il campo trema.
4. **Scosse**: le scosse blu si spargono sul campo per un secondo e mezzo, come oggi, e si spengono da sole. Il numero della vita resta sempre leggibile.

**Goblin bombarolo** (sorpresa, deciso il 21 novembre): circa un colpo su otto, al posto del fulmine, dal bordo del campo colpito spunta un **goblin** che corre saltellando, **lancia una bomba** tonda con la miccia accesa e scappa via. La bomba rimbalza un paio di volte sfrigolando, poi esplode: lampo, bruciatura, schegge e braci come nel colpo normale. Il fulmine resta il colpo di sempre; il goblin serve a far sorridere al tavolo.

**Colpo grosso** (5 punti persi di fila): il **fuoco del drago** (deciso il 21 novembre). Il campo si scurisce e passa l'**ombra delle ali** di un drago; dall'alto arriva un **getto di fiamme** che spazza il campo in diagonale; dove passa si apre la **crepa di lava**, che si raffredda piano e scompare. Il drago non si vede mai intero: ombra e fuoco fanno più paura e costano meno al telefono. In alternanza, se piace, il **martello** che cala sul campo e apre la stessa crepa.

Niente zampate in Forgia (sono della Selva). La bomba del goblin è rozza, tonda, con la miccia: la bomba di Mox (Incolore) dovrà essere diversa, meccanica, a ingranaggi.

Bagliori, raffreddamento (cambio di colore), tremolio, scintille, miccia, fiamme che avanzano e fulmini li faccio io a codice; le immagini danno la materia. Goblin e drago sono generici: nessun personaggio preso dalle carte di Magic.

## Come lavorare
1. Sempre **nella stessa chat** di ChatGPT per tutta la Forgia, così tiene lo stile.
2. **Incolla prima il blocco base**, poi la richiesta del pezzo.
3. Prima di mandarmele, apri ogni immagine su uno sfondo **chiaro e uno scuro**: qui i soggetti sono scuri con luci arancioni, quindi un fondo nero finto si nota solo su chiaro. Se vedi i quadretti o un riquadro pieno, va rifatta.
4. Mandamele qui in chat anche a gruppi: le controllo, le taglio, le comprimo e le metto nella pagina di prova.

## Blocco base (da mettere prima di ogni richiesta)
```
Game asset for a mobile fantasy companion app, theme "Forgia" (a dwarven forge, red fire magic). Painterly-realistic fantasy style with rich detail; not cartoon, not a photo. Materials: dark hammered steel, black iron, rivets, glowing orange embers, molten lava cracks, brass accents. Palette: near-black steel, ember orange, molten yellow, deep red. Soft light from the top-left plus warm glow from the embers. Fully transparent background (real PNG alpha, no checkerboard, no black background), the whole subject visible with a small empty margin, not cropped. No text, no letters, no logos, no symbols, no cast shadow. Same style and lighting as the previous images.
```

## Le richieste, in ordine
### A. Il colpo (prima di tutto)
1. **Bruciatura del fulmine** (dove il fulmine tocca il campo), 1024×1024
```
Seen from directly above: a scorched impact mark on dark steel plate where lightning struck: a small blackened crater in the center, thin glowing orange-yellow cracks spreading outward like a star, the metal around the crater slightly melted and red-hot, a few embers. The steel plate fades out to transparent at the edges, everything else transparent. 1024×1024.
```
2. **Seconda bruciatura, diversa**, 1024×1024 (ogni colpo ne pesca una, così non sembra mai lo stesso)
```
A second scorched impact mark, different from the first, seen from directly above: an irregular burnt splash on dark stone, branching glowing cracks like lightning scars, molten droplets around it. The stone fades out to transparent at the edges, everything else transparent. 1024×1024.
```
3. **Foglio di 6 schegge incandescenti**, 1024×1024 (le taglio io)
```
A sheet of 6 separate small shards of red-hot metal of different shapes, glowing yellow-orange at the edges and dark in the middle, arranged on a 3×2 grid, evenly spaced and not touching.
```
4. **Foglio di 6 braci**, 1024×1024 (facoltativo: se non arriva, le braci le faccio io)
```
A sheet of 6 separate small glowing embers and burning coal pieces of different sizes, arranged on a 3×2 grid, evenly spaced and not touching.
```

### A1. Elettricità (facoltative, deciso il 21 novembre)
Il fulmine principale resta a codice (si ridisegna a ogni fotogramma e segue il dito). Queste due immagini lo arricchiscono: nella pagina di prova vanno accanto alla versione a codice, con un interruttore, e Federico sceglie sul telefono. Sono le uniche della Forgia in **blu e bianco**: la richiesta lo dice, così ChatGPT non le colora d'arancione.

4a. **Foglio di 6 archi elettrici** (scosse sul campo colpito), 1536×1024 (li taglio io)
```
A sheet of 6 separate small electric arcs, each one a short jagged crackling lightning spark of a different shape (straight, forked, curled, star-shaped), electric blue core with bright white glow around it, arranged on a 3×2 grid, evenly spaced and not touching. These images use electric blue and white instead of the orange palette. Everything else transparent. 1536×1024.
```
4b. **Bruciatura elettrica** (impatto, terza variante), 1024×1024
```
Seen from directly above: a scorched impact mark on dark steel plate where lightning struck, a blackened crater with glowing orange cracks, and thin crackling electric blue-white arcs still dancing around the crater and along the cracks. The steel plate fades out to transparent at the edges, everything else transparent. 1024×1024.
```

### A2. Il goblin bombarolo (sorpresa)
Le due pose del goblin devono essere **lo stesso goblin**, stessa misura e stessa vista: chiedile una dopo l'altra nella stessa chat. Vista dall'alto, leggermente di lato, come gli oggetti del campo.

5. **Goblin pronto al lancio**, 1024×1024
```
A small mischievous fantasy goblin seen from above and slightly from the side, running, grinning with sharp teeth, green-grey skin, big pointed ears, ragged leather and scrap-metal armor, holding a round black bomb with a lit fuse over his head with both hands. Not cartoon: painterly-realistic, but funny and expressive. 1024×1024.
```
6. **Stesso goblin che lancia**, 1024×1024
```
The same goblin as in the previous image, same size, same view and same lighting, now in the throwing pose: one arm stretched forward after the throw, hands empty, laughing, one foot off the ground. 1024×1024.
```
7. **Bomba**, 512×512
```
A round black iron bomb seen from slightly above, rough riveted metal with dents and soot, a short fuse on top with a glowing spark at its tip. 512×512.
```

### B. Il colpo grosso: il fuoco del drago
8. **Ombra del drago in volo**, 2048×1024
```
The dark shadow silhouette of a large dragon in flight seen from directly below, wings fully spread, long tail, soft blurred edges like a shadow cast on the ground, pure translucent black-brown, no details inside, everything else transparent. 2048×1024.
```
9. **Getto di fuoco del drago**, 2048×512 (lo allungo io dalla partenza al bersaglio, quindi deve essere uniforme)
```
A straight horizontal jet of roaring dragon fire seen from the side, running from left to right: a white-yellow hot core, orange and deep red flames curling around it, smoke wisps and embers at the edges, uniform along its whole length, the left end narrow and dense, the right end wide and fading softly to transparent. 2048×512.
```
10. **Crepa di lava** (sul campo colpito), 1536×1024
```
Seen from directly above: a large jagged crack burst open in dark stone, glowing molten lava inside, small embers along the edges; the stone fades out to transparent at the edges, everything else transparent. 1536×1024.
```
11. **Martello** (in alternanza al drago, cala sul campo), 1024×1024
```
A heavy dwarven war hammer seen from above, slightly from the side, dark steel head with glowing grooves (no letters, no runes), wrapped leather handle, a few embers falling from it. 1024×1024.
```

### C. L'interfaccia (dopo, quando Federico dice di passarci)
12. **Cornice delle caselle**, 1024×1024
```
A rectangular frame border of dark hammered steel with rivets, front view, flat; the four corners are cut at 45° and carry glowing ember cracks and small brass plates; the straight sides are simple and uniform so they can be stretched; frame thickness about 70 px; the center is completely empty and transparent. 1024×1024.
```
13. **Elemento centrale largo (H&O)**, 2048×768 · **quadrato**: stessa richiesta con `square, 1024×1024`
```
UI element, front view, flat: a wide horizontal plate of black forged iron, rectangular with cut corners, proportion about 8:3, heavy rivets along the border, thin glowing ember lines in the seams. The center is a smooth dark recessed area, completely empty: the center must be dark, empty and unlit. Transparent background around it. 2048×768.
```
14. **Tasto principale**, 1024×256
```
A horizontal button plate of dark hammered steel with an ember-orange glowing inlay in the middle, rivets at the two ends, front view, flat; the middle is plain and uniform, empty for text, so it can be stretched. 1024×256.
```

### D. Pagina iniziale e inizio partita
15. **Sfondo**, tre immagini 1080×2400 (verticali)
- 15a, lontano (senza trasparenza):
```
Background, NOT transparent: the inside of a vast dwarven forge at night, stone pillars, distant furnaces glowing orange, smoke and floating embers, very dark at the bottom, no people. Portrait 1080×2400.
```
- 15b, medio:
```
Transparent background: silhouettes of chains, anvils and stone pillars only along the left and right edges, the center completely empty. Portrait 1080×2400.
```
- 15c, vicino:
```
Transparent background: hanging chains and hot sparks in the two top corners, a glowing anvil edge in one bottom corner, the center completely empty. Portrait 1080×2400.
```
16. **Inizio partita**, 1024×1024
```
A glowing red-hot anvil seen from slightly above, sparks bursting from it. 1024×1024.
```

## Stato
- 21 novembre 2026: scheda pronta. Si parte dal colpo (A); pagina di prova `grafica/prove/prova-forgia.html` appena arrivano le prime immagini. Aggiunti lo stesso giorno il goblin bombarolo (A2) e il fuoco del drago (B): nella pagina di prova entrano dopo il fulmine, con un interruttore. Interfaccia e pagina iniziale (C, D) solo dopo le indicazioni di Federico.
- 22 novembre: colpo grosso **il fuoco del drago** montato nella prova dei colpi con le immagini arrivate (ombra del drago, soffio di fuoco, isola di roccia vulcanica, cratere di lava). L'ombra passa prima sul tappeto di chi attacca e vola via verso l'alto, poi scende sul tappeto colpito, che si scurisce; il getto di fuoco arriva da fuori schermo in alto e spazza il tappeto in diagonale; dove passa si apre la lava, che si raffredda e scompare. Sul tappeto di chi attacca resta il riflesso del fuoco lontano. Martello non ancora usato.
- 22 novembre, dopo il parere di Federico: ombra del drago lenta e sempre diversa (lato, curva, velocità, grandezza, battito d'ali); il fuoco non è più un disegno stirato che pulsa, ma scende dall'alto come tante lingue di fiamma che corrono verso il tappeto e schizzano ovunque dove toccano; sotto restano bruciature annerite con la lava che si raffredda.
- 22 novembre: fulmine d'arrivo più grosso e frastagliato in modo irregolare (più rami, sottorami). Goblin nuovo: sbuca grande da un angolo in basso del tappeto colpito (dal fianco o da sotto, a caso), fino a poco sotto la vita; non si sposta, si piegano solo le braccia che caricano e lanciano la bomba; poi passa alla posa a braccio teso e torna da dove è venuto.
- 22 novembre, goblin rifatto (il lancio a braccia piegate bocciato): il goblin sbuca da un angolo in basso con la bomba in mano, ghigna e sparisce; poi la bomba piomba dall'alto, enorme, rimpicciolisce mentre cade, rimbalza 3 o 4 volte sempre più basso, si ferma, sfrigola ed esplode dopo un tempo a caso.
