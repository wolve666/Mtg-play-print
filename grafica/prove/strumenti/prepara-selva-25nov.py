# Selva, 25 novembre: zampa col muschio e graffi (la zampata), le due cornici di bosco (il bosco che invade).
# Si lancia dalla cartella del repository con le immagini originali di v2-prerelease presenti in grafica/selva/.
exec(open('grafica/prove/strumenti/prepara-immagini.py').read().split('M={}')[0])
import json
M=json.load(open(OUT+'/manifest.json'))
def T(t,k,v): M.setdefault(t,{})[k]=v
T('selva','paw',   one('selva/Zampa Artigliata Ricoperta di Muschio.png','v_paw',720))
T('selva','slash', one('selva/Quattro Graffi di Artiglio su Legno Lacerato.png','v_sl',720))
T('selva','wood1', one('selva/Cornice botanica verde trasparente.png','v_w1',1000,docrop=False))
T('selva','wood2', one('selva/Cornice forestale trasparente con felci verdissime.png','v_w2',1000,docrop=False))
json.dump(M,open(OUT+'/manifest.json','w'),indent=0)
print({k:[(x['k'],x['w'],x['h'],x['b']) for x in v] for k,v in M['selva'].items() if k in ('paw','slash','wood1','wood2')})
