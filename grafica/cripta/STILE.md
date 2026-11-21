# Cripta: scheda di stile e richieste per le immagini

Il tema del Nero. Le immagini le disegna ChatGPT, io le animo e le monto nell'app. Questa scheda serve a farle tutte coerenti.

## Lo stile
- **Mondo**: magia nera e negromanzia, demoni, anime prosciugate, cripte. Inquietante ma **non splatter**: niente sangue, niente carne.
- **Materiali**: pietra nera, osso vecchio, ferro arrugginito e scurito, rovi neri spinosi, fumo viola spettrale.
- **Colori**: quasi nero #0B0910, pietra #24202A, viola profondo #3B1A5C, bagliore viola #8E4FD6, verde-grigio malato #6F7D68, osso #D9CFB8.
- **Resa**: realistica dipinta, dark fantasy, ricca di dettagli. Niente cartone animato, niente foto.
- **Luce**: morbida, sempre da in alto a sinistra, più un leggero bagliore viola.
- **Vista**: gli oggetti del campo (dardo, anime, venature, mano, rovi) dall'alto o leggermente di lato. Le parti dell'interfaccia (cornice, tasti, elemento centrale) di fronte, piatte.
- **Regole fisse**: sfondo trasparente vero (niente quadrettato finto), soggetto intero con un po' di margine, niente testo, loghi, rune leggibili o simboli, niente ombra sotto, niente stile di artisti o carte di Magic.

## Come lavorare
1. Sempre **nella stessa chat** di ChatGPT, così tiene lo stile.
2. **Incolla prima il blocco base**, poi la richiesta del pezzo.
3. Prima di mandarmele, apri ogni immagine su uno sfondo chiaro **e** su uno scuro: se vedi i quadretti, va rifatta. Qui conta doppio: il fumo è scuro e semitrasparente, e su sfondo nero non si capisce se il trasparente è vero.
4. Mandamele qui in chat anche a gruppi: le controllo, le taglio, le comprimo e le metto nella pagina di prova.

## Blocco base (da mettere prima di ogni richiesta)
```
Game asset for a mobile fantasy companion app, theme "Cripta" (dark necromantic magic, demons and drained souls). Painterly-realistic dark fantasy style with rich detail; eerie but not gory, no blood, not cartoon, not a photo. Materials: black stone, old bone, tarnished iron, black thorny brambles, ghostly violet smoke. Palette: near-black, deep violet, sickly green-grey, bone white. Soft light from the top-left plus a faint violet glow. Fully transparent background (real PNG alpha, no checkerboard), the whole subject visible with a small empty margin, not cropped. No text, no logos, no symbols, no cast shadow. Same style and lighting as the previous images.
```

## Le richieste, in ordine
### A. Il colpo (prima di tutto)
Il colpo ha tre momenti: dall'elemento centrale di chi attacca esce un dardo di fumo che segue il dito; al rilascio parte, con le anime che gli girano attorno, ed esce dal bordo; sul telefono colpito si pianta al centro del campo, il campo avvizzisce (colori spenti, venature nere che si allargano), poi torna normale. Due dardi e due venature diverse, così ogni colpo ne pesca uno e non sembra mai lo stesso.

1. **Punta del dardo** (il colpo), 2048×512
```
A spectral dart made of dense black and violet smoke lying horizontally, pointing to the right: a sharp dark arrowhead of shadow at the right end, the smoky body thinning out to the left into loose wisps. Faint violet glow inside the smoke. 2048×512.
```
2. **Secondo dardo, fatto di anime**, 2048×512
```
A second spectral dart, different from the first: lying horizontally and pointing to the right, made of several ghostly translucent faces with open mouths twisted together in violet-black smoke, the sharpest face at the right tip, the smoke trailing off into loose wisps on the left. 2048×512.
```
3. **Scia di fumo** (dietro il dardo, la allungo io), 2048×512
```
A long horizontal strip of drifting black and violet smoke seen from the side, flowing from left to right, soft swirls and a few faint violet sparks, uniform along its whole length with no head and no ends, the two short ends fading softly to transparent. 2048×512.
```
4. **Anime**, un foglio unico 1536×1024 (le taglio io)
```
A sheet of 6 separate ghostly wailing faces made of violet-black smoke, translucent, each with a trailing wisp to the left, different expressions, on a 3×2 grid, evenly spaced and not touching. 1536×1024.
```
5. **Venature** (il campo avvizzisce), 1536×1536
```
Seen from directly above: dark withering veins spreading out from the center like cracks of black rot with a faint violet glow, branching and thinner toward the edges, everything else transparent. 1536×1536.
```
6. **Seconde venature, più fitte**, 1536×1536
```
Seen from directly above: a second pattern of black rotting veins, different from the first: denser and more tangled, like the dark roots of a dead tree spreading from the center, thin violet glowing lines inside the thickest veins, fading to nothing toward the edges, everything else transparent. 1536×1536.
```
7. **Impatto visto dall'alto** (il dardo si pianta nel campo), 1024×1024
```
Seen from directly above: a burst of black and violet smoke exploding outward in all directions from a small dark hole in the center, ragged smoky edges, a few faint ghostly faces dissolving in the smoke, everything else transparent. 1024×1024.
```
8. **Ciuffi di fumo**, un foglio unico 1536×1024
```
A sheet of 6 separate small puffs and curls of black-violet smoke of different shapes, soft translucent edges, on a 3×2 grid, evenly spaced and not touching. 1536×1024.
```

### B. Il colpo grosso
9. **Mano scheletrica** (esce dal campo e lo afferra), 1024×1024
```
A skeletal demonic hand seen from above, reaching and grasping, old bone with black claws, violet smoke around the wrist. 1024×1024.
```
10. **Rovi neri** (per i bordi del campo), 2048×512
```
A black thorny bramble lying horizontally, dry and twisted, sharp thorns, thicker at the left end, clean rounded left end, not cut. 2048×512.
```

### C. L'interfaccia
11. **Cornice delle caselle**, 1024×1024
```
A rectangular frame border of black carved stone with old bone ornaments and small skulls on the four corners, thin violet glowing cracks, front view, flat; straight sides simple and uniform; frame thickness about 70 px; center completely empty and transparent. 1024×1024.
```
12. **Elemento centrale largo (H&O)**, 2048×768
```
UI element, front view, flat: a wide horizontal slab of black stone, rectangular with cut corners, proportion about 8:3, bone ornaments on the two short ends, a thin violet glow in the carved border. The center is a smooth very dark recessed area, completely empty and unlit: no glow, no symbol. Transparent background. 2048×768.
```
13. **Elemento centrale quadrato**, 1024×1024
```
UI element, front view, flat: a square slab of black stone with cut corners, bone ornaments on the four corners, a thin violet glow in the carved border. The center is a smooth very dark recessed area, completely empty and unlit: no glow, no symbol. Transparent background. 1024×1024.
```
14. **Tasto principale**, 1024×256
```
A horizontal button plate of black stone with a deep violet inlay in the middle and bone details at the two ends, front view, flat; the middle is plain and uniform, empty for text. 1024×256.
```
15. **Sfondo della pagina iniziale**, tre immagini 1080×2400 (verticali)
- 15a, lontano (questa senza trasparenza):
```
Background, NOT transparent: a gothic crypt at night, tall broken arches, violet mist on the floor, faint moonlight from the top-left, very dark at the bottom, no creatures. Portrait 1080×2400.
```
- 15b, medio:
```
Transparent background: silhouettes of tombstones and dead trees only along the left and right edges, the center completely empty. Portrait 1080×2400.
```
- 15c, vicino:
```
Transparent background: hanging chains and cobwebs in the two top corners, candles and skulls in the two bottom corners, the center completely empty. Portrait 1080×2400.
```

### D. I grandi momenti
16. **Teschio nelle fiamme viola** (inizio partita), 1024×1024
```
A floating black skull wreathed in violet flames. 1024×1024.
```
