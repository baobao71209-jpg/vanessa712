import {useState} from 'react';
export const photos = {
 tekapo:{name:'特卡波湖 · 好牧羊人教堂',file:'Church_of_the_Good_Shepherd_Lake_Tekapo.jpg',hash:'0/05',author:'Vincent60030',license:'CC BY-SA 4.0',date:'2019 年 11 月',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
 milford:{name:'米尔福德峡湾 · 米特峰',file:'Milford_Sound_foreshore_with_snow-dusted_Mitre_Peak_in_the_background.jpg',hash:'3/3e',author:'Pseudopanax',license:'公共领域',date:'2018 年 7 月',licenseUrl:'https://commons.wikimedia.org/wiki/Commons:Public_domain'},
 glenorchy:{name:'格林诺奇 · 湖畔红船屋',file:'Glenorchy_wharf_and_red_shed_at_Lake_Wakatipu.jpg',hash:'8/81',author:'Pseudopanax',license:'公共领域',date:'2021 年 11 月',licenseUrl:'https://commons.wikimedia.org/wiki/Commons:Public_domain'},
 dunedin:{name:'达尼丁火车站',file:'Dunedin_Train_Station.jpg',hash:'a/a0',author:'Gah4',license:'CC0',date:'2016 年 12 月',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/'},
 food:{name:'新西兰炸鱼薯条（摄于惠灵顿）',file:'Fish_and_chips_-_Wellington,_New_Zealand.jpg',hash:'f/f6',author:'Daderot',license:'CC0',date:'2024 年 10 月',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/'}
};
export type PhotoKey=keyof typeof photos;
export default function Photo({id,credit=true}:{id:PhotoKey;credit?:boolean}){
 const p=photos[id], [failed,setFailed]=useState(false);
 const src=`https://upload.wikimedia.org/wikipedia/commons/${p.hash}/${encodeURIComponent(p.file)}`;
 return <figure className="realPhoto">{failed?<div className="photoFallback"><strong>{p.name}</strong><span>实景照片暂未加载，请检查网络</span></div>:<img src={src} alt={p.name} loading="lazy" decoding="async" onError={()=>setFailed(true)}/>}{credit&&<figcaption><span>{p.name}</span><a href={'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.file)} target="_blank" rel="noreferrer">{p.author} · {p.license}</a></figcaption>}</figure>
}
export function PhotoCredits(){return <details className="photoCredits"><summary>实景照片来源与拍摄日期</summary><p>照片用于了解景点，不代表出行当天的天气或花期。页面做了适应版式的裁切；教堂照片按原 CC BY-SA 4.0 许可使用。</p>{Object.values(photos).map(p=><p key={p.file}><a href={'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.file)} target="_blank" rel="noreferrer">{p.name}</a> · {p.author} · {p.date} · <a href={p.licenseUrl} target="_blank" rel="noreferrer">{p.license}</a></p>)}</details>}
