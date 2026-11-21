exec(open('grafica/prove/strumenti/prepara-immagini.py').read().split('M={}')[0].replace('OUT="/tmp/prova-colpi/as"','OUT="/tmp/prova-colpi/as"'))
import json
M=json.load(open(OUT+'/manifest.json'))
M['santuario']['sword']=one('santuario/Spada Celestiale Alata di Luce.png','s_sword',900)
json.dump(M,open(OUT+'/manifest.json','w'))
print(M['santuario']['sword'])
