# Magic Play&Print – prototipo v0.1

PWA in italiano con segnapunti Standard/Commander, dadi, moneta, ricerca pedine Scryfall e riconoscimento vocale del browser.

## Avvio

La PWA richiede HTTPS (oppure localhost) per service worker e installazione. Per provarla in locale:

```bash
python -m http.server 8000
```

Poi aprire `http://localhost:8000` nella cartella del progetto. Per provarla su Android pubblicare la cartella su un hosting statico HTTPS.

## Limiti di questa prima bozza

- I dati della partita sono temporanei; i nomi giocatore sono salvati sul dispositivo.
- Il riconoscimento vocale dipende dal browser e dalla lingua supportata.
- La ricerca usa l'API pubblica Scryfall e richiede Internet.
- La stampa apre la finestra di stampa del dispositivo. Non è ancora implementato il collegamento Bluetooth diretto alla stampante termica.
- Il contatore danni da comandante in questa bozza è un totale per giocatore, non ancora distinto per ogni avversario.
- Il pulsante “Annulla ultima” ripristina le ultime modifiche di gioco durante la sessione.

## Prossimi passaggi

1. Completare undo e persistenza/recupero della partita.
2. Tracciare danni da ciascun comandante avversario.
3. Migliorare l'interpretazione vocale (quantità, colore, forza/costituzione e sinonimi).
4. Implementare un bridge Android per stampanti Bluetooth compatibili ESC/POS, dopo aver scelto il modello.
5. Aggiungere il modulo privacy/feedback “Magic Evolution” con consenso esplicito.
