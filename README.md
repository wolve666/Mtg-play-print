# Magic Play&Print

Segnapunti per Magic: The Gathering da 2 a 6 giocatori, con stampa delle pedine ufficiali su stampantina termica portatile da 58 mm.
App Android realizzata da **E-Duck Garage**.

## Download

Scarica l'ultima `MagicPlayPrint.apk` da [Releases](https://github.com/wolve666/Mtg-play-print/releases/latest) e installala sul telefono. Android chiederà di consentire l'installazione da origini sconosciute.

## Cosa fa

**Tavolo di gioco**
- Formati Standard, Commander, Brawl e Oathbreaker, da 2 a 6 giocatori, con i punti vita iniziali già impostati.
- Pannelli orientati verso ogni giocatore, con colori o illustrazioni personalizzabili.
- Segnalini mostrati solo quando servono: veleno, energia, esperienza, radiazioni, tassa del comandante, danni da comandante, monarca, benedizione della città e iniziativa.
- Turni con timer di partita, «Chi inizia?», dadi e moneta, registro della partita e rilevamento del vincitore con rivincita.

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
- `native/`: il modulo Java per il Bluetooth classico. Quando cambia, va alzato `APPN` in `index.html`.
- `icon-512.png`: l'icona dell'app.

## Privacy

Il microfono si attiva solo mentre tieni premuto il pulsante. Dal menu puoi scegliere se salvare le clip audio delle richieste di pedina, per migliorare il riconoscimento. Le clip restano sul telefono finché non le esporti tu.

## Note legali

Magic: The Gathering e le immagini delle pedine sono proprietà di Wizards of the Coast. Quest'app è un progetto amatoriale non ufficiale, non approvato né sponsorizzato da Wizards of the Coast. Dati e immagini sono forniti da Scryfall.
