exec(open('grafica/prove/strumenti/prepara-immagini.py').read().split('M={}')[0])
import json
M=json.load(open(OUT+'/manifest.json'))
M['forgia']['crater']=one('forgia/Cratere vulcanico con lava incandescente.png','f_crater',700)
json.dump(M,open(OUT+'/manifest.json','w'))
print(M['forgia']['crater'], M['forgia']['fire'], M['forgia']['dragon'], M['forgia']['lava'])
