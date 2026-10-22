// Animaties in blogposts. Gebruik in een post een losse regel: ::animatie <naam>
// Elke animatie is statische SVG met CSS keyframes, zonder script, zodat hij binnen de CSP van de site werkt.
import React from 'react';

const BASE = `
.ta{margin:2rem 0}
.ta-frame{background:#0b1120;border-radius:10px;overflow:hidden;box-shadow:0 8px 24px rgba(15,23,42,.18)}
.ta svg{display:block;width:100%;height:auto}
.ta text{font-family:Inter,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;fill:#e6edf7}
.ta .m{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.ta .mu{fill:#8e9bb2}
.ta figcaption{font-size:14px;color:#6b7280;margin-top:.6rem;line-height:1.5}
@media (prefers-reduced-motion:reduce){.ta *{animation:none!important}}
`;

const A = {};

/* 7 · Custom SIT: primary element, supporting element, confidence */
A.sit = {
  caption: 'Een patroon alleen geeft weinig zekerheid. Staat er een ondersteunend woord in de buurt, dan stijgt de match naar high confidence.',
  css: `
.sit .p{animation:sitp 10s infinite}
.sit .s{animation:sits 10s infinite}
.sit .x{animation:sitx 10s infinite}
.sit .f{transform-box:fill-box;transform-origin:left center;animation:sitf 10s infinite}
.sit .hi{animation:sith 10s infinite}
@keyframes sitp{0%,12%{opacity:0}18%,92%{opacity:1}98%,100%{opacity:0}}
@keyframes sits{0%,40%{opacity:0}46%,92%{opacity:1}98%,100%{opacity:0}}
@keyframes sitx{0%,54%{opacity:0}60%,92%{opacity:1}98%,100%{opacity:0}}
@keyframes sitf{0%,14%{transform:scaleX(0)}22%,44%{transform:scaleX(.333)}62%,92%{transform:scaleX(1)}98%,100%{transform:scaleX(0)}}
@keyframes sith{0%,62%{opacity:0}68%,92%{opacity:1}98%,100%{opacity:0}}`,
  svg: `<svg class="sit" viewBox="0 0 800 400" role="img" aria-label="Een custom SIT herkent een klantnummer en een ondersteunend woord">
<rect x="40" y="50" width="720" height="110" rx="8" fill="#111a2e" stroke="#22304a"/>
<text x="64" y="84" class="mu" font-size="15">Document</text>
<rect class="s" x="164" y="104" width="148" height="36" rx="5" fill="rgba(63,224,197,.15)" stroke="#3fe0c5" stroke-width="2"/>
<rect class="p" x="322" y="104" width="124" height="36" rx="5" fill="rgba(251,146,60,.18)" stroke="#fb923c" stroke-width="2"/>
<text x="64" y="130" class="m" font-size="22">Betreft klantnummer KL-482913, factuur april</text>
<g class="p"><text x="334" y="196" font-size="17" fill="#fb923c">Primary element</text><text x="334" y="218" class="mu m" font-size="14">regex KL-\\d{6}</text></g>
<g class="s"><text x="304" y="196" text-anchor="end" font-size="17" fill="#3fe0c5">Supporting element</text><text x="304" y="218" text-anchor="end" class="mu m" font-size="14">keyword</text></g>
<g class="x"><path d="M238 232 v14 h146 v-14" fill="none" stroke="#8e9bb2" stroke-width="2"/><text x="311" y="270" text-anchor="middle" class="mu" font-size="14">binnen de ingestelde afstand</text></g>
<text x="64" y="316" font-size="16" class="mu">Confidence</text>
<rect x="64" y="330" width="672" height="26" rx="13" fill="#1a2438"/>
<rect class="f" x="64" y="330" width="672" height="26" rx="13" fill="#3fe0c5"/>
<line x1="288" y1="330" x2="288" y2="356" stroke="#0b1120" stroke-width="3"/><line x1="512" y1="330" x2="512" y2="356" stroke="#0b1120" stroke-width="3"/>
<text x="176" y="380" text-anchor="middle" class="mu" font-size="14">Low</text><text x="400" y="380" text-anchor="middle" class="mu" font-size="14">Medium</text><text x="624" y="380" text-anchor="middle" class="mu" font-size="14">High</text>
<text class="hi" x="736" y="316" text-anchor="end" font-size="16" fill="#3fe0c5">high confidence match</text>
</svg>`
};

/* 8 · Agents als nieuwe identiteiten */
const person = (x, y) => `<g transform="translate(${x} ${y})"><circle cx="0" cy="-10" r="9" fill="#3a4a63"/><path d="M-15 16 q15 -22 30 0z" fill="#3a4a63"/></g>`;
const agent = (x, y, c) => `<g class="ag ${c}" transform="translate(${x} ${y})"><g class="pop"><polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" fill="rgba(63,224,197,.15)" stroke="#3fe0c5" stroke-width="2.5"/><circle cx="-6" cy="-2" r="2.5" fill="#3fe0c5"/><circle cx="6" cy="-2" r="2.5" fill="#3fe0c5"/><text x="0" y="40" text-anchor="middle" class="m" font-size="12" fill="#3fe0c5">Agent ID</text></g></g>`;
A.agents = {
  caption: 'Agents komen erbij als nieuwe identiteiten in je tenant, elk met een eigen Agent ID in Entra.',
  css: `
.agents .pop{transform-box:fill-box;transform-origin:center}
.agents .a1 .pop{animation:agp1 10s infinite}.agents .a2 .pop{animation:agp2 10s infinite}.agents .a3 .pop{animation:agp3 10s infinite}
.agents .l1{animation:agl1 10s infinite}.agents .l2{animation:agl2 10s infinite}.agents .l3{animation:agl3 10s infinite}
.agents .ln{stroke-dasharray:400}
@keyframes agp1{0%,10%{opacity:0;transform:scale(.3)}16%,92%{opacity:1;transform:scale(1)}98%,100%{opacity:0}}
@keyframes agp2{0%,30%{opacity:0;transform:scale(.3)}36%,92%{opacity:1;transform:scale(1)}98%,100%{opacity:0}}
@keyframes agp3{0%,50%{opacity:0;transform:scale(.3)}56%,92%{opacity:1;transform:scale(1)}98%,100%{opacity:0}}
@keyframes agl1{0%,16%{stroke-dashoffset:400}26%,92%{stroke-dashoffset:0}98%,100%{stroke-dashoffset:400}}
@keyframes agl2{0%,36%{stroke-dashoffset:400}46%,92%{stroke-dashoffset:0}98%,100%{stroke-dashoffset:400}}
@keyframes agl3{0%,56%{stroke-dashoffset:400}66%,92%{stroke-dashoffset:0}98%,100%{stroke-dashoffset:400}}`,
  svg: `<svg class="agents" viewBox="0 0 800 400" role="img" aria-label="Agents verschijnen naast gebruikers in de tenant en krijgen een identiteit in Entra">
<rect x="40" y="40" width="480" height="320" rx="12" fill="#111a2e" stroke="#22304a"/>
<text x="64" y="74" class="mu" font-size="15">Jouw tenant</text>
${[110, 190, 270, 350, 430].map(x => person(x, 130)).join('')}
${[110, 190, 270].map(x => person(x, 210)).join('')}
${agent(350, 205, 'a1')}${agent(430, 205, 'a2')}${agent(110, 285, 'a3')}
${[190, 270, 350, 430].map(x => person(x, 290)).join('')}
<rect x="590" y="150" width="170" height="100" rx="10" fill="#111a2e" stroke="#3fe0c5" stroke-width="2"/>
<text x="675" y="194" text-anchor="middle" font-size="18">Microsoft Entra</text>
<text x="675" y="220" text-anchor="middle" class="mu m" font-size="13">agent identities</text>
<path class="ln l1" d="M368 205 C480 205 520 200 590 200" fill="none" stroke="#3fe0c5" stroke-width="2"/>
<path class="ln l2" d="M448 205 C520 210 540 215 590 215" fill="none" stroke="#3fe0c5" stroke-width="2"/>
<path class="ln l3" d="M128 285 C330 330 520 300 590 235" fill="none" stroke="#3fe0c5" stroke-width="2"/>
</svg>`
};

/* 9 · DSPM for AI: zien is niet tegenhouden */
const dot = (cls, c, y) => `<circle class="${cls}" cx="0" cy="${y}" r="9" fill="${c}"/>`;
A.dspm = {
  caption: 'DSPM for AI laat zien welke gevoelige data naar AI-apps gaat. Pas met een policy wordt die ook tegengehouden.',
  css: `
.dspm .g1{animation:dsg 3s linear infinite}.dspm .g2{animation:dsg 3s linear infinite -1s}.dspm .g3{animation:dsg 3s linear infinite -2s}
.dspm .r1{animation:dsr1 12s linear infinite}.dspm .r2{animation:dsr2 12s linear infinite}
.dspm .b1{animation:dsb1 12s linear infinite}.dspm .b2{animation:dsb2 12s linear infinite}
.dspm .gate{transform-box:fill-box;transform-origin:center top;animation:dsgate 12s infinite}
.dspm .pol{animation:dspol 12s infinite}.dspm .open{animation:dsopen 12s infinite}
.dspm .eye{animation:dseye 2.4s ease-in-out infinite}
@keyframes dsg{from{transform:translateX(150px)}to{transform:translateX(650px)}}
@keyframes dsr1{0%{transform:translateX(150px);opacity:1}30%{transform:translateX(650px);opacity:1}31%,100%{opacity:0;transform:translateX(650px)}}
@keyframes dsr2{0%,14%{opacity:0;transform:translateX(150px)}15%{opacity:1;transform:translateX(150px)}44%{opacity:1;transform:translateX(650px)}45%,100%{opacity:0;transform:translateX(650px)}}
@keyframes dsb1{0%,54%{opacity:0;transform:translateX(150px)}55%{opacity:1;transform:translateX(150px)}68%{opacity:1;transform:translateX(385px)}72%{transform:translateX(375px)}80%{opacity:0;transform:translateX(375px)}100%{opacity:0}}
@keyframes dsb2{0%,70%{opacity:0;transform:translateX(150px)}71%{opacity:1;transform:translateX(150px)}84%{opacity:1;transform:translateX(385px)}88%{transform:translateX(375px)}96%,100%{opacity:0;transform:translateX(375px)}}
@keyframes dsgate{0%,48%{transform:scaleY(0)}53%,95%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes dspol{0%,48%{opacity:0}53%,95%{opacity:1}100%{opacity:0}}
@keyframes dsopen{0%,46%{opacity:1}50%,96%{opacity:0}100%{opacity:1}}
@keyframes dseye{0%,100%{opacity:.75}50%{opacity:1}}`,
  svg: `<svg class="dspm" viewBox="0 0 800 400" role="img" aria-label="Prompts met gevoelige data gaan eerst ongehinderd naar AI-apps en worden na het aanzetten van een policy tegengehouden">
<rect x="40" y="150" width="110" height="110" rx="10" fill="#111a2e" stroke="#22304a"/><text x="95" y="210" text-anchor="middle" font-size="15">Gebruikers</text>
<rect x="650" y="130" width="120" height="150" rx="10" fill="#111a2e" stroke="#22304a"/>
<text x="710" y="172" text-anchor="middle" font-size="14" class="mu">AI-apps</text>
<text x="710" y="202" text-anchor="middle" font-size="15">Copilot</text><text x="710" y="228" text-anchor="middle" font-size="15">ChatGPT</text><text x="710" y="254" text-anchor="middle" font-size="15">Gemini</text>
<line x1="150" y1="205" x2="650" y2="205" stroke="#22304a" stroke-width="44" stroke-linecap="round"/>
<g class="eye" transform="translate(400 92)"><path d="M-46 0 Q0 -36 46 0 Q0 36 -46 0z" fill="none" stroke="#3fe0c5" stroke-width="3"/><circle r="12" fill="#3fe0c5"/></g>
<text x="400" y="146" text-anchor="middle" font-size="15" fill="#3fe0c5">DSPM for AI ziet alles</text>
${dot('g1', '#5b6780', 205)}${dot('g2', '#5b6780', 205)}${dot('g3', '#5b6780', 205)}
${dot('r1', '#fb923c', 205)}${dot('r2', '#fb923c', 205)}${dot('b1', '#fb923c', 205)}${dot('b2', '#fb923c', 205)}
<rect class="gate" x="396" y="175" width="8" height="60" rx="3" fill="#fb923c"/>
<text class="open" x="400" y="290" text-anchor="middle" font-size="16" fill="#8e9bb2">Geen policy: gevoelige prompts gaan door</text>
<text class="pol" x="400" y="290" text-anchor="middle" font-size="16" fill="#fb923c">DLP-policy actief: gevoelige prompts gestopt</text>
<circle cx="70" cy="340" r="7" fill="#fb923c"/><text x="84" y="345" font-size="13" class="mu">bevat gevoelige data</text>
<circle cx="250" cy="340" r="7" fill="#5b6780"/><text x="264" y="345" font-size="13" class="mu">gewone prompt</text>
</svg>`
};

/* 10 · Copilot als zaklamp */
const folder = (x, y, cls, badge) => `<g class="${cls}" transform="translate(${x} ${y})"><path d="M-34 -18 h22 l6 7 h40 v39 h-68z" fill="#1d2a42" stroke="#3a4a63" stroke-width="2"/>${badge ? `<g class="bd"><rect x="-30" y="26" width="60" height="20" rx="10" fill="#fb923c"/><text x="0" y="40" text-anchor="middle" font-size="12" fill="#0b1120" font-weight="600">Iedereen</text></g>` : ''}</g>`;
A.oversharing = {
  caption: 'Copilot maakt niets nieuws openbaar. Het laat zien wat al te breed gedeeld stond.',
  css: `
.ovs .beam{transform-box:view-box;transform-origin:400px 380px;animation:ovb 10s ease-in-out infinite}
.ovs .c1 path,.ovs .c1 .bd{animation:ov1 10s infinite}.ovs .c2 path,.ovs .c2 .bd{animation:ov2 10s infinite}
.ovs .c3 path,.ovs .c3 .bd{animation:ov3 10s infinite}.ovs .c4 path,.ovs .c4 .bd{animation:ov4 10s infinite}
.ovs .lit path{fill:#3b2a17;stroke:#fb923c}
@keyframes ovb{0%{transform:rotate(-58deg);opacity:0}6%{opacity:.9}70%{transform:rotate(58deg);opacity:.9}80%,100%{transform:rotate(58deg);opacity:0}}
@keyframes ov1{0%,16%{opacity:.25}20%,94%{opacity:1}100%{opacity:.25}}
@keyframes ov2{0%,30%{opacity:.25}34%,94%{opacity:1}100%{opacity:.25}}
@keyframes ov3{0%,46%{opacity:.25}50%,94%{opacity:1}100%{opacity:.25}}
@keyframes ov4{0%,60%{opacity:.25}64%,94%{opacity:1}100%{opacity:.25}}`,
  svg: `<svg class="ovs" viewBox="0 0 800 400" role="img" aria-label="Copilot schijnt als een zaklamp door een donker archief en laat te breed gedeelde mappen oplichten">
<defs><linearGradient id="ovg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fde68a" stop-opacity=".55"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></linearGradient></defs>
${folder(130, 80, 'dim')}${folder(130, 170, 'c1 lit', 1)}${folder(130, 260, 'dim')}
${folder(290, 80, 'c2 lit', 1)}${folder(290, 170, 'dim')}${folder(290, 260, 'c2 lit', 1)}
${folder(510, 80, 'dim')}${folder(510, 170, 'c3 lit', 1)}${folder(510, 260, 'dim')}
${folder(670, 80, 'c4 lit', 1)}${folder(670, 170, 'dim')}${folder(670, 260, 'dim')}
<style>.ovs .dim{opacity:.3}</style>
<path class="beam" d="M400 380 L330 20 Q400 0 470 20 Z" fill="url(#ovg)"/>
<rect x="372" y="352" width="56" height="40" rx="12" fill="#111a2e" stroke="#3fe0c5" stroke-width="2"/>
<text x="400" y="377" text-anchor="middle" font-size="13" fill="#3fe0c5">Copilot</text>
</svg>`
};

/* 13 + 29 · Externe mail uit de grounding */
const env = (cls, c, lbl) => `<g class="${cls}"><rect x="-26" y="-17" width="52" height="34" rx="4" fill="#111a2e" stroke="${c}" stroke-width="2.5"/><path d="M-26 -17 L0 4 L26 -17" fill="none" stroke="${c}" stroke-width="2"/>${lbl ? `<text x="0" y="36" text-anchor="middle" class="m" font-size="12" fill="${c}">${lbl}</text>` : ''}</g>`;
A.grounding = {
  caption: 'De DLP-conditie laat interne mail door naar Copilot en houdt mail van externe afzenders buiten de grounding.',
  css: `
.gro .i1{animation:gri 6s linear infinite}.gro .i2{animation:gri 6s linear infinite -2s}.gro .i3{animation:gri 6s linear infinite -4s}
.gro .e1{animation:gre 6s linear infinite -1s}.gro .e2{animation:gre 6s linear infinite -4s}
.gro .flt{animation:grf 3s ease-in-out infinite}
@keyframes gri{0%{transform:translate(90px,200px);opacity:0}8%{opacity:1}90%{opacity:1}100%{transform:translate(640px,200px);opacity:0}}
@keyframes gre{0%{transform:translate(90px,200px);opacity:0}8%{opacity:1}50%{transform:translate(375px,200px)}58%{transform:translate(380px,240px) rotate(18deg)}75%,100%{transform:translate(370px,330px) rotate(40deg);opacity:0}}
@keyframes grf{0%,100%{opacity:.7}50%{opacity:1}}`,
  svg: `<svg class="gro" viewBox="0 0 800 400" role="img" aria-label="Interne mails gaan naar Copilot, mails van externe afzenders worden door een DLP-filter tegengehouden">
<text x="60" y="110" font-size="15" class="mu">Mailbox</text>
<rect class="flt" x="398" y="120" width="10" height="160" rx="5" fill="#fb923c"/>
<text x="403" y="104" text-anchor="middle" font-size="15" fill="#fb923c">DLP-conditie</text>
<text x="403" y="306" text-anchor="middle" font-size="13" class="mu">afzender is extern</text>
<rect x="660" y="140" width="110" height="120" rx="14" fill="#111a2e" stroke="#3fe0c5" stroke-width="2"/>
<text x="715" y="196" text-anchor="middle" font-size="16" fill="#3fe0c5">Copilot</text><text x="715" y="218" text-anchor="middle" font-size="13" class="mu">grounding</text>
${env('i1', '#3fe0c5')}${env('i2', '#3fe0c5')}${env('i3', '#3fe0c5')}${env('e1', '#fb923c', 'extern')}${env('e2', '#fb923c', 'extern')}
<rect x="60" y="350" width="12" height="12" rx="2" fill="#3fe0c5"/><text x="80" y="361" font-size="13" class="mu">interne afzender</text>
<rect x="220" y="350" width="12" height="12" rx="2" fill="#fb923c"/><text x="240" y="361" font-size="13" class="mu">externe afzender</text>
</svg>`
};

/* 26 · Auto-labeling: ruis eruit in simulatie */
A.autolabel = {
  caption: 'In simulatie stroomt eerst alles door, ook de false positives. Pas als je die met gerichte instellingen hebt weggewerkt, zet je de policy aan.',
  css: `
.alb .t1{animation:alt 2.6s linear infinite}.alb .t2{animation:alt 2.6s linear infinite -1.3s}
.alb .fa{animation:alfa 12s linear infinite}.alb .fb{animation:alfa 12s linear infinite -1.6s}.alb .fc{animation:alfa 12s linear infinite -3.2s}
.alb .oa{animation:alo 12s linear infinite}.alb .ob{animation:alo 12s linear infinite -1.6s}
.alb .kn{animation:alkn 12s infinite}.alb .sim{animation:alsim 12s infinite}.alb .on{animation:alon 12s infinite}
@keyframes alt{0%{transform:translate(400px,40px);opacity:0}10%{opacity:1}55%{transform:translate(400px,230px)}100%{transform:translate(400px,330px);opacity:0}}
@keyframes alfa{0%{transform:translate(380px,40px);opacity:0}3%{opacity:1}20%{transform:translate(400px,230px)}30%{transform:translate(400px,330px);opacity:1}32%,100%{opacity:0;transform:translate(400px,330px)}}
@keyframes alo{0%,58%{opacity:0;transform:translate(420px,40px)}60%{opacity:1;transform:translate(420px,40px)}70%{transform:translate(430px,150px)}80%{transform:translate(560px,200px);opacity:1}88%,100%{transform:translate(600px,260px);opacity:0}}
@keyframes alkn{0%,46%{opacity:0}52%,96%{opacity:1}100%{opacity:0}}
@keyframes alsim{0%,52%{opacity:1}56%,100%{opacity:0}}
@keyframes alon{0%,72%{opacity:0}76%,96%{opacity:1}100%{opacity:0}}`,
  svg: `<svg class="alb" viewBox="0 0 800 400" role="img" aria-label="Een trechter laat eerst ook false positives door, na tuning worden die eruit gefilterd">
<path d="M290 60 L510 60 L430 220 L430 290 L370 290 L370 220 Z" fill="#111a2e" stroke="#3a4a63" stroke-width="2.5"/>
<text x="400" y="44" text-anchor="middle" font-size="15" class="mu">matches uit SharePoint en OneDrive</text>
<rect x="330" y="320" width="140" height="44" rx="8" fill="#111a2e" stroke="#3fe0c5" stroke-width="2"/>
<text x="400" y="348" text-anchor="middle" font-size="15" fill="#3fe0c5">gelabeld</text>
<circle class="t1" r="9" fill="#3fe0c5"/><circle class="t2" r="9" fill="#3fe0c5"/>
<circle class="fa" r="9" fill="#fb923c"/><circle class="fb" r="9" fill="#fb923c"/><circle class="fc" r="9" fill="#fb923c"/>
<circle class="oa" r="9" fill="#fb923c"/><circle class="ob" r="9" fill="#fb923c"/>
<g class="kn"><text x="60" y="120" font-size="15" fill="#fb923c">tuning</text>
<text x="60" y="150" font-size="15">nabijheid van keywords</text><text x="60" y="178" font-size="15">hogere confidence</text><text x="60" y="206" font-size="15">uitsluitingen</text></g>
<text class="sim" x="740" y="120" text-anchor="end" font-size="17" fill="#fb923c">Simulatie</text>
<text class="on" x="740" y="120" text-anchor="end" font-size="17" fill="#3fe0c5">Policy aan</text>
<text x="740" y="150" text-anchor="end" font-size="13" class="mu">oranje is een false positive</text>
</svg>`
};

/* 17 · Handmatig label overschrijven alleen bij lagere prioriteit */
const tag = (x, y, c, t, cls) => `<g class="${cls || ''}"><rect x="${x}" y="${y}" width="190" height="32" rx="16" fill="${c}"/><text x="${x + 95}" y="${y + 21}" text-anchor="middle" font-size="14" fill="#0b1120" font-weight="600">${t}</text></g>`;
A.labelprioriteit = {
  caption: 'Met overschrijven aan vervangt auto-labeling een handmatig label alleen als dat een lagere prioriteit heeft. Een hoger label blijft staan.',
  css: `
.lbp .scan{animation:lbs 10s ease-in-out infinite}
.lbp .old{animation:lbo 10s infinite}.lbp .new{animation:lbn 10s infinite}.lbp .keep{animation:lbk 10s infinite}
@keyframes lbs{0%{transform:translateY(0);opacity:0}5%{opacity:1}55%{transform:translateY(250px);opacity:1}60%,100%{transform:translateY(250px);opacity:0}}
@keyframes lbo{0%,24%{opacity:1}28%,94%{opacity:0}100%{opacity:1}}
@keyframes lbn{0%,24%{opacity:0}28%,94%{opacity:1}100%{opacity:0}}
@keyframes lbk{0%,50%{opacity:0}55%,94%{opacity:1}100%{opacity:0}}`,
  svg: `<svg class="lbp" viewBox="0 0 800 400" role="img" aria-label="Een lager handmatig label wordt overschreven, een hoger handmatig label blijft staan">
<text x="560" y="58" font-size="15" class="mu">prioriteit</text>
${tag(560, 74, '#f87171', 'Strikt vertrouwelijk')}${tag(560, 118, '#fb923c', 'Vertrouwelijk')}${tag(560, 162, '#60a5fa', 'Algemeen')}${tag(560, 206, '#94a3b8', 'Openbaar')}
<path d="M780 230 V84" stroke="#8e9bb2" stroke-width="2"/><path d="M774 92 L780 80 L786 92" fill="none" stroke="#8e9bb2" stroke-width="2"/>
<rect x="60" y="80" width="240" height="96" rx="10" fill="#111a2e" stroke="#22304a"/><text x="80" y="108" font-size="15">Offerte.docx</text><text x="80" y="128" class="mu" font-size="12">handmatig gelabeld</text>
${tag(80, 136, '#60a5fa', 'Algemeen', 'old')}${tag(80, 136, '#fb923c', 'Vertrouwelijk', 'new')}
<rect x="60" y="230" width="240" height="96" rx="10" fill="#111a2e" stroke="#22304a"/><text x="80" y="258" font-size="15">Fusiedossier.docx</text><text x="80" y="278" class="mu" font-size="12">handmatig gelabeld</text>
${tag(80, 286, '#f87171', 'Strikt vertrouwelijk')}
<g class="keep"><text x="320" y="308" font-size="14" fill="#f87171">hoger, blijft staan</text></g>
<g class="new"><text x="320" y="158" font-size="14" fill="#fb923c">lager, overschreven</text></g>
<g class="scan"><rect x="40" y="62" width="280" height="4" rx="2" fill="#3fe0c5"/><text x="330" y="70" font-size="13" fill="#3fe0c5">auto-labeling: Vertrouwelijk</text></g>
</svg>`
};

/* 20 · Extern blokkeren per domein */
const dom = (x, y, t, cls) => `<g class="${cls}"><rect x="${x - 82}" y="${y - 18}" width="164" height="36" rx="18" fill="#111a2e" stroke="#3a4a63" stroke-width="2"/><text x="${x}" y="${y + 5}" text-anchor="middle" class="m" font-size="13">${t}</text></g>`;
const DOMS = [[150, 80, 'partner.nl'], [150, 200, 'leverancier.com'], [150, 320, 'gemeente.nl'], [650, 120, 'adviseur.eu'], [650, 280, 'risico-domein.com']];
A.externblokkeren = {
  caption: 'Vroeger blokkeerde de DLP-actie alle externe toegang tegelijk. Nu blokkeer je één domein of gast en blijft de rest van je samenwerking werken.',
  css: `
.exb .ok{animation:exok 12s infinite}.exb .cut{animation:excut 12s infinite}.exb .bad{animation:exbad 12s infinite}
.exb .t1{animation:ext1 12s infinite}.exb .t2{animation:ext2 12s infinite}
@keyframes exok{0%,12%{stroke:#3fe0c5;stroke-dasharray:none}16%,44%{stroke:#f87171;stroke-dasharray:6 8}50%,100%{stroke:#3fe0c5;stroke-dasharray:none}}
@keyframes excut{0%,12%{stroke:#3fe0c5;stroke-dasharray:none}16%,44%{stroke:#f87171;stroke-dasharray:6 8}50%,62%{stroke:#3fe0c5;stroke-dasharray:none}66%,96%{stroke:#f87171;stroke-dasharray:6 8}100%{stroke:#3fe0c5}}
@keyframes exbad{0%,62%{opacity:0}66%,96%{opacity:1}100%{opacity:0}}
@keyframes ext1{0%,46%{opacity:1}50%,100%{opacity:0}}
@keyframes ext2{0%,46%{opacity:0}50%,96%{opacity:1}100%{opacity:0}}`,
  svg: `<svg class="exb" viewBox="0 0 800 400" role="img" aria-label="Eerst worden alle externe domeinen geblokkeerd, daarna alleen één risicovol domein">
${DOMS.map(([x, y], i) => `<line class="${i === 4 ? 'cut' : 'ok'}" x1="400" y1="200" x2="${x}" y2="${y}" stroke="#3fe0c5" stroke-width="3"/>`).join('')}
${DOMS.map(([x, y, t]) => dom(x, y, t, '')).join('')}
<rect x="335" y="160" width="130" height="80" rx="10" fill="#111a2e" stroke="#3fe0c5" stroke-width="2"/>
<text x="400" y="196" text-anchor="middle" font-size="15">Contract.docx</text><text x="400" y="218" text-anchor="middle" class="mu" font-size="12">SharePoint</text>
<g class="bad"><circle cx="560" cy="250" r="16" fill="#f87171"/><path d="M553 250 h14" stroke="#0b1120" stroke-width="3"/></g>
<text class="t1" x="400" y="380" text-anchor="middle" font-size="16" fill="#f87171">Vroeger: alle externe toegang dicht</text>
<text class="t2" x="400" y="380" text-anchor="middle" font-size="16" fill="#3fe0c5">Nu: alleen het domein met risico dicht</text>
</svg>`
};

/* 23 · Triage Agent ruimt op, met goedkeuring */
const tiles = () => { let s = ''; const hot = [3, 8, 12, 17, 21, 26, 30, 33, 38, 44]; for (let i = 0; i < 48; i++) { const x = 60 + (i % 12) * 40, y = 70 + Math.floor(i / 12) * 52; const h = hot.includes(i); s += `<g class="${h ? 'hot' : ''}" transform="translate(${x} ${y})"><rect width="30" height="40" rx="3" fill="#1d2a42" stroke="#3a4a63"/>${h ? '<rect class="mk" width="30" height="40" rx="3" fill="none" stroke-width="3"/><circle class="lk" cx="15" cy="20" r="7" fill="#3fe0c5"/>' : ''}</g>`; } return s; };
A.triage = {
  caption: 'De Triage Agent vindt gevoelige data in duizenden bestanden. Opschonen gebeurt pas na een menselijke goedkeuring.',
  css: `
.tri .sw{animation:trsw 12s linear infinite}
.tri .mk{animation:trmk 12s infinite}.tri .lk{transform-box:fill-box;transform-origin:center;animation:trlk 12s infinite}
.tri .ap{animation:trap 12s infinite}
@keyframes trsw{0%{transform:translateX(0);opacity:0}3%{opacity:1}30%{transform:translateX(480px);opacity:1}33%,100%{transform:translateX(480px);opacity:0}}
@keyframes trmk{0%,14%{stroke:transparent}20%,58%{stroke:#fb923c}62%,94%{stroke:#3fe0c5}100%{stroke:transparent}}
@keyframes trlk{0%,60%{opacity:0;transform:scale(.2)}66%,94%{opacity:1;transform:scale(1)}100%{opacity:0}}
@keyframes trap{0%,36%{opacity:0}42%,94%{opacity:1}100%{opacity:0}}`,
  svg: `<svg class="tri" viewBox="0 0 800 400" role="img" aria-label="Een agent markeert gevoelige bestanden, een mens keurt goed, daarna worden ze opgeschoond">
<text x="60" y="52" font-size="15" class="mu">SharePoint en OneDrive · Needs Attention</text>
${tiles()}
<rect class="sw" x="56" y="62" width="4" height="210" rx="2" fill="#fb923c"/>
<g class="ap"><rect x="590" y="110" width="170" height="120" rx="12" fill="#111a2e" stroke="#3fe0c5" stroke-width="2"/>
<circle cx="640" cy="160" r="16" fill="none" stroke="#e6edf7" stroke-width="2.5"/><path d="M618 200 q22 -24 44 0" fill="none" stroke="#e6edf7" stroke-width="2.5"/>
<path d="M690 160 l12 12 l22 -24" fill="none" stroke="#3fe0c5" stroke-width="4"/>
<text x="675" y="222" text-anchor="middle" font-size="14" fill="#3fe0c5">goedgekeurd</text></g>
<rect x="60" y="300" width="12" height="12" rx="2" fill="#fb923c"/><text x="80" y="311" font-size="13" class="mu">gevonden door de agent</text>
<rect x="260" y="300" width="12" height="12" rx="2" fill="#3fe0c5"/><text x="280" y="311" font-size="13" class="mu">opgeschoond na goedkeuring</text>
</svg>`
};

/* 24 · Alert aggregation */
const alertChip = (i) => `<g class="al a${i}"><rect x="-90" y="-15" width="180" height="30" rx="6" fill="#111a2e" stroke="#fb923c" stroke-width="2"/><text x="-76" y="5" font-size="13" class="m" fill="#fb923c">DLP</text><text x="-40" y="5" font-size="12" class="mu">regel ${i + 1} · gebruiker A</text></g>`;
A.aggregatie = {
  caption: 'Eén handeling die meerdere DLP-regels raakt, werd een stapel losse alerts. Met aggregation wordt het één alert per gebruiker.',
  css: `
${[0, 1, 2, 3, 4, 5].map(i => `.agg .a${i}{animation:agin${i} 10s infinite}
@keyframes agin${i}{0%,${4 + i * 5}%{transform:translate(860px,${80 + i * 42}px);opacity:0}${9 + i * 5}%,46%{transform:translate(260px,${80 + i * 42}px);opacity:1}58%,100%{transform:translate(560px,200px);opacity:0}}`).join('\n')}
.agg .one{transform-box:fill-box;transform-origin:center;animation:agone 10s infinite}
@keyframes agone{0%,54%{opacity:0;transform:scale(.6)}60%,94%{opacity:1;transform:scale(1)}100%{opacity:0}}`,
  svg: `<svg class="agg" viewBox="0 0 800 400" role="img" aria-label="Zes losse DLP-alerts van dezelfde gebruiker smelten samen tot één alert">
<text x="260" y="52" text-anchor="middle" font-size="15" class="mu">losse alerts</text>
${[0, 1, 2, 3, 4, 5].map(alertChip).join('')}
<g class="one"><rect x="460" y="140" width="290" height="120" rx="12" fill="#111a2e" stroke="#3fe0c5" stroke-width="2.5"/>
<text x="484" y="176" font-size="17" fill="#3fe0c5">1 alert</text><text x="484" y="204" font-size="15">gebruiker A</text><text x="484" y="230" font-size="13" class="mu m">6 events · 6 regels</text></g>
</svg>`
};

/* 27 · Adaptive Protection: risk level stuurt Conditional Access */
A.adaptive = {
  caption: 'Het insider risk level van een gebruiker is een conditie in Conditional Access. Een voorbeeldinrichting: bij Moderate sterkere authenticatie, bij Elevated blokkeren.',
  css: `
.adp .nd{transform-box:view-box;transform-origin:220px 280px;animation:adn 12s ease-in-out infinite}
.adp .s1{animation:ad1 12s infinite}.adp .s2{animation:ad2 12s infinite}.adp .s3{animation:ad3 12s infinite}
@keyframes adn{0%,20%{transform:rotate(-60deg)}30%,52%{transform:rotate(0deg)}62%,90%{transform:rotate(60deg)}100%{transform:rotate(-60deg)}}
@keyframes ad1{0%,24%{opacity:1}28%,96%{opacity:0}100%{opacity:1}}
@keyframes ad2{0%,26%{opacity:0}30%,56%{opacity:1}60%,100%{opacity:0}}
@keyframes ad3{0%,58%{opacity:0}62%,92%{opacity:1}96%,100%{opacity:0}}`,
  svg: `<svg class="adp" viewBox="0 0 800 400" role="img" aria-label="Een risicometer loopt op van Minor naar Elevated en Conditional Access wordt strenger">
<text x="220" y="70" text-anchor="middle" font-size="15" class="mu">Insider risk level</text>
<path d="M90 280 A130 130 0 0 1 155 167" fill="none" stroke="#3fe0c5" stroke-width="22"/>
<path d="M160 164 A130 130 0 0 1 280 164" fill="none" stroke="#fbbf24" stroke-width="22"/>
<path d="M285 167 A130 130 0 0 1 350 280" fill="none" stroke="#f87171" stroke-width="22"/>
<text x="92" y="320" text-anchor="middle" font-size="14">Minor</text><text x="220" y="125" text-anchor="middle" font-size="14">Moderate</text><text x="350" y="320" text-anchor="middle" font-size="14">Elevated</text>
<g class="nd"><path d="M216 280 L220 175 L224 280z" fill="#e6edf7"/></g><circle cx="220" cy="280" r="12" fill="#e6edf7"/>
<path d="M380 220 H450" stroke="#8e9bb2" stroke-width="2"/><path d="M442 214 L452 220 L442 226" fill="none" stroke="#8e9bb2" stroke-width="2"/>
<rect x="470" y="140" width="290" height="160" rx="12" fill="#111a2e" stroke="#22304a" stroke-width="2"/>
<text x="490" y="174" font-size="15" class="mu">Conditional Access</text>
<g class="s1"><text x="490" y="222" font-size="22" fill="#3fe0c5">Toegang</text><text x="490" y="250" font-size="13" class="mu">geen extra eisen</text></g>
<g class="s2"><text x="490" y="222" font-size="22" fill="#fbbf24">Sterkere authenticatie</text><text x="490" y="250" font-size="13" class="mu">authentication strength vereist</text></g>
<g class="s3"><text x="490" y="222" font-size="22" fill="#f87171">Geblokkeerd</text><text x="490" y="250" font-size="13" class="mu">toegang tot apps geweigerd</text></g>
</svg>`
};

export function PostAnimation({ name }) {
  const a = A[name];
  if (!a) return null;
  return (
    <figure className="ta">
      <div className="ta-frame" dangerouslySetInnerHTML={{ __html: `<style>${BASE}${a.css}</style>${a.svg}` }} />
      <figcaption>{a.caption}</figcaption>
    </figure>
  );
}

export const animationNames = Object.keys(A);
