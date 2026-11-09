/* Sign-in risk en user risk: geanimeerde uitleg. Taal volgt <html lang>. Geen inline script, zodat het binnen de CSP van techwes.nl werkt. */
(function () {
  var NL = document.documentElement.lang === 'nl';
  var T = NL ? {
    pause: '❚❚ Pauze', play: '▶ Afspelen', on: 'Policy aan', off: 'Policy uit',
    risk: 'Risico: ', lv: { none: 'geen', low: 'laag', medium: 'gemiddeld', high: 'hoog' },
    signin: 'Aanmelding', attempt: 'Aanmeldpoging', as: 'als eva@contoso', account: 'Account',
    ca: 'CA policy', noca: 'Geen risk policy', step: 'Stap ',
    offLines: ['risico wordt berekend,', 'maar niets grijpt', 'in.'],
    siLines: ['<tspan class="k">IF</tspan> sign-in risk ≥ Med', '<tspan class="k">GRANT</tspan> auth strength', '<tspan class="k">SESSION</tspan> SIF every time'],
    urLines: ['<tspan class="k">IF</tspan> user risk = High', '<tspan class="k">GRANT</tspan> risk remediation', '<tspan class="k">SESSION</tspan> SIF every time'],
    siChips: ['Anoniem IP-adres', 'Onbekende aanmeldeigenschappen', 'Kwaadaardig IP-adres'],
    urChips: ['Gelekte credentials', 'Password spray', 'Threat intelligence'],
    o: { mfa: 'MFA vereist', blocked: 'Geblokkeerd: geen token', granted: 'Toegang verleend', remed: 'Remediatie vereist', done: 'Risico geremedieerd' },
    si: [
      'Een aanvaller heeft het wachtwoord van <b>Eva</b> buitgemaakt met een phishingkit en meldt zich aan vanaf een anonieme VPN. Gebruikersnaam en wachtwoord kloppen.',
      '<b>ID Protection</b> beoordeelt deze aanmelding in realtime, op basis van signalen over waar en hoe hij plaatsvindt.',
      'Sign-in risk: <b>hoog</b>. Deze score hoort bij <b>deze ene aanmelding</b>, los van het account van Eva.',
      'Het risiconiveau gaat naar <b>Conditional Access</b>, dat het toetst aan de voorwaarden van de policy.',
      'De policy matcht. Het wachtwoord alleen is niet meer genoeg: de gebruiker moet zich <b>bewijzen met sterke MFA</b>, elke keer opnieuw.',
      'De aanvaller komt niet door de MFA. <b>Geen token, geen mailbox, geen data.</b> Was het echt Eva op vakantie geweest, dan doet zij MFA en wordt de riskante aanmelding automatisch geremedieerd. Geen ticket voor het SOC.',
      'Er matcht geen risk policy. Het risico is gedetecteerd, maar <b>niets grijpt in</b> op het moment dat het ertoe doet.',
      'Er wordt een token uitgegeven. De aanvaller leest mail, maakt een inboxregel aan en gaat verder. De detectie verschijnt pas <b>later in een rapport</b>.'
    ],
    ur: [
      'In een paar dagen stapelen signalen over <b>het account van Eva</b> zich op, los van één specifieke aanmelding.',
      'Gelekte credentials, een password spray en threat intelligence. <b>User risk</b> telt dat op tot één oordeel over de identiteit.',
      'User risk: <b>hoog</b>. Microsoft beschouwt dit account als waarschijnlijk gecompromitteerd, ongeacht wie het gebruikt.',
      'Bij de <b>volgende aanmelding</b>, vanaf elke locatie en elk apparaat, kijkt Conditional Access naar het risiconiveau van de gebruiker.',
      '<b>Require risk remediation</b>: gebruikers met een wachtwoord doen een veilige wachtwoordwijziging, passwordless gebruikers melden zich opnieuw aan. <b>Alle bestaande sessies worden ingetrokken.</b>',
      'Het risico zakt naar geen. Het gelekte wachtwoord en eventuele gestolen tokens werken <b>allebei niet meer</b>, zonder dat een beheerder iets hoefde te doen.',
      'Er matcht geen risk policy. Het account blijft op <b>hoog</b> staan en werkt gewoon door.',
      'Voor Eva <b>en voor iedereen met het gelekte wachtwoord</b>. Refresh tokens blijven geldig tot iemand de melding ziet en het account handmatig reset.'
    ]
  } : {
    pause: '❚❚ Pause', play: '▶ Play', on: 'Policy ON', off: 'Policy OFF',
    risk: 'Risk: ', lv: { none: 'none', low: 'low', medium: 'medium', high: 'high' },
    signin: 'Sign-in', attempt: 'Sign-in attempt', as: 'as eva@contoso', account: 'Account',
    ca: 'CA policy', noca: 'No risk policy', step: 'Step ',
    offLines: ['risk is scored,', 'but nothing acts', 'on it.'],
    siLines: ['<tspan class="k">IF</tspan> sign-in risk ≥ Med', '<tspan class="k">GRANT</tspan> auth strength', '<tspan class="k">SESSION</tspan> SIF every time'],
    urLines: ['<tspan class="k">IF</tspan> user risk = High', '<tspan class="k">GRANT</tspan> risk remediation', '<tspan class="k">SESSION</tspan> SIF every time'],
    siChips: ['Anonymous IP address', 'Unfamiliar sign-in properties', 'Malicious IP address'],
    urChips: ['Leaked credentials', 'Password spray', 'Threat intelligence'],
    o: { mfa: 'MFA challenge', blocked: 'Blocked: no token issued', granted: 'Access granted', remed: 'Remediation required', done: 'Risk remediated' },
    si: [
      'An attacker phished <b>Eva’s password</b> and signs in from an anonymous VPN. Username and password: correct.',
      '<b>ID Protection</b> scores this sign-in in real time, using signals about where and how it happens.',
      'Sign-in risk: <b>high</b>. The score belongs to <b>this one authentication</b>, not to Eva’s account.',
      'The risk level is handed to <b>Conditional Access</b>, which evaluates it against the policy conditions.',
      'Policy match. The password alone is no longer enough: the user must <b>prove it with strong MFA</b>, every time.',
      'The attacker can’t complete MFA. <b>No token, no mailbox, no data.</b> Had it really been Eva on holiday, she’d pass MFA and the risky sign-in would remediate itself. No ticket for the SOC.',
      'No risk policy matches. The risk was detected, but <b>nothing acts on it</b> at the moment it matters.',
      'Token issued. The attacker reads mail, adds an inbox rule and moves on. The detection only shows up <b>in a report, later</b>.'
    ],
    ur: [
      'Over a few days, signals about <b>Eva’s account</b> pile up, independent of any single sign-in.',
      'Leaked credentials, a password spray, threat intelligence. <b>User risk</b> aggregates all of it into one verdict on the identity.',
      'User risk: <b>high</b>. Microsoft considers this account likely compromised, no matter who is using it.',
      'At the <b>next sign-in</b>, from any location or device, Conditional Access checks the user’s risk level.',
      '<b>Require risk remediation</b>: password users do a secure password change, passwordless users reauthenticate. <b>All existing sessions are revoked.</b>',
      'Risk drops to none. The leaked password and any stolen tokens <b>both stop working</b>, and no admin had to touch it.',
      'No risk policy matches. The account stays <b>high risk</b> and keeps working as normal.',
      'For Eva <b>and for whoever holds the leaked password</b>. Refresh tokens stay valid until someone notices the alert and resets the account manually.'
    ]
  };

  var $ = function (id) { return document.getElementById(id); };
  var svg = $('svg'), NS = 'http://www.w3.org/2000/svg';
  var X = { actor: 90, idp: 330, ca: 570, wall: 676, app: 810 };
  var scene = 'signin', policy = true, idx = 0, playing = true, timer = null, pend = [], INSTANT = false;

  function later(fn, ms) { if (INSTANT) { fn(); return; } pend.push(setTimeout(fn, ms)); }
  function clearPend() { pend.forEach(clearTimeout); pend = []; clearTimeout(timer); }
  function node(id, st) { var e = $(id); e.classList.remove('active', 'bad', 'good', 'warn'); if (st) e.classList.add(st); }
  function packet(x, st) { var p = $('packet'); p.style.transform = 'translate(' + x + 'px,170px)'; p.setAttribute('class', st || ''); }
  var LV = { none: -90, low: -60, medium: 0, high: 62 };
  function gauge(l) {
    $('needle').style.transform = 'rotate(' + LV[l] + 'deg)';
    var g = $('glbl'); g.textContent = T.risk + T.lv[l];
    g.style.fill = l === 'high' ? 'var(--red)' : l === 'medium' ? 'var(--amber)' : l === 'low' ? 'var(--green)' : 'var(--mut)';
  }
  function chip(text, i) {
    var o = document.createElementNS(NS, 'g'); o.setAttribute('transform', 'translate(330,' + (18 + i * 28) + ')');
    var g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'chip'); o.appendChild(g);
    var w = Math.max(150, text.length * 7.4 + 24);
    var r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', -w / 2); r.setAttribute('y', 0); r.setAttribute('width', w); r.setAttribute('height', 22); r.setAttribute('rx', 6);
    var t = document.createElementNS(NS, 'text'); t.setAttribute('y', 15); t.textContent = text;
    g.appendChild(r); g.appendChild(t); $('chips').appendChild(o);
    if (INSTANT) g.classList.add('in');
    else requestAnimationFrame(function () { requestAnimationFrame(function () { g.classList.add('in'); }); });
  }
  function outcome(t, st) { var o = $('outcome'); if (!t) { o.setAttribute('class', ''); return; } $('otext').textContent = t; o.setAttribute('class', 'in ' + st); }
  function pcard(hot) {
    $('pcard').setAttribute('class', 'pcard' + (hot ? ' hot' : '') + (policy ? '' : ' off'));
    $('pt').textContent = policy ? T.ca : T.noca;
    var L = !policy ? T.offLines : scene === 'signin' ? T.siLines : T.urLines;
    ['p1', 'p2', 'p3'].forEach(function (id, i) { $(id).innerHTML = L[i] || ''; });
  }

  function reset() {
    clearPend();
    ['nActor', 'nIdp', 'nCa', 'nApp'].forEach(function (n) { node(n); });
    $('chips').innerHTML = ''; packet(X.actor); gauge('none'); outcome(''); $('wall').setAttribute('class', 'wall');
    pcard(false);
    $('actorLbl').textContent = scene === 'signin' ? T.signin : T.account;
    $('actorSub').textContent = 'eva@contoso';
  }

  function steps() {
    var c;
    if (scene === 'signin') {
      c = T.si;
      var s = [
        { d: 3200, c: c[0], r: function () { node('nActor', 'bad'); packet(X.actor, 'bad'); $('actorLbl').textContent = T.attempt; $('actorSub').textContent = T.as; } },
        { d: 3800, c: c[1], r: function () { packet(X.idp, 'bad'); node('nIdp', 'active'); T.siChips.forEach(function (t, i) { later(function () { chip(t, i); }, 500 + i * 600); }); } },
        { d: 2800, c: c[2], r: function () { gauge('high'); } },
        { d: 3000, c: c[3], r: function () { packet(X.ca, 'bad'); node('nIdp'); node('nCa', 'active'); pcard(true); } }
      ];
      if (policy) s.push(
        { d: 3400, c: c[4], r: function () { node('nCa', 'warn'); $('wall').setAttribute('class', 'wall in'); packet(X.wall - 14, 'bad'); outcome(T.o.mfa, 'warn'); } },
        { d: 6500, c: c[5], r: function () { packet(X.actor, 'bad'); node('nCa', 'good'); node('nApp', 'good'); outcome(T.o.blocked, 'good'); } }
      ); else s.push(
        { d: 3200, c: c[6], r: function () { node('nCa'); packet(X.app, 'bad'); } },
        { d: 6000, c: c[7], r: function () { node('nApp', 'bad'); outcome(T.o.granted, 'bad'); } }
      );
      return s;
    }
    c = T.ur;
    var u = [
      { d: 3000, c: c[0], r: function () { node('nActor', 'active'); } },
      { d: 5200, c: c[1], r: function () { node('nIdp', 'active'); var G = ['low', 'medium', 'high']; T.urChips.forEach(function (t, i) { later(function () { chip(t, i); gauge(G[i]); }, 400 + i * 1200); }); } },
      { d: 2800, c: c[2], r: function () { gauge('high'); node('nActor', 'bad'); } },
      { d: 3200, c: c[3], r: function () { packet(X.ca, 'bad'); node('nIdp'); node('nCa', 'active'); pcard(true); } }
    ];
    if (policy) u.push(
      { d: 4800, c: c[4], r: function () { node('nCa', 'warn'); outcome(T.o.remed, 'warn'); packet(X.actor, 'warn'); } },
      { d: 6000, c: c[5], r: function () { gauge('none'); node('nActor', 'good'); node('nCa', 'good'); node('nApp', 'good'); document.querySelectorAll('.chip').forEach(function (e) { e.classList.add('cleared'); }); outcome(T.o.done, 'good'); packet(X.app, 'good'); } }
    ); else u.push(
      { d: 3200, c: c[6], r: function () { node('nCa'); packet(X.app, 'bad'); node('nApp', 'bad'); outcome(T.o.granted, 'bad'); } },
      { d: 6000, c: c[7], r: function () {} }
    );
    return u;
  }

  function show(i, S) {
    $('stepno').textContent = (i + 1) + ' / ' + S.length; $('cap').innerHTML = S[i].c;
    var d = $('dots'); d.innerHTML = '';
    S.forEach(function (_, j) {
      var b = document.createElement('button');
      b.className = j < i ? 'done' : j === i ? 'cur' : '';
      b.title = T.step + (j + 1); b.setAttribute('aria-label', T.step + (j + 1));
      b.addEventListener('click', function () { jump(j); });
      d.appendChild(b);
    });
  }
  function run(i) {
    var S = steps(); idx = i;
    if (i >= S.length) { reset(); return run(0); }
    S[i].r(); show(i, S);
    if (playing) timer = setTimeout(function () { run(i + 1); }, S[i].d);
  }
  function jump(i) {
    reset(); var S = steps(); INSTANT = true; svg.classList.add('instant');
    for (var j = 0; j < i; j++) S[j].r();
    INSTANT = false; svg.getBoundingClientRect();
    requestAnimationFrame(function () { svg.classList.remove('instant'); run(i); });
  }
  function restart() { reset(); setTimeout(function () { run(0); }, 350); }

  document.querySelectorAll('.seg button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.seg button').forEach(function (x) { x.classList.toggle('on', x === b); });
      scene = b.dataset.scene; restart();
    });
  });
  $('pol').addEventListener('change', function (e) { policy = e.target.checked; $('polLabel').textContent = policy ? T.on : T.off; restart(); });
  $('play').addEventListener('click', function () {
    playing = !playing; $('play').textContent = playing ? T.pause : T.play;
    if (playing) timer = setTimeout(function () { run(idx + 1); }, 900); else clearTimeout(timer);
  });
  $('replay').addEventListener('click', function () { if (!playing) { playing = true; $('play').textContent = T.pause; } restart(); });
  $('polLabel').textContent = T.on; $('play').textContent = T.pause;
  restart();
})();
