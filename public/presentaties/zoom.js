/* Techwes zoom-engine: elk hoofdstuk ligt een laag dieper. Je zoomt in op een detail en komt in de volgende laag uit.
   Config in <script type="application/json" id="zoom-config">: { ui:{map,all,depth}, steps:[{ch,t,a,fr,dir:"in"|"out",lvl}] }
   Markup: .layer[data-i="n"] met optioneel één [data-focus] (het punt waarop wordt ingezoomd naar de volgende laag).
   data-frag="stap:n" en .rv werken zoals in de andere engines. #stage krijgt data-s en data-f voor CSS. */
(function(){
const CFG=JSON.parse(document.getElementById('zoom-config').textContent);
const S=CFG.steps,UI=CFG.ui,BW=1600,BH=900;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const stage=document.getElementById('stage'),cv=document.getElementById('bg'),cx=cv.getContext('2d'),hud=document.querySelector('.hud');
const layers=[...document.querySelectorAll('.layer')].sort((a,b)=>a.dataset.i-b.dataset.i);
const elFr=[...document.querySelectorAll('[data-frag]')];
const gauge=document.getElementById('gauge');
let step=0,frag=0,mapMode=false,busy=false,warp=0,warpDir=1;

function hex(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]}
let col=hex(S[0].a);
function setCol(h){col=hex(h);document.documentElement.style.setProperty('--accent-rgb',col.join(','))}
function fit(){const vw=innerWidth,vh=innerHeight-hud.offsetHeight;return Math.min(vw/BW,vh/BH)}
function layout(){const f=fit(),vh=innerHeight-hud.offsetHeight;
  document.documentElement.style.setProperty('--fit',f);
  layers.forEach(l=>{l.style.left=((innerWidth-BW)/2)+'px';l.style.top=((vh-BH)/2)+'px'});
  if(mapMode)mapLayout()}
function lz(l){return l.querySelector('.lz')}
function focusOrigin(l){const fe=l.querySelector('[data-focus]'),z=lz(l);if(!fe)return'50% 50%';
  const lr=z.getBoundingClientRect(),fr=fe.getBoundingClientRect(),sc=lr.width/BW;
  return`${(fr.left+fr.width/2-lr.left)/sc}px ${(fr.top+fr.height/2-lr.top)/sc}px`}

// dieptemeter
S.forEach((s,i)=>{const r=document.createElement('button');r.className='gl';r.dataset.i=i;r.innerHTML=`<i></i><span>${s.lvl||s.ch}</span>`;r.onclick=()=>go(i);gauge.appendChild(r)});
const gls=[...gauge.querySelectorAll('.gl')];

function state(){
  stage.dataset.s=mapMode?'':step;stage.dataset.f=frag;stage.classList.toggle('ov',mapMode);
  layers.forEach((l,i)=>l.classList.toggle('on',!mapMode&&i===step));
  elFr.forEach(e=>{const[a,b]=e.dataset.frag.split(':').map(Number);e.classList.toggle('fh',!mapMode&&step===a&&frag<b)});
  gls.forEach((g,i)=>{g.classList.toggle('cur',i===step);g.classList.toggle('done',i<step)});
  gauge.style.setProperty('--p',step/(S.length-1));
  const s=S[step];
  document.getElementById('chn').textContent=mapMode?UI.map:s.ch;
  document.getElementById('cht').textContent=mapMode?UI.all:s.t;
  document.getElementById('cnt').textContent=step>0?String(step).padStart(2,'0')+' / '+String(S.length-1).padStart(2,'0'):'';
  document.getElementById('map').setAttribute('aria-pressed',mapMode);
  segs.forEach((b,i)=>{b.classList.toggle('cur',i===step);b.classList.toggle('done',i<step)});
  document.getElementById('sr').textContent=(mapMode?UI.map:s.ch)+': '+s.t;
  setCol(s.a);
}
function show(i){const f=fit();layers.forEach((l,k)=>{const z=lz(l);l.style.transition='none';l.style.transformOrigin='50% 50%';
  l.style.transform=`scale(${f})`;z.style.transition='none';z.style.transform='scale(1)';z.style.transformOrigin='50% 50%';
  z.style.opacity=k===i?1:0;l.style.visibility=k===i?'visible':'hidden';l.style.pointerEvents=k===i?'auto':'none'})}
function go(i,f){
  i=Math.max(0,Math.min(S.length-1,i));
  if(mapMode){mapMode=false;stage.classList.remove('ov');step=i;frag=f||0;show(i);state();return}
  if(i===step){frag=f||0;state();return}
  if(busy)return;
  const from=layers[step],to=layers[i],fw=i>step,dir=(fw?S[i].dir:S[step].dir)||'in',zin=(fw&&dir==='in')||(!fw&&dir==='out');
  const dur=RM?250:1250,fz=lz(from),tz=lz(to);
  // in: huidige laag zoomt in op het focuspunt en verdwijnt, nieuwe laag komt van klein naar normaal. Uit: andersom.
  tz.style.transition='none';tz.style.transform='scale(1)';tz.style.transformOrigin='50% 50%';
  const o=zin?focusOrigin(from):focusOrigin(to);
  fz.style.transition='none';fz.style.transformOrigin=zin?o:'50% 50%';tz.style.transformOrigin=zin?'50% 50%':o;
  to.style.visibility='visible';tz.style.opacity=0;tz.style.transform=`scale(${zin?.18:7})`;
  void tz.offsetWidth;
  const ez='cubic-bezier(.7,0,.25,1)';
  fz.style.transition=`transform ${dur}ms ${ez},opacity ${dur*.55}ms ease ${dur*.35}ms`;
  tz.style.transition=`transform ${dur}ms ${ez},opacity ${dur*.5}ms ease ${dur*.3}ms`;
  fz.style.transform=`scale(${zin?7:.18})`;fz.style.opacity=0;
  tz.style.transform='scale(1)';tz.style.opacity=1;
  warp=1;warpDir=zin?1:-1;busy=true;
  step=i;frag=f!=null?f:0;state();
  setTimeout(()=>{from.style.visibility='hidden';from.style.pointerEvents='none';to.style.pointerEvents='auto';
    fz.style.transition='none';fz.style.transform='scale(1)';tz.style.transition='none';tz.style.transformOrigin='50% 50%';busy=false},dur+30);
}
function next(){if(mapMode){go(step,frag);return}const s=S[step];if(s.fr&&frag<s.fr){frag++;state();return}if(step<S.length-1)go(step+1)}
function prev(){if(mapMode){go(step,frag);return}if(frag>0){frag--;state();return}if(step>0){const p=step-1;go(p,S[p].fr||0)}}

// overzicht: alle lagen als een stapel kaarten
function mapLayout(){const n=layers.length,cols=Math.ceil(Math.sqrt(n*16/9*.8)),rows=Math.ceil(n/cols),vh=innerHeight-hud.offsetHeight,
  cw=(innerWidth-80)/cols,ch=(vh-80)/rows,s=Math.min(cw/BW,ch/BH)*.9;
  layers.forEach((l,i)=>{const c=i%cols,r=Math.floor(i/cols),x=40+c*cw+(cw-BW*s)/2,y=40+r*ch+(ch-BH*s)/2;
    l.style.transition=RM?'none':'transform .9s cubic-bezier(.3,1.1,.4,1),opacity .6s';l.style.transformOrigin='0 0';
    l.style.transform=`translate(${x-(innerWidth-BW)/2}px,${y-(vh-BH)/2}px) scale(${s})`;const z=lz(l);z.style.transition='none';z.style.transform='scale(1)';z.style.opacity=1;l.style.visibility='visible';l.style.pointerEvents='auto';
    l.onclick=()=>{if(mapMode)go(i)}})}
function toggleMap(){if(mapMode){go(step,frag)}else{mapMode=true;state();mapLayout()}}

const segWrap=document.getElementById('segs'),segs=S.map((s,i)=>{const b=document.createElement('button');b.className='seg';b.setAttribute('aria-label',s.ch+': '+s.t);b.onclick=()=>go(i);segWrap.appendChild(b);return b});
document.getElementById('next').onclick=next;document.getElementById('prev').onclick=prev;document.getElementById('map').onclick=toggleMap;
addEventListener('keydown',e=>{
  if(['ArrowRight','PageDown',' ','Enter'].includes(e.key)){if(e.key==='Enter'&&e.target.tagName==='BUTTON')return;e.preventDefault();next()}
  else if(['ArrowLeft','PageUp','Backspace'].includes(e.key)){e.preventDefault();prev()}
  else if(e.key==='Home')go(0);else if(e.key==='End')go(S.length-1);
  else if(e.key==='m'||e.key==='M')toggleMap();
  else if(e.key==='f'||e.key==='F'){try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}catch(_){}}});
let px=null,py=null;
stage.addEventListener('pointerdown',e=>{px=e.clientX;py=e.clientY});
stage.addEventListener('pointerup',e=>{if(px==null||mapMode)return;const dx=e.clientX-px,dy=e.clientY-py;px=null;
  if(e.target.closest('#gauge'))return;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))dx<0?next():prev();else if(Math.abs(dx)<8&&Math.abs(dy)<8)next()});

// achtergrond: sterrentunnel die versnelt bij elke zoom
const N=380,stars=[];for(let i=0;i<N;i++)stars.push({x:(Math.random()-.5)*2,y:(Math.random()-.5)*2,z:Math.random()});
function resize(){const dpr=Math.min(2,devicePixelRatio||1);cv.width=innerWidth*dpr;cv.height=innerHeight*dpr;cx.setTransform(dpr,0,0,dpr,0,0);layout();if(!mapMode)show(step)}
let last=performance.now();
function render(now){const dt=Math.min(.05,(now-last)/1000);last=now;
  warp=Math.max(0,warp-dt*.9);const sp=(RM?0:.03+warp*warp*2.2)*warpDir;
  const W=innerWidth,H=innerHeight-hud.offsetHeight,cxp=W/2,cyp=H/2,c=col.join(',');
  cx.fillStyle='rgba(4,7,13,'+(warp>.05?.35:1)+')';cx.fillRect(0,0,innerWidth,innerHeight);
  for(const s of stars){const pz=s.z;s.z-=sp*dt*(warpDir>0?1:1);if(s.z<=.02){s.z=1;s.x=(Math.random()-.5)*2;s.y=(Math.random()-.5)*2}if(s.z>1){s.z=.03;s.x=(Math.random()-.5)*2;s.y=(Math.random()-.5)*2}
    const k=.5/s.z,x=cxp+s.x*W*k*.5,y=cyp+s.y*H*k*.5,k0=.5/Math.max(.02,pz),x0=cxp+s.x*W*k0*.5,y0=cyp+s.y*H*k0*.5;
    const a=Math.min(1,(1-s.z)*1.3);cx.strokeStyle=`rgba(${warp>.1?c:'200,215,240'},${a*.8})`;cx.lineWidth=Math.max(.6,(1-s.z)*2.4);
    cx.beginPath();cx.moveTo(x0,y0);cx.lineTo(x+(x-x0)*warp*6,y+(y-y0)*warp*6);cx.stroke()}
  requestAnimationFrame(render)}
addEventListener('resize',resize);
resize();show(0);state();
// intro: van ver weg naar de eerste laag
if(!RM){const z=lz(layers[0]);z.style.opacity=0;z.style.transform='scale(.2)';void z.offsetWidth;
  z.style.transition='transform 2s cubic-bezier(.2,.8,.2,1),opacity 1.2s ease';z.style.transform='scale(1)';z.style.opacity=1;warp=1;warpDir=1}
requestAnimationFrame(render);
})();
