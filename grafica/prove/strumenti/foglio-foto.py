import sys
from PIL import Image
tag,n,half=sys.argv[1],int(sys.argv[2]),sys.argv[3]; D=sys.argv[4] if len(sys.argv)>4 else 'prove/out/colpi'
ims=[Image.open(f'{D}/{tag}-{i}.png') for i in range(n)]
w,h=ims[0].size
if half=='R': ims=[i.crop((w//2,0,w,h)) for i in ims]
w,h=ims[0].size; s=.62 if half=='R' else .5
cols=4; rows=(n+3)//4
S=Image.new('RGB',(int(w*s)*cols,int(h*s)*rows))
for i,im in enumerate(ims): S.paste(im.resize((int(w*s),int(h*s))),((i%cols)*int(w*s),(i//cols)*int(h*s)))
S.save(f'{D}/{tag}.jpg',quality=85)
