/* Uses the environment's public identity only. No privileged key is shipped. */
const CLOUD_ENV='electrical-tapir-d5eu9pu0ee1abe0';
const cloudState={client:null,auth:null,user:null,base:[],busy:false,ready:false,blocked:false,message:'本机模式 · 尚未登录'};
const accountKey=id=>'miyou-cloud-v1:'+id;
let cloudTimer;
let sdkLoading=null;
function getCloudSDK(){const sdk=window.cloudbase;return sdk&&typeof sdk.init==='function'?sdk:null;}
function loadCloudSDK(){
  if(getCloudSDK())return Promise.resolve(getCloudSDK());
  if(sdkLoading)return sdkLoading;
  sdkLoading=(async()=>{
    const urls=['https://static.cloudbase.net/cloudbase-js-sdk/latest/cloudbase.full.js?v=1','https://static.cloudbase.net/cloudbase-js-sdk/3.0.1/cloudbase.full.js'];
    const failures=[];
    for(const url of urls){
      cloudStatus('正在加载登录组件，请稍候…');
      try{await new Promise((resolve,reject)=>{
        const script=document.createElement('script');script.src=url;script.async=true;script.referrerPolicy='no-referrer';
        let settled=false;const finish=(error)=>{if(settled)return;settled=true;clearTimeout(timer);script.onload=null;script.onerror=null;if(error){script.remove();reject(error);}else resolve();};
        const timer=setTimeout(()=>finish(Error('加载超时')),12000);
        script.onload=()=>finish(getCloudSDK()?null:Error('脚本已下载，但未提供预期登录组件'));
        script.onerror=()=>finish(Error('脚本下载失败'));
        document.head.appendChild(script);
      });return getCloudSDK();}catch(e){failures.push(e.message);}
    }
    throw Error('腾讯云登录组件加载失败（'+failures.join(' / ')+'）。可点“重试连接”；本机记录未改变');
  })().finally(()=>{sdkLoading=null;});
  return sdkLoading;
}
async function ensureCloudAuth(){
  if(cloudState.auth)return cloudState.auth;
  const sdk=await loadCloudSDK();const client=sdk.init({env:CLOUD_ENV,region:'ap-shanghai'});
  const auth=typeof client.auth==='function'?client.auth():client.auth;
  if(!auth||typeof auth.getSession!=='function'||typeof auth.signInWithPassword!=='function')throw Error('已加载的登录组件版本不兼容，尚未提交账号信息');
  cloudState.client=client;cloudState.auth=auth;return auth;
}

function cloudStatus(message){cloudState.message=message;const el=document.getElementById('cloud-state');if(el)el.textContent=message;}
function cloudBar(){let bar=document.getElementById('cloud-bar');if(!bar){bar=document.createElement('section');bar.id='cloud-bar';bar.className='cloud-bar';document.querySelector('header').after(bar);}bar.innerHTML='<span id="cloud-state"></span><div><button id="cloud-account">'+(cloudState.user?'账号 / 同步':cloudState.auth?'登录云端':'重试连接')+'</button></div>';document.getElementById('cloud-state').textContent=cloudState.message;document.getElementById('cloud-account').onclick=async()=>{if(!cloudState.auth){await cloudInit();if(!cloudState.auth)return;}cloudAccount();};}
function cloudPersist(value,base=cloudState.base){localStorage.setItem(accountKey(cloudState.user.id),JSON.stringify({data:value,base}));}
function hasPending(){return cloudState.user&&SyncCore.pending(db,cloudState.base,fresh).length>0;}
function cloudSave(next){if(cloudState.busy||cloudState.blocked||!cloudState.ready){toast('请先完成同步或处理同步提示，再修改记录');return false;}try{cloudPersist(next);db=next;render();cloudStatus('已存本机，等待同步');clearTimeout(cloudTimer);cloudTimer=setTimeout(()=>cloudSync(),350);return true;}catch{toast('本机空间不足，修改未保存，请导出备份');return false;}}
async function cloudRPC(changes){const {data,error}=await cloudState.auth.getSession();if(error||!data?.session?.access_token)throw Error('登录已失效，请重新登录');if(String((data.user||data.session.user)?.id)!==String(cloudState.user.id))throw Error('账号已在其他页面切换，请刷新后重新登录');const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);try{const r=await fetch('https://'+CLOUD_ENV+'.api.tcloudbasegateway.com/v1/rdb/rest/rpc/baby_sync',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+data.session.access_token},body:JSON.stringify({changes}),signal:controller.signal});const body=await r.json();if(!r.ok)throw Error(body.message||'云端请求失败（'+r.status+'）');if(!Array.isArray(body))throw Error('云端返回格式不正确');return body;}finally{clearTimeout(timer);}}
async function cloudSync(force=false){if(!cloudState.user||cloudState.busy||cloudState.blocked||(!force&&document.getElementById('modal').open))return;cloudState.busy=true;cloudStatus('正在同步…');try{const changes=SyncCore.pending(db,cloudState.base,fresh);const rows=await cloudRPC(changes);const next=SyncCore.inflate(rows,fresh);if(!validBackup(next))throw Error('云端数据校验失败，已保留本机记录');cloudPersist(next,rows);cloudState.base=rows;db=next;cloudState.ready=true;render();cloudStatus('已同步 · '+new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}));}catch(e){const msg=String(e.message||e);if(msg.includes('SYNC_CONFLICT')){cloudState.blocked=true;cloudStatus('修改冲突 · 本机修改已保留，请点“账号 / 同步”处理');}else cloudStatus('未同步 · '+(e.name==='AbortError'?'连接超时，请稍后重试':msg).slice(0,180));}finally{cloudState.busy=false;}}
async function enterAccount(user){if(!user?.id)throw Error('无法识别账号');const raw=localStorage.getItem(accountKey(user.id));let cache=raw?JSON.parse(raw):null;if(cache&&(!validBackup(cache.data)||!Array.isArray(cache.base)))throw Error('该账号的本机缓存异常，请先保留备份');cloudState.user=user;window.cloudSaveHook=cloudSave;cloudState.ready=false;cloudState.blocked=false;cloudState.base=cache?.base||[];db=cache?.data||fresh();render();cloudBar();await cloudSync(true);}
async function cloudInit(){cloudBar();try{await ensureCloudAuth();const {data,error}=await cloudState.auth.getSession();if(error)throw error;const user=data?.user||data?.session?.user;if(user)await enterAccount(user);else cloudStatus('本机模式 · 登录后可同步手机和电脑');}catch(e){cloudStatus('云端暂不可用 · '+String(e.message||e).slice(0,140));}cloudBar();}
function cloudAccount(){if(!cloudState.user){dialog('登录你的小日子',field('用户名','username','text','','required autocomplete="username" minlength="5" maxlength="24"')+field('密码','password','password','','required autocomplete="current-password"')+'<p class="sub">请使用在云开发“用户管理”中创建的普通账号。此版本先支持登录，自助注册和找回密码尚未接入。不要使用云平台管理员账号作为家庭共用账号。</p><p class="sub">旧本机记录不会自动上传，登录后可选择迁移。</p>',async f=>{try{await ensureCloudAuth();const {data,error}=await cloudState.auth.signInWithPassword({username:String(f.get('username')).trim(),password:f.get('password')});if(error)throw error;await enterAccount(data?.user||data?.session?.user);return true;}catch(e){toast('登录未完成：'+String(e.message||e).slice(0,120));return false;}});return;}
  dialog('我的云端账号','<p>当前账号：'+esc(cloudState.user.username||cloudState.user.id)+'</p><p class="sub">'+esc(cloudState.message)+'</p><div class="cloud-actions"><button type="button" id="cloud-retry">立即同步</button><button type="button" id="cloud-migrate">迁移原本机记录</button><button type="button" id="cloud-refresh">保留备份并采用云端版本</button><button type="button" id="cloud-logout">退出账号</button></div><p class="sub">照片随餐食记录加密传输到此账号的数据表，第一版暂未使用独立照片存储。网页关闭时不会同步或推送提醒。</p>',()=>true);
  document.getElementById('cloud-retry').onclick=()=>{document.getElementById('modal').close();cloudSync();};
  document.getElementById('cloud-migrate').onclick=async()=>{if(cloudState.busy||hasPending()||cloudState.blocked){toast('请先处理未同步的修改');return;}try{const rows=await cloudRPC([]);if(rows.some(r=>!r.deleted)){toast('云端已有记录，不能覆盖迁移；请先导出两边备份');return;}const raw=localStorage.getItem(KEY);if(!raw){toast('当前浏览器没有旧版记录，可在家庭设置导入备份');return;}const old=JSON.parse(raw);if(!validBackup(old))throw Error('旧记录格式不正确');if(!confirm('将原单机记录上传到当前账号？其他设备登录同一账号后可查看这些记录。'))return;cloudState.base=rows;document.getElementById('modal').close();cloudSave(old);}catch(e){toast(String(e.message||e));}};
  document.getElementById('cloud-refresh').onclick=async()=>{if(cloudState.busy)return;if(!confirm('先下载当前记录备份，然后采用云端版本。本机未同步修改仅保留在备份中，是否继续？'))return;exportData();try{const rows=await cloudRPC([]),next=SyncCore.inflate(rows,fresh);if(!validBackup(next))throw Error('云端数据格式异常');cloudPersist(next,rows);db=next;cloudState.base=rows;cloudState.blocked=false;cloudState.ready=true;document.getElementById('modal').close();render();cloudStatus('已采用云端版本');}catch(e){toast(String(e.message||e));}};
  document.getElementById('cloud-logout').onclick=async()=>{if(hasPending()||cloudState.busy){toast('仍有未同步修改，请先同步或导出并处理冲突');return;}try{const {error}=await cloudState.auth.signOut({options:{clearStorage:false}});if(error)throw error;cloudState.user=null;window.cloudSaveHook=null;cloudState.base=[];cloudState.ready=false;cloudState.blocked=false;const old=localStorage.getItem(KEY);db=old?JSON.parse(old):fresh();document.getElementById('modal').close();render();cloudStatus('已退出 · 当前显示原本机记录');cloudBar();}catch(e){toast(String(e.message||e));}};
}
window.addEventListener('online',()=>cloudSync());
window.addEventListener('storage',e=>{if(cloudState.user&&e.key===accountKey(cloudState.user.id)){cloudState.blocked=true;cloudStatus('其他窗口修改了数据，请先导出并采用云端版本');}});
window.addEventListener('beforeunload',e=>{if(hasPending()){e.preventDefault();e.returnValue='';}});
setInterval(()=>{if(!document.hidden)cloudSync();},20000);
cloudInit();
