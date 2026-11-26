# H&O: posti al tavolo e direzione dei colpi

Analisi del 26 novembre 2026, chiesta da Federico. Schema con tutti i casi: https://claude.ai/artifact/2xxaKP7F3ADJMk86i9AZ1m (pagina privata di Federico).
**Niente di questo è ancora nel codice**: si decide prima, poi si fa.

## Il problema
- Ogni telefono mette i quadratini degli altri sempre in **ordine di numero** (1, 2, 3, 4…), qualunque sia il suo posto (`renderNetBar`).
- Il colpo **esce sempre dal bordo in alto** del telefono di chi attacca, sopra il quadratino di chi è colpito, ed **entra sempre dall'alto** sul telefono colpito, sopra il quadratino di chi attacca (`fgStrike`, `fgIncoming`, `svIncoming`, `COLPI.screenOf` e `incoming`).
- Così le direzioni sono sbagliate per molte coppie. Nello schema, con la regola di oggi:
  - 4 giocatori due per lato: 4 coppie su 12 con il colpo dal lato sbagliato;
  - 5 giocatori, tavolo tondo: 8 su 20;
  - 6 giocatori tre per lato: 12 su 30.
- Fuori da H&O (un telefono solo) il problema non c'è.

## Cosa si è capito
1. **In Magic si attacca chiunque**: il giro del turno non decide chi si colpisce, ma dice **dove è seduto** ognuno, perché ci si siede in ordine di turno.
2. **L'ordine di giro da solo non basta.** Con il tavolo due per lato, chi siede in fondo a un lato ha tutti gli altri davanti o di lato, mai dall'altra parte. Serve sapere anche **la forma del tavolo**.
3. **Telefoni al centro o accanto ai giocatori**: non cambia niente. Ogni telefono è girato verso il suo giocatore, quindi le direzioni tra i telefoni sono quelle tra i giocatori, solo più vicine.
4. **La forma sbagliata nel menu**:
   - con 4 giocatori fa poco danno: il colpo arriva dal lato giusto, con un angolo un po' diverso;
   - con 6 giocatori tre per lato, scegliere «tondo» sbaglia 8 coppie su 30. Con tanti giocatori la scelta della forma conta.

## Proposta
**Nel menu di collegamento** (solo il principale, come oggi i posti):
1. **Forma del tavolo**: due per lato, uno per lato, tondo. Con 2 e 3 giocatori la forma non conta: si mostra solo con 4 o più.
2. **Ordine in cui si è seduti**: i posti disegnati attorno al tavolo scelto, si trascina ogni telefono al posto di chi lo usa (oggi si fa già su una lista). In pratica è l'ordine di turno.

**Ogni telefono** calcola, dal tavolo scelto e dal proprio posto, la direzione di ogni altro giocatore (sinistra, davanti, destra e l'angolo). Da lì:
- **quadratini in alto**: da sinistra a destra secondo dove sono seduti davvero (con 4 due per lato: per 2 diventa 3, 4, 1; per 3 diventa 4, 1, 2);
- **colpo in uscita**: esce dal punto del bordo nella direzione di chi è colpito: di lato per chi siede accanto, in alto per chi sta di fronte, dall'angolo per chi è in diagonale;
- **colpo in entrata**: entra dal punto del bordo nella direzione di chi attacca.

Il messaggio del colpo tra i telefoni non cambia: ognuno sa già chi attacca chi, e la direzione la calcola da sé.

## Casi
| Caso | Come si gestisce |
|---|---|
| 2 giocatori | uno di fronte all'altro: esce e entra dall'alto (come oggi) |
| 3 giocatori | vicini in diagonale; la forma del tavolo non serve |
| 4 giocatori, due per lato / uno per lato / tondo | forma scelta nel menu |
| 5 giocatori | tondo o due per lato (tre da una parte, due dall'altra) |
| 6 giocatori, tre per lato | il caso dove la forma conta di più; i quadratini in alto sono 5, già oggi ci stanno |
| Telefoni al centro del tavolo | nessuna differenza |
| Giocatore **senza app** | ha già il «posto libero» (pallino vuoto). Il suo quadratino resta al suo posto nel giro; un colpo verso di lui esce dal telefono di chi attacca e finisce sul suo quadratino; un suo colpo lo segna un altro e arriva sul telefono colpito dal lato dove lui siede |
| Qualcuno cambia posto o si collega dopo | il principale lo sposta nel disegno del tavolo; i telefoni ricalcolano |
| Seduti non in ordine di turno | si mettono i posti come sono davvero: la direzione segue i posti, non il turno |

## Restano scoperti
- Tavoli di forma strana o giocatori sparsi: si sceglie la forma più vicina. Con 4 giocatori l'errore è piccolo, con 6 si può notare.
- Telefono girato in orizzontale o lontano dal giocatore: la direzione la dà il posto, non il telefono.

## Da decidere con Federico
1. Le tre forme bastano (due per lato, uno per lato, tondo)?
2. Il disegno del tavolo nel menu di collegamento al posto della lista dei posti, o accanto?
3. I colpi dei vicini entrano dal lato anche nei temi dove oggi il colpo nasce dall'alto (per esempio il drago della Forgia)?
