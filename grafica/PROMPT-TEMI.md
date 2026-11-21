# Richieste per le immagini di tutti i temi

Le immagini le disegna ChatGPT (o un'altra IA), io le animo e le monto nell'app. Una chat di ChatGPT **per tema**, sempre la stessa, così tiene lo stile. Prima di ogni richiesta si incolla il **blocco base** del tema.

## Regole per tutti i temi
- Sfondo **trasparente vero** (niente quadrettato finto): controllare aprendo il PNG su uno sfondo scuro.
- Soggetto intero con un po' di margine, niente testo, loghi, simboli di mana, niente stile di artisti o carte di Magic.
- Luce sempre **da in alto a sinistra**.
- Oggetti del campo (colpi, pezzi che volano): vista dall'alto leggermente di lato, come le radici di Selva. Interfaccia (cornici, elemento centrale, tasti): **di fronte, piatta**.
- Fogli con più pezzi (foglie, gocce, schegge…): pezzi separati su una griglia, che non si toccano; li ritaglio io.
- **Cornici e tasti**: angoli ricchi, lati semplici e uniformi (si allungano a qualsiasi misura). **Elemento centrale**: rettangolare con angoli smussati, centro vuoto e scuro per il simbolo; versione larga 2048×768 (H&O) e quadrata 1024×1024 (un telefono).
- **Luce blu della stampante**: in tutti i temi il centro dell'elemento centrale deve essere **scuro, vuoto e senza luce**. Lì metto io il simbolo dell'app e l'alone blu che pulsa quando la stampante è collegata (uguale per tutti i temi, come nel Classico). Se l'immagine ha luce o simboli al centro: «the center must be dark, empty and unlit».
- Sfondo della pagina iniziale in **tre livelli** 1080×2400: lontano (non trasparente), medio e vicino (trasparenti, centro vuoto).
- Numeri, tasti + e − e contatori restano puliti: le immagini vanno su cornici, sfondi ed effetti.

## Struttura uguale per ogni tema
Per ogni tema le stesse richieste, con il soggetto del tema:
1. **Colpo**: i pezzi dell'effetto che parte da chi attacca e arriva sul campo colpito.
2. **Colpo grosso** (5 punti persi di fila sul proprio telefono).
3. **Cornice** delle caselle, 1024×1024, spessore circa 70 px, centro vuoto trasparente.
4. **Elemento centrale**, largo e quadrato.
5. **Tasto principale**, 1024×256, centro liscio per il testo.
6. **Sfondo** della pagina iniziale, tre livelli.
7. **Inizio partita**: un oggetto simbolo che appare al centro.

---

## Selva (Verde) · bosco antico, bestie, elfi, druidi
Dettaglio completo in `grafica/selva/STILE.md`. Fatte: tre radici spinose.
**Blocco base**
```
Game asset for a mobile fantasy companion app, theme "Selva" (ancient forest, green nature magic). Painterly-realistic fantasy style with rich organic detail; not cartoon, not vintage engraving, not a photo. Palette: dark brown bark, moss greens, fresh leaf green, warm amber accents. Soft light from the top-left. Fully transparent background (real PNG alpha, no checkerboard), the whole subject visible with a small empty margin, not cropped. No text, no logos, no symbols, no cast shadow, no ground. Same style, same lighting and same viewing angle as the previous images.
```
Da fare, in ordine: liana intrecciata · viticcio con foglioline · foglio di 6 foglie · buco nel terreno · foglio di 6 zolle · **Lastra del druido** (elemento centrale, richieste nella chat del 21/11 e qui sotto) · cornice di legno e muschio · tasto · sfondo · zampa della bestia · squarci degli artigli · seme che germoglia.
```
UI element, front view, flat, no perspective: a wide horizontal plaque of ancient grey-green stone with soft moss, rectangular with slightly bevelled corners, proportion about 8:3. Its border is carved with fine elvish knotwork that runs all around. Two thorny tree roots grip the two short ends of the plaque like hands, wrapping over its edges; a few fresh small leaves sprout from the roots. The center of the plaque is a smooth, dark, slightly recessed area, completely empty: no symbol, no text, no glow. Transparent background around the plaque. 2048×768.
```

---

## Forgia (Rosso) · fuoco, acciaio, fulmine
Il fulmine (cuore blu, aloni bianchi) e le scintille restano fatti da me: piacciono così. Le immagini servono per la materia: acciaio, braci, lava.
**Blocco base**
```
Game asset for a mobile fantasy companion app, theme "Forgia" (a dwarven forge, red fire magic). Painterly-realistic fantasy style with rich detail; not cartoon, not a photo. Materials: dark hammered steel, black iron, rivets, glowing orange embers, molten lava cracks, brass accents. Palette: near-black steel, ember orange, molten yellow, deep red. Soft light from the top-left plus warm glow from the embers. Fully transparent background (real PNG alpha, no checkerboard), the whole subject visible with a small empty margin, not cropped. No text, no logos, no symbols, no cast shadow. Same style and lighting as the previous images.
```
1. **Colpo grosso, crepa di lava** (sul campo colpito), 1536×1024: `Seen from directly above: a jagged crack burst open in dark stone, glowing molten lava inside, small embers along the edges, everything else transparent.`
2. **Foglio di 6 schegge incandescenti**, 1024×1024: `A sheet of 6 separate small shards of red-hot metal, glowing at the edges, on a 3×2 grid, not touching.`
3. **Martello** (colpo grosso, cade sul campo), 1024×1024: `A heavy dwarven war hammer seen from above, dark steel head with glowing rune-like grooves (no letters), wrapped leather handle, embers falling from it.`
4. **Cornice**: `A rectangular frame border of dark hammered steel with rivets, front view, flat; the four corners have glowing ember cracks and small brass plates; straight sides simple and uniform; frame thickness about 70 px; center completely empty and transparent. 1024×1024.`
5. **Elemento centrale largo**: `UI element, front view, flat: a wide horizontal plate of black forged iron, rectangular with cut corners, proportion about 8:3, heavy rivets along the border, thin glowing ember lines in the seams. The center is a smooth dark recessed area, completely empty. Transparent background around it. 2048×768.` · **Quadrato**: stessa richiesta, `square, 1024×1024`.
6. **Tasto**: `A horizontal button plate of dark hammered steel with an ember-orange glowing inlay in the middle, rivets at the two ends, front view, flat; the middle is plain and uniform, empty for text. 1024×256.`
7. **Sfondo**: lontano `NOT transparent: the inside of a vast dwarven forge at night, stone pillars, distant furnaces glowing orange, smoke and floating embers, very dark at the bottom, no people. Portrait 1080×2400.` · medio `Transparent: silhouettes of chains, anvils and stone pillars only along the left and right edges, center empty. Portrait 1080×2400.` · vicino `Transparent: hanging chains and hot sparks in the two top corners, a glowing anvil edge in a bottom corner, center empty. Portrait 1080×2400.`
8. **Inizio partita**: `A glowing red-hot anvil seen from slightly above, sparks bursting from it. 1024×1024.`

---

## Abisso (Blu) · acqua, onde, magia e sapienza
Dettaglio completo in `grafica/abisso/STILE.md`.
Colpo deciso: colpo d'acqua e onde; sul campo colpito schizzi, cerchi d'onda, gocce che scivolano.
**Blocco base**
```
Game asset for a mobile fantasy companion app, theme "Abisso" (deep ocean, blue water and arcane magic). Painterly-realistic fantasy style with rich detail; not cartoon, not a photo. Materials: clear deep-blue water, white foam, pearl, polished blue crystal, silver filigree, faint glowing arcane runes (no letters). Palette: deep navy, ocean blue, turquoise, foam white, silver. Soft light from the top-left with soft caustic reflections. Fully transparent background (real PNG alpha, no checkerboard), the whole subject visible with a small empty margin, not cropped. No text, no logos, no symbols, no cast shadow. Same style and lighting as the previous images.
```
1. **Onda che si infrange** (il colpo), 2048×1024: `A cresting ocean wave seen from slightly above, moving from left to right, curling foam at the right end, translucent blue water.`
2. **Foglio di schizzi**, 1536×1024: `A sheet of 6 separate water splashes of different shapes, seen from directly above, translucent with white foam edges, on a 3×2 grid, not touching.`
3. **Foglio di gocce**, 1024×1024: `A sheet of 9 separate water droplets of different sizes, clear and glossy, on a 3×3 grid, not touching.`
4. **Anello d'onda** (cerchi sull'acqua), 1024×1024: `A single circular ripple ring on a water surface seen from directly above, thin and translucent, everything else transparent.`
5. **Colpo grosso, tentacolo** (esce dal campo e lo schiaccia), 2048×768: `A giant sea creature tentacle lying horizontally, thick at the left end, tapering to the right tip, suckers on one side, wet glossy blue-grey skin, clean rounded left end.`
6. **Cornice**: `A rectangular frame border of polished blue crystal and silver filigree, small pearls and sea shells on the four corners, front view, flat; straight sides simple and uniform; frame thickness about 70 px; center completely empty and transparent. 1024×1024.`
7. **Elemento centrale largo**: `UI element, front view, flat: a wide horizontal plaque of smooth blue crystal framed in silver filigree, rectangular with rounded corners, proportion about 8:3, a thin film of water flowing over its border. The center is a smooth dark-blue recessed area, completely empty. Transparent background. 2048×768.` · **Quadrato**: stessa, `square, 1024×1024`.
8. **Tasto**: `A horizontal button plate of blue crystal with a silver frame and a turquoise inlay in the middle, small shells at the two ends, front view, flat; middle plain for text. 1024×256.`
9. **Sfondo**: lontano `NOT transparent: an underwater view of a deep ocean, light rays from the top-left, distant sunken arches, darker toward the bottom, no creatures. Portrait 1080×2400.` · medio `Transparent: kelp and coral silhouettes only along the left and right edges, center empty. Portrait.` · vicino `Transparent: bubbles and seaweed in the two top corners and coral in the two bottom corners, center empty. Portrait.`
10. **Inizio partita**: `A glowing blue pearl inside an open sea shell, soft light. 1024×1024.`

---

## Cripta (Nero) · demoni, oscurità, anime
Dettaglio completo in `grafica/cripta/STILE.md` (il colpo lì è più ricco: due dardi, scia, due venature, impatto, ciuffi di fumo).
Colpo deciso: dardo fumoso nero e viola fatto di anime prosciugate; il campo avvizzisce (colori spenti, venature scure), poi torna normale. Fumo e scuro li faccio io; le immagini danno anime, vene e ossa.
**Blocco base**
```
Game asset for a mobile fantasy companion app, theme "Cripta" (dark necromantic magic, demons and drained souls). Painterly-realistic dark fantasy style with rich detail; eerie but not gory, no blood, not cartoon, not a photo. Materials: black stone, old bone, tarnished iron, black thorny brambles, ghostly violet smoke. Palette: near-black, deep violet, sickly green-grey, bone white. Soft light from the top-left plus a faint violet glow. Fully transparent background (real PNG alpha, no checkerboard), the whole subject visible with a small empty margin, not cropped. No text, no logos, no symbols, no cast shadow. Same style and lighting as the previous images.
```
1. **Foglio di anime** (il dardo), 1536×1024: `A sheet of 6 separate ghostly wailing faces made of violet-black smoke, translucent, each with a trailing wisp to the left, on a 3×2 grid, not touching.`
2. **Venature** (il campo avvizzisce), 1536×1536: `Seen from directly above: dark withering veins spreading out from the center like cracks of black rot with a faint violet glow, thinner toward the edges, everything else transparent.`
3. **Colpo grosso, mano scheletrica** (esce dal campo e lo afferra), 1024×1024: `A skeletal demonic hand seen from above, reaching and grasping, old bone with black claws, violet smoke around the wrist.`
4. **Rovi neri** (per i bordi del campo), 2048×512: `A black thorny bramble lying horizontally, dry and twisted, sharp thorns, thicker at the left end.`
5. **Cornice**: `A rectangular frame border of black carved stone with old bone ornaments and small skulls on the four corners, thin violet glowing cracks, front view, flat; straight sides simple and uniform; frame thickness about 70 px; center completely empty and transparent. 1024×1024.`
6. **Elemento centrale largo**: `UI element, front view, flat: a wide horizontal slab of black stone, rectangular with cut corners, proportion about 8:3, bone ornaments on the two short ends, a thin violet glow in the carved border. The center is a smooth very dark recessed area, completely empty. Transparent background. 2048×768.` · **Quadrato**: stessa, `square, 1024×1024`.
7. **Tasto**: `A horizontal button plate of black stone with a deep violet inlay in the middle and bone details at the two ends, front view, flat; middle plain for text. 1024×256.`
8. **Sfondo**: lontano `NOT transparent: a gothic crypt at night, tall broken arches, violet mist on the floor, faint moonlight from the top-left, very dark at the bottom, no creatures. Portrait 1080×2400.` · medio `Transparent: silhouettes of tombstones and dead trees only along the left and right edges, center empty. Portrait.` · vicino `Transparent: hanging chains and cobwebs in the two top corners, candles and skulls in the two bottom corners, center empty. Portrait.`
9. **Inizio partita**: `A floating black skull wreathed in violet flames. 1024×1024.`

---

## Santuario (Bianco) · angeli, luce, spiriti benevoli
Dettaglio completo in `grafica/santuario/STILE.md` (il colpo lì è più ricco: spada e lancia di luce, scia, impatto, aureola, piume e piumini).
Colpo deciso: raggio diretto di luce; il campo viene accecato da un lampo bianco che si dissolve. Luce e lampo li faccio io; le immagini danno piume, ali, aureole.
**Blocco base**
```
Game asset for a mobile fantasy companion app, theme "Santuario" (holy light, angels and benevolent spirits). Painterly-realistic fantasy style with rich detail; serene and luminous, not cartoon, not a photo. Materials: white marble, polished gold, soft white feathers, glowing light. Palette: ivory white, warm gold, pale sky blue, soft cream. Soft light from the top-left with a gentle golden glow. Fully transparent background (real PNG alpha, no checkerboard), the whole subject visible with a small empty margin, not cropped. No text, no logos, no symbols, no religious symbols, no cast shadow. Same style and lighting as the previous images.
```
1. **Foglio di piume**, 1536×1024: `A sheet of 6 separate single white feathers of different sizes, soft and slightly glowing, on a 3×2 grid, not touching.`
2. **Ali** (colpo grosso: ali che si aprono sul campo e lo coprono di luce), 2048×1024: `A pair of large white angelic wings fully spread, seen from the front, glowing edges, symmetrical, no body.`
3. **Aureola** (anello di luce sul campo colpito), 1024×1024: `A single thin golden halo ring of light seen from directly above, glowing softly, everything else transparent.`
4. **Spada di luce** (il raggio), 2048×512: `A long blade made of pure white-gold light lying horizontally, hilt at the left end of polished gold, glowing.`
5. **Cornice**: `A rectangular frame border of white marble with polished gold filigree and small feathers on the four corners, front view, flat; straight sides simple and uniform; frame thickness about 70 px; center completely empty and transparent. 1024×1024.`
6. **Elemento centrale largo**: `UI element, front view, flat: a wide horizontal plaque of white marble framed in polished gold, rectangular with rounded corners, proportion about 8:3, two small feathered wings on the two short ends. The center is a smooth soft-grey recessed area, completely empty. Transparent background. 2048×768.` · **Quadrato**: stessa, `square, 1024×1024`.
7. **Tasto**: `A horizontal button plate of white marble with a gold frame and a pale gold inlay in the middle, small feathers at the two ends, front view, flat; middle plain for text. 1024×256.`
8. **Sfondo**: lontano `NOT transparent: a vast sanctuary of white marble above the clouds at dawn, tall columns, golden light from the top-left, soft and bright but darker toward the bottom. Portrait 1080×2400.` · medio `Transparent: marble columns only along the left and right edges, center empty. Portrait.` · vicino `Transparent: drifting feathers and soft light rays in the two top corners, clouds in the two bottom corners, center empty. Portrait.`
9. **Inizio partita**: `A glowing white dove with spread wings made of light. 1024×1024.`

---

## Officina (Incolore) · artefatti e macchine  *(nome proposto)*
Colpo deciso: una bomba; arriva sul campo, esplode e lo schermo si frantuma (crepe e schegge che cadono), poi torna intero. Fumo e lampo li faccio io; le immagini danno bomba, crepe, schegge, ingranaggi.
**Blocco base**
```
Game asset for a mobile fantasy companion app, theme "Officina" (colorless artifacts, ancient clockwork machines). Painterly-realistic fantasy style with rich mechanical detail; not cartoon, not a photo. Materials: brushed steel, old brass, copper pipes, glass lenses, gears, rivets, faint white-blue glowing cores. Palette: steel grey, brass, copper, graphite, pale cyan glow. Soft light from the top-left. Fully transparent background (real PNG alpha, no checkerboard), the whole subject visible with a small empty margin, not cropped. No text, no logos, no symbols, no cast shadow. Same style and lighting as the previous images.
```
1. **Bomba** (il colpo), 1024×1024: `A round clockwork bomb seen from slightly above: brass and steel shell, rivets, small gears, a glowing pale-cyan core visible through a glass window, a short fuse sparking.`
2. **Crepe del vetro** (lo schermo si frantuma), 1080×2400: `Seen from directly above: a shattered glass crack pattern radiating from the center, thin bright crack lines with small chipped areas, everything else fully transparent.`
3. **Foglio di schegge di vetro**, 1536×1024: `A sheet of 8 separate sharp glass shards of different shapes, clear with bright edges, on a 4×2 grid, not touching.`
4. **Foglio di ingranaggi**, 1024×1024: `A sheet of 6 separate gears and cogs of different sizes, brass and steel, on a 3×2 grid, not touching.`
5. **Cornice**: `A rectangular frame border of brushed steel and brass with rivets, small gears and copper pipes on the four corners, front view, flat; straight sides simple and uniform; frame thickness about 70 px; center completely empty and transparent. 1024×1024.`
6. **Elemento centrale largo**: `UI element, front view, flat: a wide horizontal machine panel of brushed steel framed in brass, rectangular with cut corners, proportion about 8:3, small gears and a pressure gauge on the two short ends, rivets along the border. The center is a smooth dark glass recessed area, completely empty. Transparent background. 2048×768.` · **Quadrato**: stessa, `square, 1024×1024`.
7. **Tasto**: `A horizontal button plate of brushed steel with a brass frame and a pale cyan glowing glass strip in the middle, rivets at the two ends, front view, flat; middle plain for text. 1024×256.`
8. **Sfondo**: lontano `NOT transparent: a vast ancient clockwork workshop, giant gears and pipes fading into dim light, soft light from the top-left, very dark at the bottom, no people. Portrait 1080×2400.` · medio `Transparent: silhouettes of big gears and pipes only along the left and right edges, center empty. Portrait.` · vicino `Transparent: hanging chains and small gears in the two top corners, steam valves in the two bottom corners, center empty. Portrait.`
9. **Inizio partita**: `A brass clockwork core opening like a flower, glowing pale cyan inside. 1024×1024.`
