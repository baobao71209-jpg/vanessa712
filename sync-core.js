(function(root){
  const arrays={meal:'meals',shopping:'shopping',payment:'payments',journal:'journals'};
  const maps={plan:'plans',attendance:'attendance'};
  const key=r=>JSON.stringify([r.category,r.record_id]);
  function flatten(db){const out=[{category:'settings',record_id:'main',content:db.config}];for(const [category,name] of Object.entries(arrays))for(const x of db[name])out.push({category,record_id:x.id,content:x});for(const [category,name] of Object.entries(maps))for(const [id,x] of Object.entries(db[name]))out.push({category,record_id:id,content:x});return out;}
  function inflate(rows,fresh){const db=fresh();for(const r of rows){if(r.deleted)continue;const x=structuredClone(r.content);if(r.category==='settings'&&r.record_id==='main')db.config={...db.config,...x};else if(arrays[r.category])db[arrays[r.category]].push(x);else if(maps[r.category])db[maps[r.category]][r.record_id]=x;}db.payments.sort((a,b)=>a.date.localeCompare(b.date));return db;}
  function diff(before,after,base){const old=new Map(flatten(before).map(r=>[key(r),r])),next=new Map(flatten(after).map(r=>[key(r),r])),versions=new Map(base.map(r=>[key(r),r.version]));const out=[];for(const [k,r] of next){if(JSON.stringify(old.get(k)?.content)!==JSON.stringify(r.content))out.push({...r,expected_version:versions.get(k)||0,deleted:false});}for(const [k,r] of old)if(!next.has(k))out.push({...r,content:{},expected_version:versions.get(k)||0,deleted:true});return out;}
  function pending(db,base,fresh){return diff(inflate(base,fresh),db,base);}
  const api={flatten,inflate,diff,pending};if(typeof module!=='undefined')module.exports=api;else root.SyncCore=api;
})(typeof window!=='undefined'?window:this);
