(function(){
const TX=JSON.parse(document.getElementById('story-text').textContent);
const LC=['#6d7a8f','#8fa3b8','#6aa8ff','#ffb547','#ff5a5f'],LAB=TX.labels.map((n,i)=>[n,LC[i]]);
const S=[
 {f:[2100,1450,3600,2500],a:'#3fe0c5',r:0,ov:1,d:{x:1980,y:760,s:1,l:0}},
 {f:[1810,935,900,540],a:'#3fe0c5',r:-1.5,d:{x:1980,y:760,s:1,l:0}},
 {f:[2570,900,660,380],a:'#6aa8ff',r:1,d:{x:2300,y:790,s:.62,l:3},cycle:1},
 {f:[1780,1735,960,590],a:'#3fe0c5',r:-1,d:{x:1980,y:760,s:1,l:3}},
 {f:[2330,1250,2100,1700],a:'#ffb547',r:0,d:{x:2700,y:500,s:.85,l:3,rot:-8}},
 {f:[3560,440,1180,720],a:'#ff5a5f',r:1.5,fr:4,d:{x:3790,y:165,s:.5,l:3,leak:1}},
 {f:[3620,1300,1100,680],a:'#4fd8ff',r:-1,d:{x:3950,y:1035,s:.55,l:4,lock:1}},
 {f:[3560,2190,1180,740],a:'#ffb547',r:1,d:{x:3950,y:1895,s:.55,l:4,broken:1}},
 {f:[2490,2165,960,720],a:'#a98bff',r:0,fr:4,d:{x:2640,y:1850,s:.42,l:3,ok:1,rot:6}},
 {f:[560,1300,1060,720],a:'#4fd8ff',r:0,d:{x:950,y:1010,s:.42,l:3}},
 {f:[1680,1300,2980,2150],a:'#5cf2a0',r:0,fr:3,d:{x:2062,y:1240,s:.38,l:4,lock:1}},
 {f:[2100,2615,1720,640],a:'#3fe0c5',r:0,d:{x:2790,y:2380,s:.42,l:3}}
];
S.forEach((s,i)=>{s.ch=TX.steps[i][0];s.t=TX.steps[i][1]});
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const world=document.getElementById('world'),stage=document.getElementById('stage'),cv=document.getElementById('bg'),cx=cv.getContext('2d');
const hud=document.querySelector('.hud'),doc=document.getElementById('doc'),dlab=document.getElementById('dlab');
const elOn=[...document.querySelectorAll('[data-on]')],elShow=[...document.querySelectorAll('[data-show]')],elFr=[...document.querySelectorAll('[data-frag]')];
elShow.forEach(e=>e.classList.add('only'));
let step=0,frag=0,mapMode=false,cycleT=null;
let cam={x:2100,y:1450,s:.1,r:0},fl=null;
let col=hex('#3fe0c5'),colFrom=col,colTo=col;
function hex(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]}
function setCol(c){col=c;document.documentElement.style.setProperty('--accent-rgb',c.map(Math.round).join(','))}
function view(){const vh=innerHeight-hud.offsetHeight;return{w:innerWidth,h:Math.max(200,vh)}}
function target(i){const[x,y,w,h]=S[i].f,v=view();return{x,y,s:Math.min(v.w/(w*1.04),v.h/(h*1.06)),r:S[i].r||0}}
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function fly(to,c){
  const from={...cam},v=view();const d=Math.hypot(to.x-from.x,to.y-from.y);
  const u=d*Math.min(from.s,to.s)/Math.hypot(v.w,v.h);
  const k=RM?0:Math.min(1.7,Math.log2(1+u)*.85);
  const zoomRatio=Math.abs(Math.log2(to.s/from.s));
  const dur=RM?350:Math.min(2600,1200+k*520+zoomRatio*160);
  colFrom=col.slice();colTo=hex(c);
  fl={from,to,k,t0:performance.now(),dur};
  world.style.willChange='transform';
}
function apply(){
  const s=S[step],ov=mapMode||s.ov;
  world.classList.toggle('ov',!!ov);
  elOn.forEach(e=>{const on=!mapMode&&e.dataset.on.split(',').map(Number).includes(step);e.classList.toggle('on',on);e.classList.toggle('off',!on)});
  elShow.forEach(e=>e.classList.toggle('on',!mapMode&&e.dataset.show.split(',').map(Number).includes(step)));
  elFr.forEach(e=>{const[a,b]=e.dataset.frag.split(':').map(Number);e.classList.toggle('fh',!mapMode&&step===a&&frag<b)});
  setDoc(s.d);
  clearInterval(cycleT);document.querySelectorAll('.tier').forEach(t=>t.classList.remove('cur'));
  if(s.cycle&&!mapMode){let i=3;markTier(i);cycleT=setInterval(()=>{i=i%4+1;setLabel(i);markTier(i)},1500)}
  document.getElementById('chn').textContent=mapMode?TX.ui.map:s.ch;
  document.getElementById('cht').textContent=mapMode?TX.ui.all:s.t;
  document.getElementById('cnt').textContent=step>0?String(step).padStart(2,'0')+' / '+String(S.length-1).padStart(2,'0'):'';
  document.getElementById('map').setAttribute('aria-pressed',mapMode);
  segs.forEach((b,i)=>{b.classList.toggle('cur',i===step);b.classList.toggle('done',i<step)});
  document.getElementById('sr').textContent=(mapMode?TX.ui.map:s.ch)+': '+s.t;
}
function markTier(i){document.querySelectorAll('.tier').forEach(t=>t.classList.toggle('cur',+t.dataset.t===i))}
function setLabel(l){dlab.textContent=LAB[l][0];doc.style.setProperty('--lab',LAB[l][1])}
let dcur=null,dtw=null;
function docXf(p){doc.style.transform=`translate(${p.x}px,${p.y}px) rotate(${p.rot}deg) scale(${p.s})`}
function docCls(d){setLabel(d.l);doc.classList.toggle('lock',!!d.lock);doc.classList.toggle('leak',!!d.leak);doc.classList.toggle('broken',!!d.broken);doc.classList.toggle('ok',!!d.ok)}
function setDoc(d){
  const to={x:d.x,y:d.y,s:d.s,rot:d.rot||0};
  if(!dcur){dcur=to;docXf(to);docCls(d);return}
  if(dtw&&dtw.d===d)return;
  if(!dtw&&dcur.x===to.x&&dcur.y===to.y&&dcur.s===to.s&&dcur.rot===to.rot){docCls(d);return}
  doc.classList.remove('leak','broken','ok','lock');
  const dx=to.x-dcur.x,dy=to.y-dcur.y;
  const c={x:(dcur.x+to.x)/2-dy*.22,y:(dcur.y+to.y)/2+dx*.22};
  dtw={from:{...dcur},to,c,d,t0:performance.now(),dur:RM?300:1500,applied:false,last:{...dcur}};
}
function stepDoc(now){
  if(!dtw)return;
  const t=Math.max(0,Math.min(1,(now-dtw.t0)/dtw.dur)),e=ease(t),u=1-e,a=dtw.from,b=dtw.to,c=dtw.c;
  const p={x:u*u*a.x+2*u*e*c.x+e*e*b.x,y:u*u*a.y+2*u*e*c.y+e*e*b.y,s:Math.exp(Math.log(a.s)+(Math.log(b.s)-Math.log(a.s))*e),rot:a.rot+(b.rot-a.rot)*e};
  const vx=(p.x-dtw.last.x)*cam.s,vy=(p.y-dtw.last.y)*cam.s,sp=Math.hypot(vx,vy);
  dtw.last={...p};
  if(!RM){p.rot+=Math.max(-12,Math.min(12,vx*.35));doc.style.filter=`blur(${(Math.min(6,sp*.09)/Math.max(.05,cam.s*p.s)).toFixed(2)}px)`}
  docXf(p);dcur=p;
  if(!dtw.applied&&t>.72){docCls(dtw.d);dtw.applied=true}
  if(t>=1){if(!dtw.applied)docCls(dtw.d);dcur=b;docXf(b);doc.style.filter='';dtw=null}
}
function go(i,f){
  i=Math.max(0,Math.min(S.length-1,i));
  const moved=i!==step||mapMode;
  step=i;frag=f!=null?f:0;mapMode=false;apply();
  if(moved){fly(target(step),S[step].a);if(dtw){dtw.t0=fl.t0;dtw.dur=fl.dur*.9}}
}
function next(){if(mapMode){go(step,frag);return}const s=S[step];if(s.fr&&frag<s.fr){frag++;apply();return}if(step<S.length-1)go(step+1)}
function prev(){if(mapMode){go(step,frag);return}if(frag>0){frag--;apply();return}if(step>0){const p=step-1;go(p,S[p].fr||0)}}
function toggleMap(){if(mapMode){go(step,frag)}else{mapMode=true;apply();fly(target(0),S[step].a)}}

// HUD
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

// stars
let stars=[];
function makeStars(){stars=[];for(let i=0;i<240;i++)stars.push({x:Math.random()*5000,y:Math.random()*5000,d:.15+Math.random()*.55,r:Math.random()*1.4+.3,p:Math.random()*6.28})}
function resize(){const dpr=Math.min(2,devicePixelRatio||1);cv.width=innerWidth*dpr;cv.height=innerHeight*dpr;cx.setTransform(dpr,0,0,dpr,0,0);if(!fl)cam=target(mapMode?0:step)}
function render(now){
  if(fl){
    let t=Math.max(0,Math.min(1,(now-fl.t0)/fl.dur)),e=ease(t);
    const a=fl.from,b=fl.to;
    const ls=Math.log(a.s)+(Math.log(b.s)-Math.log(a.s))*e-fl.k*Math.sin(Math.PI*e)*.693;
    cam={x:a.x+(b.x-a.x)*e,y:a.y+(b.y-a.y)*e,s:Math.exp(ls),r:a.r+(b.r-a.r)*e};
    setCol(colFrom.map((c,i)=>c+(colTo[i]-c)*e));
    if(t>=1){fl=null;world.style.willChange='auto'}
  }
  stepDoc(now);
  const v=view(),Cx=v.w/2,Cy=v.h/2;
  world.style.transform=`translate(${Cx}px,${Cy}px) rotate(${cam.r}deg) scale(${cam.s}) translate(${-cam.x}px,${-cam.y}px)`;
  cx.clearRect(0,0,innerWidth,innerHeight);
  const W=innerWidth+120,H=innerHeight+120,zs=Math.pow(cam.s,.5),c=col.map(Math.round).join(',');
  for(const st of stars){
    let x=((st.x-cam.x*st.d*zs)%W+W)%W-60,y=((st.y-cam.y*st.d*zs)%H+H)%H-60;
    const tw=RM?.7:.45+.35*Math.sin(now*.0012+st.p);
    cx.fillStyle=`rgba(${st.d>.5?c:'200,215,240'},${tw*st.d*1.3})`;
    cx.beginPath();cx.arc(x,y,st.r*(.6+st.d),0,6.283);cx.fill();
  }
  requestAnimationFrame(render);
}
addEventListener('resize',()=>{resize();if(!fl)cam=target(mapMode?0:step)});
makeStars();resize();
cam={...target(0)};const end={...cam};cam.s=end.s*.12;cam.r=-6;
apply();fl={from:{...cam},to:end,k:0,t0:performance.now()+200,dur:RM?10:2800};
requestAnimationFrame(render);
})();
