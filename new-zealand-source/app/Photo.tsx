import {useEffect,useState} from 'react';
export const photos = {
oamaru:{"name":"奥玛鲁维多利亚历史区","file":"Historic_Precinct,_Harbour_Street,_Oamaru.jpg","hash":"8/8d","author":"AnnWoolliams","license":"CC BY-SA 4.0","date":"2022-10-04","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/"},
moeraki:{"name":"摩拉基圆石","file":"MoerakiBoulders.jpg","hash":"f/fb","author":"(WT-shared) ED01","license":"公共领域","date":"2007-02-26","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain"},
baldwin:{"name":"宝云街 · 沿街房屋与坡度","file":"Baldwinstreet.jpg","hash":"a/af","author":"BjarteSorensen","license":"公共领域","date":"2004 年上传，拍摄日期未注明","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain"},
olveston:{"name":"奥尔韦斯顿古宅 · 餐厅","file":"Olveston_Historic_Home,_Dunedin_-_Olveston8904.jpg","hash":"f/f1","author":"lumoplank","license":"CC0","date":"2026-07-08 之前","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/"},
otago:{"name":"奥塔戈博物馆 · 建筑外观","file":"Otago_Museum_building_MRD_02.jpg","hash":"4/48","author":"Mike Dickison","license":"CC BY 4.0","date":"2023-02-06","licenseUrl":"https://creativecommons.org/licenses/by/4.0/"},
teanau:{"name":"蒂阿瑙湖 · 湖面全景","file":"Lake_Te_Anau,_New_Zealand_(1).jpg","hash":"b/b3","author":"Michal Klajban","license":"CC BY-SA 4.0","date":"2014-12-25","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/"},
caves:{"name":"蒂阿瑙萤火虫洞所在湖岸（非洞内）","file":"Te_Anau_Caves_Region.jpg","hash":"4/4a","author":"MSeses","license":"CC BY-SA 3.0","date":"2007-12-22","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/"},
mirror:{"name":"镜湖 · 水面倒影","file":"Mirror_Lakes.jpg","hash":"5/55","author":"Adabow","license":"CC BY-SA 3.0","date":"2008 年 1 月","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/"},
homer:{"name":"荷马隧道","file":"Homer_Tunnel.jpg","hash":"4/48","author":"FearTec","license":"CC BY 3.0","date":"2007 年上传，拍摄日期未注明","licenseUrl":"https://creativecommons.org/licenses/by/3.0/"},
queenstown:{"name":"皇后镇 · 瓦卡蒂普湖滨","file":"Queenstown_Bay_in_morning_light.jpg","hash":"d/d2","author":"Pseudopanax","license":"公共领域","date":"2021-12-01","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain"},
bennetts:{"name":"Bennetts Bluff · 湖岸与远山","file":"Lake_Wakatipu_and_Pigeon_Island_towards_Mt_Earnslaw.jpg","hash":"b/b7","author":"Pseudopanax","license":"公共领域","date":"2021-11-29","licenseUrl":"https://commons.wikimedia.org/wiki/Commons:Public_domain"},
arrow:{"name":"箭镇华人矿工村 · 遗址入口","file":"Arrowtown_Chinese_Settlement.jpg","hash":"6/6d","author":"Beast from the Bush","license":"CC BY-SA 3.0","date":"2005 年上传","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/"},
wanaka:{"name":"瓦纳卡湖 · 孤独的树","file":"Wanaka_tree.jpg","hash":"8/82","author":"Jordentan / @2cruisin","license":"CC BY-SA 4.0","date":"2019-05-13","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/"},
stars:{"name":"特卡波星空 · 历史拍摄效果","file":"Starry_sky_from_Tekapo.jpg","hash":"9/9e","author":"Butterflyyyyyyyy y y y","license":"CC0","date":"2025-04-27","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/"},
arts:{"name":"基督城艺术中心 · 历史外观","file":"Arts_Center_Christchurch.JPG","hash":"9/9b","author":"Anke Lüdtke","license":"CC BY-SA 3.0","date":"2005-01-28（震前历史照片）","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/"},
square:{"name":"基督城大教堂广场","file":"Christchurch_Cathedral_Square.jpg","hash":"a/a4","author":"Yvanyblog","license":"CC BY-SA 4.0","date":"2023-10-27","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/"},
hagley:{"name":"海格利公园 · 历史秋景","file":"Hagley_Park,_Christchurch,_New_Zealand_005.jpg","hash":"4/41","author":"Michal Klajban","license":"CC BY-SA 4.0","date":"2020-04-19（秋季，非本次春季）","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/"},
antarctic:{"name":"国际南极中心 · 外观","file":"International_Antarctic_Centre.jpg","hash":"3/3c","author":"Tzuhsun Hsu","license":"CC BY-SA 2.0","date":"2007-03-05","licenseUrl":"https://creativecommons.org/licenses/by-sa/2.0/"},
 tekapo:{name:'特卡波湖 · 好牧羊人教堂',file:'Church_of_the_Good_Shepherd_Lake_Tekapo.jpg',hash:'0/05',author:'Vincent60030',license:'CC BY-SA 4.0',date:'2019 年 11 月',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
 milford:{name:'米尔福德峡湾 · 米特峰',file:'Milford_Sound_foreshore_with_snow-dusted_Mitre_Peak_in_the_background.jpg',hash:'3/3e',author:'Pseudopanax',license:'公共领域',date:'2018 年 7 月',licenseUrl:'https://commons.wikimedia.org/wiki/Commons:Public_domain'},
 glenorchy:{name:'格林诺奇 · 湖畔红船屋',file:'Glenorchy_wharf_and_red_shed_at_Lake_Wakatipu.jpg',hash:'8/81',author:'Pseudopanax',license:'公共领域',date:'2021 年 11 月',licenseUrl:'https://commons.wikimedia.org/wiki/Commons:Public_domain'},
 dunedin:{name:'达尼丁火车站',file:'Dunedin_Train_Station.jpg',hash:'a/a0',author:'Gah4',license:'CC0',date:'2016 年 12 月',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/'},
 food:{name:'新西兰炸鱼薯条（摄于惠灵顿）',file:'Fish_and_chips_-_Wellington,_New_Zealand.jpg',hash:'f/f6',author:'Daderot',license:'CC0',date:'2024 年 10 月',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/'}
};
export type PhotoKey=keyof typeof photos;
export default function Photo({id,credit=true}:{id:PhotoKey;credit?:boolean}){
 const p=photos[id], [failed,setFailed]=useState(false);
 useEffect(()=>setFailed(false),[id]);
 const src=`./photos/${id}.webp`;
 return <figure className="realPhoto">{failed?<div className="photoFallback"><strong>{p.name}</strong><span>实景照片暂未加载</span><a href={'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.file)} target="_blank" rel="noreferrer">打开照片来源 ↗</a></div>:<img src={src} alt={p.name} loading="lazy" decoding="async" onError={()=>setFailed(true)}/>}{credit&&<figcaption><span>{p.name} · {p.date}</span><a href={'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.file)} target="_blank" rel="noreferrer">{p.author}</a><a href={p.licenseUrl} target="_blank" rel="noreferrer">{p.license} · 版式裁切</a></figcaption>}</figure>
}
export function PhotoCredits(){return <details className="photoCredits"><summary>实景照片来源与拍摄日期</summary><p>照片用于了解景点，不代表出行当天的天气或花期。页面做了适应版式的裁切；各照片沿用所标注的原许可；历史照片不代表现状。</p>{Object.values(photos).map(p=><p key={p.file}><a href={'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.file)} target="_blank" rel="noreferrer">{p.name}</a> · {p.author} · {p.date} · <a href={p.licenseUrl} target="_blank" rel="noreferrer">{p.license}</a></p>)}</details>}
