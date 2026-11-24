# Selva, 25 novembre: le due cornici di bosco (il bosco che invade).
# Si lancia dalla cartella del repository con le immagini originali di v2-prerelease presenti in grafica/selva/.
exec(open('grafica/prove/strumenti/prepara-immagini.py').read().split('M={}')[0])
import json
M=json.load(open(OUT+'/manifest.json'))
def T(t,k,v): M.setdefault(t,{})[k]=v
T('selva','wood1', one('selva/Cornice botanica verde trasparente.png','v_w1',1000,docrop=False))
T('selva','wood2', one('selva/Cornice forestale trasparente con felci verdissime.png','v_w2',1000,docrop=False))
json.dump(M,open(OUT+'/manifest.json','w'),indent=0)
