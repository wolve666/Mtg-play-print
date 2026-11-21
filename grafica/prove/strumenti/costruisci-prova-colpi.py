import json,base64,os,re
from PIL import Image
S='/tmp/prova-colpi'; AS=S+'/as'
M=json.load(open(AS+'/manifest.json')); H=json.load(open(AS+'/hubs.json'))
src=open('grafica/prove/prova-colpi.src.html').read()
used={}
for t,keys in M.items():
    for k,l in keys.items():
        if k.startswith(('gob',)) or re.search(r"I\('%s', '%s'"%(t,k),src) or (t=='forgia' and k in('burn','burn2','burn3')) or (t=='cripta' and k in ('dart','dart2','vein','vein2')) or (t=='mox' and k in('crack','crack2')):
            used.setdefault(t,{})[k]=l
A={}
for t in used.values():
    for l in t.values():
        for x in l:
            p=f"{AS}/{x['k']}.webp"
            if os.path.getsize(p)>90000:
                q=f"{S}/{x['k']}_s.webp"
                if not os.path.exists(q): Image.open(p).save(q,'WEBP',quality=68,method=6)
                p=q
            A[x['k']]=base64.b64encode(open(p,'rb').read()).decode()
for k,v in list(H.items()):
    l=v if isinstance(v,list) else [v]
    for x in l: A[x['k']]=base64.b64encode(open(f"{AS}/{x['k']}.webp",'rb').read()).decode()
H={k:(v if isinstance(v,list) else v) for k,v in H.items()}
out=src.replace('__ASSETS__',json.dumps(A)).replace('__MAN__',json.dumps(used)).replace('__HUBS__',json.dumps(H))
open('grafica/prove/prova-colpi.html','w').write(out)
print({t:list(v) for t,v in used.items()}); print('MB',round(len(out)/1e6,2))
