"use client";
import { useState } from "react";

export default function LiveMap({stops,route}:{stops:string[];route:string}){
  const [pos,setPos]=useState({lat:-44.2,lon:169.8,label:"新西兰南岛 South Island"});
  const [query,setQuery]=useState("");
  const [status,setStatus]=useState("");
  const search=async(term=query)=>{if(!term)return;setStatus("正在搜索…");try{const r=await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=nz&q=${encodeURIComponent(term)}`,{headers:{"Accept-Language":"zh-CN,en"}}),j=await r.json();if(j[0]){setPos({lat:+j[0].lat,lon:+j[0].lon,label:j[0].display_name});setStatus("已定位目的地")}else setStatus("未找到地点，请换一个关键词")}catch{setStatus("地图搜索暂时不可用")}};
  const locate=()=>{setStatus("正在获取当前位置…");navigator.geolocation.getCurrentPosition(p=>{setPos({lat:p.coords.latitude,lon:p.coords.longitude,label:"我的当前位置 My location"});setStatus("位置已更新")},()=>setStatus("请允许浏览器访问位置"),{enableHighAccuracy:true,timeout:12000})};
  const z=.12,src=`https://www.openstreetmap.org/export/embed.html?bbox=${pos.lon-z}%2C${pos.lat-z}%2C${pos.lon+z}%2C${pos.lat+z}&layer=mapnik&marker=${pos.lat}%2C${pos.lon}`;
  return <div className="liveMapShell"><aside className="mapControls"><span className="label">当天路线</span><h3>{route}</h3><div className="mapSearch"><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()} placeholder="搜索地点 / Search place"/><button onClick={()=>search()}>搜索</button></div><button className="locateMe" onClick={locate}>◎ 定位我的位置</button><p className="mapStatus">{status||"地图可拖动、缩放，点击节点快速定位"}</p><div className="stopChips">{stops.map(x=><button key={x} onClick={()=>{setQuery(x);search(x)}}>{x}</button>)}</div><div className="mapResult"><b>{pos.label}</b><a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${pos.lat},${pos.lon}`}>开始导航 →</a></div></aside><div className="mapFrame"><iframe title="实时交互地图" src={src} loading="lazy"/><span>© OpenStreetMap contributors</span></div></div>;
}
