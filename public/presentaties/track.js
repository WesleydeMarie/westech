/* Techwes tijdlijn-engine: horizontale verhaalpresentatie.
   Alles wat per onderwerp verschilt staat in <script type="application/json" id="track-config"> en in de markup van #world.
   Config: { ui:{map,all}, world:{w,h,axisY,camY,camH}, steps:[{ch,t,x,w,a,r,clock,tick,fr,d:{x,y,s,rot,cls,tag},dfr:{"n":{...}}}] }
   Markup-conventies: data-on="1,2" (uitgelicht in die stappen), data-show="3" (alleen zichtbaar in die stappen),
   data-frag="stap:n" (verschijnt bij klik n), .rv (bouwt op bij binnenkomst). #world krijgt data-s en data-f voor CSS-animaties. */
(function(){
const CFG=JSON.parse(document.getElementById('track-config').textContent);
const W=CFG.world,S=CFG.steps,UI=CFG.ui;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const world=document.getElementById('world'),stage=document.getElementById('stage'),cv=document.getElementById('bg'),cx=cv.getContext('2d');
const hud=document.querySelector('.hud'),doc=document.getElementById('doc'),dtag=document.getElementById('dtag'),clock=document.getElementById('clock');
world.style.width=W.w+'px';world.style.height=W.h+'px';

// as en markeringen
const axis=document.createElement('div');axis.className='axis';axis.style.top=W.axisY+'px';world.insertBefore(axis,world.children[1]||null);
const nowm=document.createElement('div');nowm.className='nowmark';nowm.style.top=(W.axisY-14)+'px';world.insertBefore(nowm,axis.nextSibling);
S.forEach((s,i)=>{if(!s.tick)return;const t=document.createElement('div');t.className='tick';t.dataset.i=i;t.style.left=s.x+'px';t.style.top=W.axisY+'px';
  t.innerHTML='<i></i><span>'+s.tick.replace(/</g,'&lt;')+'</span>';world.insertBefore(t,nowm)});
const ticks=[...document.querySelectorAll('.tick')];

const elOn=[...document.querySelectorAll('[data-on]')],elShow=[...document.querySelectorAll('[data-show]')],elFr=[...document.querySelectorAll('[data-frag]')];
elShow.forEach(e=>e.classList.add('only'));
let step=0,frag=0,mapMode=false;
let cam={x:S[0].x,y:W.camY,s:.1,r:0},fl=null;
let col=hex(S[0].a),colFrom=col,colTo=col;
function hex(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]}
function setCol(c){col=c;document.documentElement.style.setProperty('--accent-rgb',c.map(Math.round).join(','))}
function view(){return{w:innerWidth,h:Math.max(200,innerHeight-hud.offsetHeight)}}
function target(i){const v=view();
  if(i<0){const w=W.w,h=W.camH*1.2;return{x:W.w/2,y:W.camY,s:Math.min(v.w/(w*1.02),v.h/(h*1.1)),r:0}}
  const s=S[i],w=s.w||1760,h=W.camH;return{x:s.x,y:W.camY,s:Math.min(v.w/(w*1.03),v.h/(h*1.04)),r:s.r||0}}
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function fly(to,c){
  const from={...cam},v=view(),d=Math.hypot(to.x-from.x,to.y-from.y);
  const u=d*Math.min(from.s,to.s)/Math.hypot(v.w,v.h);
  const k=RM?0:Math.min(1.1,Math.log2(1+u)*.55);
  const dur=RM?350:Math.min(2600,1300+k*600+Math.abs(Math.log2(to.s/from.s))*200);
  colFrom=col.slice();colTo=hex(c);fl={from,to,k,t0:performance.now(),dur};world.style.willChange='transform';
}
// document
let dcur=null,dtw=null,dlastCls='';
function docState(){const s=S[step];let d={...s.d};if(s.dfr)for(let k=1;k<=frag;k++)if(s.dfr[k])d={...d,...s.dfr[k]};
  return{x:d.x!=null?d.x:s.x-75,y:d.y!=null?d.y:W.axisY-215,s:d.s||1,rot:d.rot||0,cls:d.cls||'',tag:d.tag||''}}
function docXf(p){doc.style.transform=`translate(${p.x}px,${p.y}px) rotate(${p.rot}deg) scale(${p.s})`}
function docCls(d){doc.className=d.cls;if(dtag)dtag.textContent=d.tag;
  if(/\bgone\b/.test(d.cls)&&!/\bgone\b/.test(dlastCls))burst();dlastCls=d.cls}
function setDoc(d){
  const to={x:d.x,y:d.y,s:d.s,rot:d.rot};
  if(!dcur){dcur=to;docXf(to);docCls(d);return}
  if(dcur.x===to.x&&dcur.y===to.y&&dcur.s===to.s&&dcur.rot===to.rot&&!dtw){docCls(d);return}
  const dx=to.x-dcur.x,dy=to.y-dcur.y,hop=Math.min(260,Math.abs(dx)*.12);
  dtw={from:{...dcur},to,c:{x:(dcur.x+to.x)/2,y:Math.min(dcur.y,to.y)-hop+dy*.1},d,t0:performance.now(),dur:RM?300:1500,applied:false,last:{...dcur}};
}
function stepDoc(now){
  if(!dtw)return;
  const t=Math.max(0,Math.min(1,(now-dtw.t0)/dtw.dur)),e=ease(t),u=1-e,a=dtw.from,b=dtw.to,c=dtw.c;
  const p={x:u*u*a.x+2*u*e*c.x+e*e*b.x,y:u*u*a.y+2*u*e*c.y+e*e*b.y,s:Math.exp(Math.log(a.s)+(Math.log(b.s)-Math.log(a.s))*e),rot:a.rot+(b.rot-a.rot)*e};
  const vx=(p.x-dtw.last.x)*cam.s,vy=(p.y-dtw.last.y)*cam.s,sp=Math.hypot(vx,vy);dtw.last={...p};
  if(!RM){p.rot+=Math.max(-10,Math.min(10,vx*.3));doc.style.filter=`blur(${(Math.min(6,sp*.09)/Math.max(.05,cam.s*p.s)).toFixed(2)}px)`}
  docXf(p);dcur=p;
  if(!dtw.applied&&t>.75){docCls(dtw.d);dtw.applied=true}
  if(t>=1){if(!dtw.applied)docCls(dtw.d);dcur=b;docXf(b);doc.style.filter='';dtw=null}
}
// partikels voor 'gone'
let parts=[];
function burst(){if(RM)return;const r=doc.getBoundingClientRect(),c=col.map(Math.round).join(',');
  for(let i=0;i<70;i++){const a=Math.random()*6.283,v=1+Math.random()*4;parts.push({x:r.left+Math.random()*r.width,y:r.top+Math.random()*r.height,vx:Math.cos(a)*v+1.5,vy:Math.sin(a)*v-1,l:1,c})}}

function apply(){
  const s=S[step];
  world.classList.toggle('ov',mapMode);
  world.dataset.s=mapMode?'':step;world.dataset.f=frag;
  elOn.forEach(e=>{const on=!mapMode&&e.dataset.on.split(',').map(Number).includes(step);e.classList.toggle('on',on);e.classList.toggle('off',!on)});
  elShow.forEach(e=>e.classList.toggle('on',!mapMode&&e.dataset.show.split(',').map(Number).includes(step)));
  elFr.forEach(e=>{const[a,b]=e.dataset.frag.split(':').map(Number);e.classList.toggle('fh',!mapMode&&step===a&&frag<b)});
  ticks.forEach(t=>{const i=+t.dataset.i;t.classList.toggle('past',i<step);t.classList.toggle('cur',i===step)});
  const d=docState();setDoc(d);
  if(clock){const txt=mapMode?UI.all:(s.clock||'');if(clock.textContent!==txt){clock.textContent=txt;clock.classList.remove('flash');void clock.offsetWidth;clock.classList.add('flash')}clock.hidden=!txt}
  document.getElementById('chn').textContent=mapMode?UI.map:s.ch;
  document.getElementById('cht').textContent=mapMode?UI.all:s.t;
  document.getElementById('cnt').textContent=step>0?String(step).padStart(2,'0')+' / '+String(S.length-1).padStart(2,'0'):'';
  document.getElementById('map').setAttribute('aria-pressed',mapMode);
  segs.forEach((b,i)=>{b.classList.toggle('cur',i===step);b.classList.toggle('done',i<step)});
  document.getElementById('sr').textContent=(mapMode?UI.map:s.ch)+': '+s.t;
}
function go(i,f){
  i=Math.max(0,Math.min(S.length-1,i));const moved=i!==step||mapMode;
  step=i;frag=f!=null?f:0;mapMode=false;apply();
  if(moved){fly(target(step),S[step].a);if(dtw){dtw.t0=fl.t0;dtw.dur=fl.dur*.9}}
}
function next(){if(mapMode){go(step,frag);return}const s=S[step];if(s.fr&&frag<s.fr){frag++;apply();return}if(step<S.length-1)go(step+1)}
function prev(){if(mapMode){go(step,frag);return}if(frag>0){frag--;apply();return}if(step>0){const p=step-1;go(p,S[p].fr||0)}}
function toggleMap(){if(mapMode){go(step,frag)}else{mapMode=true;apply();fly(target(-1),S[step].a)}}

const segWrap=document.getElementById('segs'),segs=S.map((s,i)=>{const b=document.createElement('button');b.className='seg';b.setAttribute('aria-label',s.ch+': '+s.t);b.onclick=()=>go(i);segWrap.appendChild(b);return b});
document.getElementById('next').onclick=next;document.getElementById('prev').onclick=prev;document.getElementById('map').onclick=toggleMap;
addEventListener('keydown',e=>{
  if(['ArrowRight','PageDown',' ','Enter'].includes(e.key)){if(e.key==='Enter'&&e.target.tagName==='BUTTON')return;e.preventDefault();next()}
  else if(['ArrowLeft','PageUp','Backspace'].includes(e.key)){e.preventDefault();prev()}
  else if(e.key==='Home')go(0);else if(e.key==='End')go(S.length-1);
  else if(e.key==='m'||e.key==='M')toggleMap();
  else if(e.key==='f'||e.key==='F'){try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}catch(_){}}
});
let px=null,py=null;
stage.addEventListener('pointerdown',e=>{px=e.clientX;py=e.clientY});
stage.addEventListener('pointerup',e=>{if(px==null)return;const dx=e.clientX-px,dy=e.clientY-py;px=null;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))dx<0?next():prev();else if(Math.abs(dx)<8&&Math.abs(dy)<8)next()});

// achtergrond: sterren en een tijdstroom langs de as
let stars=[],stream=[];
for(let i=0;i<200;i++)stars.push({x:Math.random()*5000,y:Math.random()*5000,d:.15+Math.random()*.55,r:Math.random()*1.4+.3,p:Math.random()*6.28});
for(let i=0;i<160;i++)stream.push({x:Math.random()*W.w,y:W.axisY+(Math.random()+Math.random()+Math.random()-1.5)*90,v:80+Math.random()*260,l:20+Math.random()*70});
function resize(){const dpr=Math.min(2,devicePixelRatio||1);cv.width=innerWidth*dpr;cv.height=innerHeight*dpr;cx.setTransform(dpr,0,0,dpr,0,0);if(!fl)cam=target(mapMode?-1:step)}
let last=performance.now();
function render(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;
  if(fl){
    const t=Math.max(0,Math.min(1,(now-fl.t0)/fl.dur)),e=ease(t),a=fl.from,b=fl.to;
    const ls=Math.log(a.s)+(Math.log(b.s)-Math.log(a.s))*e-fl.k*Math.sin(Math.PI*e)*.693;
    cam={x:a.x+(b.x-a.x)*e,y:a.y+(b.y-a.y)*e,s:Math.exp(ls),r:a.r+(b.r-a.r)*e};
    setCol(colFrom.map((c,i)=>c+(colTo[i]-c)*e));
    if(t>=1){fl=null;world.style.willChange='auto'}
  }
  stepDoc(now);
  nowm.style.transform=`translateX(${(dcur?dcur.x+75:cam.x)}px)`;
  const v=view(),Cx=v.w/2,Cy=v.h/2;
  world.style.transform=`translate(${Cx}px,${Cy}px) rotate(${cam.r}deg) scale(${cam.s}) translate(${-cam.x}px,${-cam.y}px)`;
  cx.clearRect(0,0,innerWidth,innerHeight);
  const c=col.map(Math.round).join(','),Wd=innerWidth+120,H=innerHeight+120,zs=Math.pow(cam.s,.5);
  for(const st of stars){
    const x=((st.x-cam.x*st.d*zs)%Wd+Wd)%Wd-60,y=((st.y-cam.y*st.d*zs)%H+H)%H-60,tw=RM?.7:.45+.35*Math.sin(now*.0012+st.p);
    cx.fillStyle=`rgba(${st.d>.5?c:'200,215,240'},${tw*st.d*1.3})`;cx.beginPath();cx.arc(x,y,st.r*(.6+st.d),0,6.283);cx.fill();
  }
  const cr=Math.cos(cam.r*Math.PI/180),sr=Math.sin(cam.r*Math.PI/180);
  cx.lineCap='round';
  for(const p of stream){
    if(!RM){p.x+=p.v*dt;if(p.x>W.w)p.x-=W.w}
    const lx=(p.x-cam.x)*cam.s,ly=(p.y-cam.y)*cam.s,sx=Cx+lx*cr-ly*sr,sy=Cy+lx*sr+ly*cr;
    if(sx<-100||sx>innerWidth+100||sy<-50||sy>innerHeight+50)continue;
    const L=p.l*cam.s;cx.strokeStyle=`rgba(${c},${.12+.25*(p.v/340)})`;cx.lineWidth=Math.max(1,2.2*cam.s);
    cx.beginPath();cx.moveTo(sx-L*cr,sy-L*sr);cx.lineTo(sx,sy);cx.stroke();
  }
  if(parts.length){for(const q of parts){q.x+=q.vx;q.y+=q.vy;q.vy+=.03;q.l-=.012;cx.fillStyle=`rgba(${q.c},${Math.max(0,q.l)})`;cx.fillRect(q.x,q.y,3,3)}parts=parts.filter(q=>q.l>0)}
  requestAnimationFrame(render);
}
addEventListener('resize',()=>{resize();if(!fl)cam=target(mapMode?-1:step)});
resize();
const end=target(0);cam=target(-1);
apply();fl={from:{...cam},to:end,k:0,t0:performance.now()+500,dur:RM?10:3200};colFrom=col;colTo=hex(S[0].a);
requestAnimationFrame(render);
})();
