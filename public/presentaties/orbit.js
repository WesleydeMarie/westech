/* Techwes radar-engine: hoofdstukken liggen in een cirkel rond een radarschijf.
   De camera draait mee zodat het huidige hoofdstuk rechtop staat.
   Config in <script type="application/json" id="orbit-config">:
   { ui:{map,all}, R, w, h, steps:[{ch,t,a(accent),ang,fr,blip}] , blips:[{n,ang,r,hot}] }
   Markup: .panel[data-step="n"] wordt door dit script gepositioneerd. data-frag="stap:n" en .rv werken zoals in de andere engines. */
(function(){
const CFG=JSON.parse(document.getElementById('orbit-config').textContent);
const S=CFG.steps,UI=CFG.ui,R=CFG.R,PW=CFG.w,PH=CFG.h,C=R+PW;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const world=document.getElementById('world'),stage=document.getElementById('stage'),cv=document.getElementById('bg'),cx=cv.getContext('2d');
const hud=document.querySelector('.hud'),blip=document.getElementById('blip'),btag=document.getElementById('btag');
world.style.width=world.style.height=(2*C)+'px';
const rad=d=>d*Math.PI/180;
function polar(ang,r){return{x:C+Math.sin(rad(ang))*r,y:C-Math.cos(rad(ang))*r}}

// panelen rond de cirkel
const panels=[...document.querySelectorAll('[data-step]')];
panels.forEach(p=>{const s=S[+p.dataset.step],q=polar(s.ang,R);
  p.style.width=PW+'px';p.style.minHeight=PH+'px';p.style.left=(q.x-PW/2)+'px';p.style.top=(q.y-PH/2)+'px';p.style.transform=`rotate(${s.ang}deg)`;
  p.dataset.on=p.dataset.step});
// labels op de rand
S.forEach((s,i)=>{if(!i)return;const q=polar(s.ang,R+PH/2+110),el=document.createElement('div');el.className='rimlbl';el.dataset.i=i;
  el.style.left=q.x+'px';el.style.top=q.y+'px';el.style.transform=`translate(-50%,-50%) rotate(${s.ang}deg)`;el.textContent=s.ch;world.appendChild(el)});
const rimls=[...document.querySelectorAll('.rimlbl')];

const elOn=[...document.querySelectorAll('[data-on]')],elShow=[...document.querySelectorAll('[data-show]')],elFr=[...document.querySelectorAll('[data-frag]')];
elShow.forEach(e=>e.classList.add('only'));
let step=0,frag=0,mapMode=false,fl=null,cam={x:C,y:C,s:.05,r:0};
let col=hex(S[0].a),colFrom=col,colTo=col;
function hex(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]}
function setCol(c){col=c;document.documentElement.style.setProperty('--accent-rgb',c.map(Math.round).join(','))}
function view(){return{w:Math.max(320,innerWidth),h:Math.max(200,innerHeight-hud.offsetHeight)}}
function unwrap(r,ref){while(r-ref>180)r-=360;while(r-ref<-180)r+=360;return r}
function target(i){const v=view();
  if(i<0||i===0){const d=2*(R+PH*0.75)*(i<0?1.02:.62);return{x:C,y:C,s:Math.min(v.w,v.h)/d,r:unwrap(i<0?cam.r:0,cam.r)}}
  const s=S[i],q=polar(s.ang,R-260);return{x:q.x,y:q.y,s:Math.min(v.w/(PW*1.42),v.h/(PH+760)),r:unwrap(-s.ang,cam.r)}}
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function fly(to,c){const from={...cam};const dr=Math.abs(to.r-from.r);
  const k=RM?0:Math.min(1.6,.25+dr/90);const dur=RM?350:Math.min(3000,1400+dr*9+Math.abs(Math.log2(to.s/from.s))*180);
  colFrom=col.slice();colTo=hex(c);fl={from,to,k,t0:performance.now(),dur};world.style.willChange='transform'}

// blip (de prompt) volgt de stappen langs de binnenrand
let bcur=null,btw=null;
function bpos(i){const s=S[i];if(!i)return{...polar(180,760),ang:0};return{...polar(s.ang,R-PH/2-300),ang:s.ang}}
function setBlip(i){const to=bpos(i);btag.textContent=S[i].blip||'';blip.className='blip-'+(S[i].bc||'');
  if(!bcur){bcur=to;place(to);return}btw={from:{...bcur},to,t0:performance.now(),dur:RM?300:1600}}
function place(p){blip.style.transform=`translate(${p.x}px,${p.y}px) rotate(${p.ang}deg)`}
function stepBlip(now){if(!btw)return;const t=Math.min(1,(now-btw.t0)/btw.dur),e=ease(t),a=btw.from,b=btw.to;
  // langs de cirkel interpoleren
  const ra=Math.hypot(a.x-C,a.y-C),rb=Math.hypot(b.x-C,b.y-C),aa=a.ang,ab=unwrap(b.ang,aa);
  const ang=aa+(ab-aa)*e,r=ra+(rb-ra)*e-Math.sin(Math.PI*e)*300,q=polar(ang,Math.max(0,r));
  bcur={...q,ang};place(bcur);if(t>=1){bcur=b;place(b);btw=null}}

function apply(){
  const s=S[step];world.classList.toggle('ov',mapMode);
  stage.dataset.s=mapMode?'':step;stage.dataset.f=frag;
  elOn.forEach(e=>{const on=!mapMode&&e.dataset.on.split(',').map(Number).includes(step);e.classList.toggle('on',on);e.classList.toggle('off',!on)});
  elShow.forEach(e=>e.classList.toggle('on',!mapMode&&e.dataset.show.split(',').map(Number).includes(step)));
  elFr.forEach(e=>{const[a,b]=e.dataset.frag.split(':').map(Number);e.classList.toggle('fh',!mapMode&&step===a&&frag<b)});
  rimls.forEach(l=>{const i=+l.dataset.i;l.classList.toggle('cur',i===step);l.classList.toggle('done',i<step)});
  setBlip(step);
  document.getElementById('chn').textContent=mapMode?UI.map:s.ch;
  document.getElementById('cht').textContent=mapMode?UI.all:s.t;
  document.getElementById('cnt').textContent=step>0?String(step).padStart(2,'0')+' / '+String(S.length-1).padStart(2,'0'):'';
  document.getElementById('map').setAttribute('aria-pressed',mapMode);
  segs.forEach((b,i)=>{b.classList.toggle('cur',i===step);b.classList.toggle('done',i<step)});
  document.getElementById('sr').textContent=(mapMode?UI.map:s.ch)+': '+s.t;
}
function go(i,f){i=Math.max(0,Math.min(S.length-1,i));const moved=i!==step||mapMode;step=i;frag=f!=null?f:0;mapMode=false;apply();if(moved)fly(target(step),S[step].a)}
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
  else if(e.key==='f'||e.key==='F'){try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}catch(_){}}});
let px=null,py=null;
stage.addEventListener('pointerdown',e=>{px=e.clientX;py=e.clientY});
stage.addEventListener('pointerup',e=>{if(px==null)return;const dx=e.clientX-px,dy=e.clientY-py;px=null;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))dx<0?next():prev();else if(Math.abs(dx)<8&&Math.abs(dy)<8)next()});

// achtergrond: radarschijf in wereldcoördinaten, met sweep en blips
const B=(CFG.blips||[]).map(b=>({...polar(b.ang,b.r*R),ang:b.ang,n:b.n,hot:b.hot,lit:0}));
let stars=[];for(let i=0;i<220;i++)stars.push({x:Math.random()*4000,y:Math.random()*4000,d:.15+Math.random()*.5,r:Math.random()*1.3+.3,p:Math.random()*6.28});
function resize(){const dpr=Math.min(2,devicePixelRatio||1);cv.width=innerWidth*dpr;cv.height=innerHeight*dpr;cx.setTransform(dpr,0,0,dpr,0,0);if(!fl)cam=target(mapMode?-1:step)}
let sweep=0,last=performance.now();
function render(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;
  if(fl){const t=Math.max(0,Math.min(1,(now-fl.t0)/fl.dur)),e=ease(t),a=fl.from,b=fl.to;
    const ls=Math.log(a.s)+(Math.log(b.s)-Math.log(a.s))*e-fl.k*Math.sin(Math.PI*e)*.693;
    cam={x:a.x+(b.x-a.x)*e,y:a.y+(b.y-a.y)*e,s:Math.exp(ls),r:a.r+(b.r-a.r)*e};
    setCol(colFrom.map((c,i)=>c+(colTo[i]-c)*e));if(t>=1){fl=null;world.style.willChange='auto'}}
  stepBlip(now);
  const v=view(),Cx=v.w/2,Cy=v.h/2,cr=Math.cos(rad(cam.r)),sr=Math.sin(rad(cam.r));
  world.style.transform=`translate(${Cx}px,${Cy}px) rotate(${cam.r}deg) scale(${cam.s}) translate(${-cam.x}px,${-cam.y}px)`;
  const scr=(x,y)=>{const lx=(x-cam.x)*cam.s,ly=(y-cam.y)*cam.s;return[Cx+lx*cr-ly*sr,Cy+lx*sr+ly*cr]};
  cx.clearRect(0,0,innerWidth,innerHeight);
  const c=col.map(Math.round).join(',');
  for(const st of stars){const W=innerWidth+100,H=innerHeight+100,x=((st.x-cam.x*st.d*.05)%W+W)%W-50,y=((st.y-cam.y*st.d*.05)%H+H)%H-50;
    cx.fillStyle=`rgba(200,215,240,${(RM?.6:.4+.3*Math.sin(now*.001+st.p))*st.d})`;cx.beginPath();cx.arc(x,y,st.r,0,6.283);cx.fill()}
  const [ox,oy]=scr(C,C),Rs=R*cam.s,rot=rad(cam.r);
  // ringen
  cx.lineWidth=1.2;for(let k=1;k<=6;k++){cx.strokeStyle=`rgba(${c},${k===6?.35:.13})`;cx.beginPath();cx.arc(ox,oy,Rs*k/6*1.0,0,6.283);cx.stroke()}
  cx.strokeStyle=`rgba(${c},.10)`;for(let k=0;k<12;k++){const a=rot+k*Math.PI/6;cx.beginPath();cx.moveTo(ox,oy);cx.lineTo(ox+Math.sin(a)*Rs,oy-Math.cos(a)*Rs);cx.stroke()}
  // graadverdeling op de rand
  for(let k=0;k<72;k++){const a=rot+k*Math.PI/36,l=k%6?10:24;cx.strokeStyle=`rgba(${c},${k%6?.3:.6})`;cx.lineWidth=k%6?1:2;
    cx.beginPath();cx.moveTo(ox+Math.sin(a)*Rs,oy-Math.cos(a)*Rs);cx.lineTo(ox+Math.sin(a)*(Rs+l),oy-Math.cos(a)*(Rs+l));cx.stroke()}
  // sweep
  if(!RM)sweep=(sweep+dt*60)%360;
  const sa=rad(sweep)+rot-Math.PI/2;
  const g=cx.createConicGradient?cx.createConicGradient(sa-1.0,ox,oy):null;
  if(g){g.addColorStop(0,`rgba(${c},0)`);g.addColorStop(.159,`rgba(${c},.28)`);g.addColorStop(.16,`rgba(${c},0)`);g.addColorStop(1,`rgba(${c},0)`);
    cx.fillStyle=g;cx.beginPath();cx.arc(ox,oy,Rs,0,6.283);cx.fill()}
  cx.strokeStyle=`rgba(${c},.8)`;cx.lineWidth=2;cx.beginPath();cx.moveTo(ox,oy);cx.lineTo(ox+Math.cos(sa)*Rs,oy+Math.sin(sa)*Rs);cx.stroke();
  // blips oplichten als de sweep passeert
  for(const b of B){const diff=((sweep-b.ang)%360+360)%360;if(diff<4)b.lit=1;b.lit=Math.max(0,b.lit-dt*.45);
    const[bx,by]=scr(b.x,b.y),hc=b.hot?'255,90,95':c,rr=Math.max(3,9*Math.sqrt(cam.s*8));
    cx.fillStyle=`rgba(${hc},${.25+.75*b.lit})`;cx.beginPath();cx.arc(bx,by,rr,0,6.283);cx.fill();
    if(b.lit>.05){cx.strokeStyle=`rgba(${hc},${b.lit*.7})`;cx.lineWidth=2;cx.beginPath();cx.arc(bx,by,rr+(1-b.lit)*40,0,6.283);cx.stroke()}
    if(cam.s>.06){cx.fillStyle=`rgba(230,237,247,${.3+.7*b.lit})`;cx.font=`500 ${Math.max(11,Math.min(22,170*cam.s))}px "JetBrains Mono",monospace`;cx.fillText(b.n,bx+rr+8,by+5)}}
  requestAnimationFrame(render)}
addEventListener('resize',()=>{resize();if(!fl)cam=target(mapMode?-1:step)});
if(window.ResizeObserver)new ResizeObserver(()=>{resize();if(!fl)cam=target(mapMode?-1:step)}).observe(stage);
resize();cam=target(-1);cam.r=-25;const end=target(0);
apply();fl={from:{...cam},to:end,k:0,t0:performance.now()+300,dur:RM?10:3000};colFrom=col;colTo=hex(S[0].a);
requestAnimationFrame(render);
})();
