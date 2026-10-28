import {BigPhrase} from './TravelExtras';
export const dailyCare=[
 ['证件随身，检查行李里的食物与药品；按实际起飞时间填写 NZTD。','舒适长裤、易脱外套，机舱里备一件保暖层。'],
 ['所有食品如实申报；取车检查车况，长途飞行后不要勉强疲劳驾驶。','长袖与长裤，随身带抓绒或轻羽绒，抵达后按气温增减。'],
 ['长途转场安排休息；海边看动物保持距离，不追赶、不投喂。','防风外套、好走的鞋；海边加一层，备防雨层。'],
 ['坡道量力而行；参观历史建筑先看摄影规定。','舒适步行鞋与分层穿搭，背包里放轻便防雨外套。'],
 ['抵达后采购次日路餐、饮用水并安排加油；洞穴活动以预订确认单为准。','长裤、抓绒和防风外层；洞穴或湖边活动注意保暖。'],
 ['出发前查 SH94 路况、游船时间；带足路餐，山区预留停车和天气延误时间。','防水防风外套、保暖中层、防滑鞋；船上风大，雨披比撑伞更方便。'],
 ['到店前确认入住安排；湖滨散步留意天气与日落后的降温。','长袖叠穿轻外套；傍晚湖边加防风层。'],
 ['观景只在合法停车点停靠；参观历史遗址不攀爬、不带走物件。','步行鞋、防风外套；带太阳镜与防晒用品。'],
 ['转场较长，预留休息；观星以天气及预约为准，不为拍照进入危险水域。','白天分层穿搭；夜间观星额外带羽绒、帽子及手套。'],
 ['伴手礼先核对中国入境规定；保留购物凭证和商品包装。','城市步行鞋、长袖与可随时增减的外套。'],
 ['核对还车和国际值机时间；回国行李中的食品、药品及动植物制品再次检查。','舒适长裤、便于安检的鞋，机舱保暖外套随身带。'],
 ['入境中国按实际物品申报；取齐行李后再离开机场。','机舱与广州温差可能较大，选择方便脱穿的衣物。']
];
export function DailyDesk({day,food,onGo,onToday}:{day:any;food:any[];onGo:(tab:string)=>void;onToday:()=>void}){const care=dailyCare[day.d-1];return <section className="dailyDesk" aria-label="当天吃住行与穿衣指南"><div className="deskHeading"><div><small>每日生活安排 · 第 {day.d} 天 · {day.date}</small><h2>{day.route}</h2><p>{day.summary}</p></div><button onClick={onToday}>回到当前行程日</button></div><p className="deskSource">航班、酒店沿用旧行程，尚未核对本次订单；餐饮为建议，并非已预订。</p><div className="deskGrid"><article><span className="deskLabel">吃 / 当天餐饮</span>{food.slice(0,2).map(f=><div key={f.name}><h3>{f.name}</h3><p>{f.pick}</p></div>)}<button onClick={()=>onGo('吃什么')}>看全部餐饮与地址 →</button></article><article><span className="deskLabel">住 / 今晚落脚</span><h3>{day.hotel}</h3><p>{day.address}</p>{day.phone!=='—'&&<a href={'tel:'+day.phone}>联系酒店 {day.phone}</a>}<p><a href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(day.address)} target="_blank" rel="noreferrer">打开地址导航 ↗</a></p></article><article><span className="deskLabel">行 / 今天怎么走</span><h3>{day.drive==='—'?'21:00 机场集合':day.drive}</h3><p>{day.km} · 旧行程估算，另留休息与游览时间</p><ol>{day.stops.map((s:string)=><li key={s}>{s}</li>)}</ol><button onClick={()=>onGo('地图')}>查看路线地图 →</button></article></div><div className="careGrid"><article><span className="deskLabel">注意 / 今天记住这件事</span><h3>{care[0]}</h3><button onClick={()=>onGo('须知')}>入境、礼仪与回国清单 →</button></article><article><span className="deskLabel">穿 / 今天怎么穿</span><h3>{care[1]}</h3><p>按活动准备的装备建议，不是当天预报。出门前结合目的地天气增减衣物。</p><a href="https://www.metservice.com/" target="_blank" rel="noreferrer">查目的地官方天气 ↗</a></article></div></section>}
const guides=[
 {title:'出发前 · 证件与申报',body:'NZTD 免费，每位旅客都要填，不能替代签证。乘机通常可在赴新旅程开始前 24 小时内提交；按实际航班时间计算。准备护照、有效签证、返程机票和首晚住宿地址。无法在线填写时可使用纸质表。',url:'https://www.travellerdeclaration.govt.nz/about/',source:'NZTD 官方说明'},
 {title:'入境新西兰 · 食物与户外用品',body:'所有食品都要申报，包括糖果、饼干、茶叶、坚果和调料，密封也不例外。检查飞机上剩下的餐食与水果。用过的登山鞋和户外装备清除泥土、种子，并按要求申报。不确定就主动询问；申报不代表一定允许带入。',url:'https://www.mpi.govt.nz/bring-send-to-nz/bringing-and-posting-items-to-nz/how-to-declare-items-when-arriving-in-nz',source:'MPI 生物安全说明'},
 {title:'药品 · 原包装与处方',body:'本人使用的处方药保留原包装，准备处方或医生证明。普通处方药通常不超过三个月用量；受管制药品另有严格限制，不能套用普通药品规则。中药和草药可能还涉及生物安全申报，按药名与成分逐项核查。',url:'https://www.customs.govt.nz/travel-to-and-from-new-zealand/prohibited-and-restricted-items',source:'新西兰海关药品规定'},
 {title:'现金与其他物品 · 按表如实填写',body:'携带合计达到或超过 10,000 新西兰元或等值外币的现金等货币工具，需要按规定申报。酒、烟和其他物品也有各自规则；不要只检查食品。',url:'https://www.travellerdeclaration.govt.nz/about/',source:'NZTD 携带物品说明'},
 {title:'当地礼仪 · 小费与参观',body:'小费自愿。排队、轻声交流，拍摄别人前先询问。毛利会堂参观跟随主人指引，进入会堂通常脱鞋，各地规矩不同；不要把所有毛利场所当成可自由进入的景点。',url:'https://www.otago.ac.nz/maori/world/tikanga/marae-visits',source:'奥塔哥大学会堂礼仪'},
 {title:'野生动物 · 远远欣赏',body:'不追赶、不喂食、不触摸。与海豹、海狮保持至少约 20 米距离；企鹅观赏遵守现场围栏、拍照和灯光要求。保护步道与植被，不为拍照越过围栏。',url:'https://www.doc.govt.nz/nature/native-animals/how-to-behave-around-wildlife/',source:'新西兰保护部指引'},
 {title:'回国购物 · 中国规则另查',body:'当地可以买，不等于可以带回中国。肉制品、鲜果、种子和动植物纪念品等先核查中国入境规定；蜂蜜、保健品也按具体成分、品类和数量查询，不作一概允许的保证。保留包装、凭证，必要时向海关咨询。',url:'https://online.customs.gov.cn/ociswebserver/pages/jcjybcx/question.html',source:'中国海关查询'}
];
export function TravelGuide(){return <section className="travelGuide"><small>出入境与当地礼仪 · 资料核对于 2026 年 10 月 28 日</small><h2>安心出发，轻松相处。</h2><p>按实际携带物品和最新官方规定办理，下面的链接可直接查询。</p>{guides.map(g=><article key={g.title}><h3>{g.title}</h3><p>{g.body}</p><a href={g.url} target="_blank" rel="noreferrer">{g.source} ↗</a></article>)}<a href="https://www.comcom.govt.nz/consumers/dealing-with-typical-situations/leisure-and-travel/" target="_blank" rel="noreferrer">小费自愿：新西兰商业委员会说明 ↗</a><article><h3>过关时，把这句话给工作人员看</h3><p>我不确定这个是否需要申报，可以帮我看一下吗？</p><BigPhrase text="I’m not sure whether I need to declare this. Could you please help me?" lang="en-NZ"/></article></section>}
