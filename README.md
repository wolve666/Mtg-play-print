# Magic Play&Print

Segnapunti per Magic: The Gathering da 2 a 6 giocatori, con stampa delle pedine ufficiali su stampantina termica portatile da 58 mm.
App Android realizzata da **E-Duck Garage**.

## Download

Scarica l'ultima `MagicPlayPrint.apk` da [Releases](https://github.com/wolve666/Mtg-play-print/releases/latest) e installala sul telefono. Android chiederà di consentire l'installazione da origini sconosciute.

## Cosa fa

**Tavolo di gioco**
- Formati Standard, Commander, Brawl e Oathbreaker, da 2 a 6 giocatori, con i punti vita iniziali già impostati.
- Pannelli orientati verso ogni giocatore, con colori o illustrazioni personalizzabili.
- Segnalini mostrati solo quando servono: veleno, energia, esperienza, radiazioni, tassa del comandante e un indicatore per ogni avversario che ha fatto danno da comandante, con una luce interna nel suo colore.
- Pannello personale: uno swipe in su sulla linguetta in fondo alla scheda la fa salire e scopre energia, esperienza, tassa, radiazioni, monarca, iniziativa, benedizione della città, nome, colore e sfondo del comandante.
- Trascinando il proprio nome sulla scheda di un avversario si assegnano danni da comandante, veleno o radiazioni.
- Dadi e moneta con lancio animato, più dadi insieme con la somma, «Chi inizia?», registro della partita e rilevamento del vincitore con rivincita.

**Pagina iniziale**
- Tasti «Stampa pedine» e «Dadi e moneta», usabili anche senza aprire una partita.
- Accanto a ogni formato, il cerchietto con la «i» mostra le regole principali.

**Pedine**
- Tieni premuto il simbolo centrale e chiedi a voce la pedina, ad esempio «drago 5/5 volare rapidità».
- L'app capisce tipo, forza/costituzione e abilità, mostra la pedina e dopo 3 secondi la stampa. Se tocchi la finestra entro quel tempo, la stampa si annulla.
- Le pedine sono solo quelle ufficiali Wizards, prese da [Scryfall](https://scryfall.com).
- C'è un archivio offline con l'ultima versione di ogni pedina, per giocare anche senza rete.

**Stampa**
- Stampanti termiche ESC/POS da 58 mm in Bluetooth classico. È stata provata sulla NetumScan NS1809DD.
- Il ricollegamento è automatico. Nelle impostazioni puoi regolare luminosità, modalità di stampa (fluida, bilanciata, prudente) e dimensione della pedina.

**Aggiornamenti**
- La versione è visibile accanto al nome. Toccandola, l'app verifica gli aggiornamenti.
- L'app controlla anche da sola. Quando trova una nuova versione mostra un avviso con i tasti «Aggiorna» e «Dopo».
- Se cambia solo la pagina dell'app, l'aggiornamento avviene dentro l'app (circa 150 kB). Se cambia la parte nativa, l'app scarica la nuova APK.

## Compilazione

L'APK viene compilata da GitHub Actions (`.github/workflows/build.yml`) a ogni push su `main`. Il workflow pubblica la release `v<versione>`, leggendo la versione da `var APPV` in `index.html`.

Segreti richiesti nel repository:
- `KEYSTORE_B64`: il keystore di firma codificato in base64.
- `KEYSTORE_PASS`: la password del keystore.

Struttura:
- `index.html`: tutta l'app (interfaccia e logica), basata su Capacitor.
- `native/`: la parte Java (Bluetooth classico, dettatura, esclusione dei gesti di sistema). Quando cambia, va alzato `APPN` in `index.html`.
- `icon-512.png`: l'icona dell'app.

## Registro delle modifiche

### v0.14.0
Revisione dell'interfaccia. Cambia anche la parte nativa (APPN 3): l'aggiornamento scarica l'APK.
- Tavolo: un indicatore del danno da comandante per ogni avversario, con luce interna che respira nel suo colore. Quando la riga in alto è accesa, il numero della vita si riduce all'84% per non toccare le icone.
- Tavolo: spie in basso (monarca, benedizione, iniziativa, turno) spente per ora. Restano nel codice.
- Tavolo: la finestra dei danni da comandante compare senza ruotare.
- Pannello personale a scheda, aperto con lo swipe sulla linguetta. La zona della linguetta è esclusa dai gesti di Android.
- Trascinando il nome si sceglie tra danni da comandante, veleno e radiazioni.
- Scheda completa del giocatore: la freccia indietro non finisce più sotto i tasti del telefono.
- Pagina iniziale: tasti «Stampa pedine» e «Dadi e moneta», regole dei formati con il tasto «i».
- Dadi e moneta rifatti: disegni grandi, lancio animato, risultato illuminato, più dadi con la somma, ultimi 6 lanci e «Chi inizia?».
- Guida aggiornata con i passi nuovi. Chi l'aveva già vista la rivede una volta.

## Privacy

Il microfono si attiva solo mentre tieni premuto il pulsante. Dal menu puoi scegliere se salvare le clip audio delle richieste di pedina, per migliorare il riconoscimento. Le clip restano sul telefono finché non le esporti tu.

## Note legali

Magic: The Gathering e le immagini delle pedine sono proprietà di Wizards of the Coast. Quest'app è un progetto amatoriale non ufficiale, non approvato né sponsorizzato da Wizards of the Coast. Dati e immagini sono forniti da Scryfall.
