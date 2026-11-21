exec(open('grafica/prove/strumenti/prepara-immagini.py').read().split('M={}')[0].replace('OUT="/tmp/prova-colpi/as"','OUT="/tmp/prova-colpi/as"'))
import json
M=json.load(open(OUT+'/manifest.json'))
def T(t,k,v): M.setdefault(t,{})[k]=v
T('selva','liana', one('selva/Liane intrecciate con spine e foglie verdi.png','v_lia',900))
T('selva','vine',  one('selva/Ghirlanda di Vite Fantastica con Foglie Lucenti.png','v_vine',900))
T('selva','root',  one('selva/Radice Spinosa Curva con Muschio.png','v_r0',520))
T('selva','hole',  one('selva/Voragine di Terra con Radici e Muschio.png','v_hole',560))
T('selva','clod',  sheet('selva/Zolle di Terra con Muschio e Germogli.png','v_z',150))
T('selva','leaf',  sheet('selva/Sei foglie botaniche dettagliate con rugiada.png','v_f',110))
T('selva','claw',  one('selva/Quattro Graffi di Artiglio su Legno Lacerato.png','v_claw',600))
json.dump(M,open(OUT+'/manifest.json','w'),indent=0)
H=json.load(open(OUT+'/hubs.json')); H['selva']=one('selva/Targa di pietra con radici intrecciate.png','h_v',420); json.dump(H,open(OUT+'/hubs.json','w'))
print({k:len(v) for k,v in M['selva'].items()})
