import json,time,urllib.request,io,pathlib
from PIL import Image,ImageOps
root=pathlib.Path('new-zealand-source')
photos=json.loads((root/'photos.json').read_text())
out=root/'public/photos'
out.mkdir(parents=True,exist_ok=True)
for key,p in photos.items():
 target=out/(key+'.webp')
 if target.exists(): continue
 url='https://upload.wikimedia.org/wikipedia/commons/'+p['hash']+'/'+urllib.parse.quote(p['file'])
 for attempt in range(4):
  try:
   req=urllib.request.Request(url,headers={'User-Agent':'NZFamilyTravelPhotoArchive/1.0 (github.com/baobao71209-jpg/vanessa712)'})
   with urllib.request.urlopen(req,timeout=60) as r: data=r.read()
   im=ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert('RGB')
   im.thumbnail((1400,1400))
   im.save(target,'WEBP',quality=82)
   print(key,target.stat().st_size,flush=True)
   break
  except Exception:
   if attempt==3: raise
   time.sleep(10*(attempt+1))
 time.sleep(2)
assert len(list(out.glob('*.webp')))==len(photos)
p=root/'app/Photo.tsx'
s=p.read_text()
s=s.replace('https://upload.wikimedia.org/wikipedia/commons/${p.hash}/${encodeURIComponent(p.file)}','./photos/${id}.webp')
p.write_text(s)
