// Passieve securitycheck voor de gratis check op techwes.nl.
// Alleen openbare informatie: DNS-records, het TLS-certificaat en de headers van de homepage.
// Geen poortscans, geen kwetsbaarheidsscans, geen inlogpogingen.
'use strict';

const dns = require('dns').promises;
const net = require('net');
const http = require('http');
const https = require('https');

const TIMEOUT_MS = 4000;
const UA = 'techwes-gratis-check/1.0 (+https://techwes.nl/gratis-check)';
const DKIM_SELECTORS = ['selector1', 'selector2', 'google', 'default', 'k1', 's1', 's2', 'mail', 'dkim'];

// ---------- invoer ----------

function normalizeDomain(input) {
  if (typeof input !== 'string') return null;
  let d = input.trim().toLowerCase();
  if (d.length === 0 || d.length > 300) return null;
  d = d.replace(/^[a-z]+:\/\//, '');      // protocol
  d = d.split(/[/?#]/)[0];                 // pad, query, fragment
  if (d.includes('@')) return null;        // geen gebruikersnaam/e-mailadres
  if (d.includes(':')) return null;        // geen poort of IPv6
  d = d.replace(/^www\./, '').replace(/\.$/, '');
  if (d.length > 253 || net.isIP(d)) return null;
  const labels = d.split('.');
  if (labels.length < 2) return null;
  const labelOk = (l) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(l);
  if (!labels.every(labelOk)) return null;
  if (!/^(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/.test(labels[labels.length - 1])) return null;
  return d;
}

// ---------- SSRF-bescherming: alleen publieke IPv4-adressen ----------

function ipv4ToInt(ip) {
  return ip.split('.').reduce((acc, o) => (acc << 8) + Number(o), 0) >>> 0;
}

const PRIVATE_V4 = [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8],
  ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24],
  ['192.88.99.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15], ['198.51.100.0', 24],
  ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4],
].map(([base, bits]) => [ipv4ToInt(base), bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0]);

function isPublicIPv4(ip) {
  if (net.isIPv4(ip) !== true) return false;
  const n = ipv4ToInt(ip);
  return !PRIVATE_V4.some(([base, mask]) => ((n & mask) >>> 0) === ((base & mask) >>> 0));
}

// ---------- DNS-hulpjes ----------

function withTimeout(promise, ms = TIMEOUT_MS) {
  return Promise.race([promise, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
}

async function txt(name) {
  try {
    const recs = await withTimeout(dns.resolveTxt(name));
    return recs.map((parts) => parts.join(''));
  } catch (e) {
    if (e.code === 'ENODATA' || e.code === 'ENOTFOUND') return [];
    throw e;
  }
}

async function safe(fn, fallback) {
  try { return await fn(); } catch (e) { return fallback; }
}

// ---------- scoring (puur, testbaar) ----------

const G = 'groen', O = 'oranje', R = 'rood';

function scoreSpf(records, hasMx) {
  const spf = records.filter((r) => /^v=spf1(\s|$)/i.test(r));
  const t = 'SPF (wie mag mailen namens uw domein)';
  if (spf.length === 0) {
    return { id: 'spf', title: t, status: R,
      summary: 'Er is geen SPF-record. Iedereen kan e-mail versturen die van uw domein lijkt te komen.',
      fix: hasMx ? 'Laat uw e-mailprovider een SPF-record instellen, bijvoorbeeld "v=spf1 include:spf.protection.outlook.com -all" voor Microsoft 365.'
        : 'Verstuurt u geen e-mail vanaf dit domein? Zet dan "v=spf1 -all", zodat niemand het kan misbruiken.' };
  }
  if (spf.length > 1) {
    return { id: 'spf', title: t, status: R,
      summary: 'Er staan meerdere SPF-records. Dan negeren ontvangers ze allemaal.',
      fix: 'Voeg de records samen tot één SPF-record.' };
  }
  const rec = spf[0];
  const lookups = (rec.match(/\b(include:|a(:|\s|$)|mx(:|\s|$)|ptr|exists:|redirect=)/gi) || []).length;
  if (/\+all\b/i.test(rec)) {
    return { id: 'spf', title: t, status: R, summary: 'Het SPF-record eindigt op "+all": iedereen mag mailen namens uw domein.', fix: 'Vervang "+all" door "-all" of "~all".' };
  }
  if (lookups > 10) {
    return { id: 'spf', title: t, status: O, summary: `Het SPF-record lijkt meer dan 10 DNS-verwijzingen te bevatten (${lookups}). Boven de 10 wordt het als ongeldig behandeld.`, fix: 'Vereenvoudig het record of gebruik minder includes.' };
  }
  if (/-all\b/i.test(rec)) return { id: 'spf', title: t, status: G, summary: 'SPF is goed ingesteld en blokkeert onbekende afzenders ("-all").', fix: null };
  if (/~all\b/i.test(rec)) return { id: 'spf', title: t, status: G, summary: 'SPF is ingesteld ("~all"). Onbekende afzenders worden als verdacht gemarkeerd.', fix: 'Overweeg "-all" zodra alle legitieme afzenders in het record staan.' };
  return { id: 'spf', title: t, status: O, summary: 'Er is een SPF-record, maar het blokkeert onbekende afzenders niet ("?all" of geen "all").', fix: 'Sluit het record af met "~all" of "-all".' };
}

function scoreDmarc(records) {
  const t = 'DMARC (bescherming tegen nagemaakte e-mail)';
  const dm = records.filter((r) => /^v=DMARC1/i.test(r));
  if (dm.length === 0) {
    return { id: 'dmarc', title: t, status: R,
      summary: 'Er is geen DMARC-beleid. Criminelen kunnen e-mail versturen die precies van u lijkt te komen, bijvoorbeeld valse facturen.',
      fix: 'Begin met "v=DMARC1; p=none; rua=mailto:dmarc@uwdomein.nl", kijk een paar weken mee, en ga dan naar "p=quarantine" of "p=reject".' };
  }
  const p = ((dm[0].match(/\bp=([a-z]+)/i) || [])[1] || '').toLowerCase();
  const rua = /\brua=/i.test(dm[0]);
  if (p === 'reject' || p === 'quarantine') {
    return { id: 'dmarc', title: t, status: G,
      summary: `DMARC staat op "${p}": nagemaakte e-mail wordt ${p === 'reject' ? 'geweigerd' : 'in quarantaine gezet'}.`,
      fix: rua ? null : 'Voeg een rapportadres toe (rua=), zodat u ziet wie namens u probeert te mailen.' };
  }
  return { id: 'dmarc', title: t, status: O,
    summary: 'DMARC staat op "none": u kijkt alleen mee, nagemaakte e-mail wordt nog niet tegengehouden.',
    fix: 'Controleer de rapporten en zet het beleid daarna op "p=quarantine" of "p=reject".' };
}

function scoreDkim(found, hasMx) {
  const t = 'DKIM (digitale handtekening op uw e-mail)';
  if (found.length > 0) return { id: 'dkim', title: t, status: G, summary: `DKIM gevonden (selector: ${found.join(', ')}).`, fix: null };
  return { id: 'dkim', title: t, status: hasMx ? O : G,
    summary: hasMx ? 'Met de gangbare namen is geen DKIM-sleutel gevonden. Mogelijk gebruikt uw provider een andere naam, of ontbreekt DKIM.' : 'Dit domein ontvangt geen e-mail; DKIM is niet van toepassing.',
    fix: hasMx ? 'Vraag uw e-mailprovider of DKIM-ondertekening aan staat.' : null };
}

function scoreTls(tls) {
  const t = 'Beveiligde verbinding (https-certificaat)';
  if (!tls || tls.error) {
    return { id: 'tls', title: t, status: R, summary: 'De website is niet bereikbaar via een beveiligde verbinding (https).', fix: 'Laat uw webbouwer of hoster een (gratis) certificaat instellen, bijvoorbeeld via Let\'s Encrypt.' };
  }
  if (!tls.valid) {
    return { id: 'tls', title: t, status: R, summary: `Het certificaat wordt niet vertrouwd (${tls.reason || 'ongeldig'}). Bezoekers krijgen een waarschuwing.`, fix: 'Vervang het certificaat door een geldig certificaat voor dit domein.' };
  }
  const d = tls.daysLeft;
  if (d < 14) return { id: 'tls', title: t, status: R, summary: `Het certificaat verloopt over ${d} dagen.`, fix: 'Vernieuw het certificaat nu, of zet automatisch vernieuwen aan.' };
  if (d < 30) return { id: 'tls', title: t, status: O, summary: `Het certificaat verloopt over ${d} dagen.`, fix: 'Controleer of automatisch vernieuwen aan staat.' };
  return { id: 'tls', title: t, status: G, summary: `Geldig certificaat van ${tls.issuer || 'een erkende uitgever'}, nog ${d} dagen geldig.`, fix: null };
}

function scoreRedirect(httpRes) {
  const t = 'Doorsturen naar https';
  if (!httpRes || httpRes.error) return { id: 'redirect', title: t, status: O, summary: 'De onbeveiligde versie (http) van de website kon niet worden gecontroleerd.', fix: null };
  const ok = [301, 302, 307, 308].includes(httpRes.status) && /^https:\/\//i.test(httpRes.location || '');
  return ok
    ? { id: 'redirect', title: t, status: G, summary: 'Bezoekers op http worden automatisch naar de beveiligde versie gestuurd.', fix: null }
    : { id: 'redirect', title: t, status: O, summary: 'De onbeveiligde versie (http) stuurt niet door naar https.', fix: 'Stel een permanente doorverwijzing (301) in van http naar https.' };
}

function scoreHeaders(headers) {
  const t = 'Beveiligingsinstellingen van de website';
  if (!headers) return { id: 'headers', title: t, status: O, summary: 'De website kon niet worden opgehaald om de instellingen te controleren.', fix: null };
  const h = (k) => headers[k] || '';
  const maxAge = Number((h('strict-transport-security').match(/max-age=(\d+)/i) || [])[1] || 0);
  const checks = [
    ['HSTS', maxAge >= 15552000],
    ['clickjacking-bescherming', /deny|sameorigin/i.test(h('x-frame-options')) || /frame-ancestors/i.test(h('content-security-policy'))],
    ['X-Content-Type-Options', /nosniff/i.test(h('x-content-type-options'))],
    ['Referrer-Policy', h('referrer-policy') !== ''],
  ];
  const missing = checks.filter(([, ok]) => !ok).map(([n]) => n);
  if (missing.length === 0) return { id: 'headers', title: t, status: G, summary: 'Alle belangrijke beveiligingsinstellingen zijn aanwezig.', fix: null };
  return { id: 'headers', title: t, status: missing.length >= 3 ? R : O,
    summary: `${checks.length - missing.length} van ${checks.length} belangrijke instellingen aanwezig. Ontbreekt: ${missing.join(', ')}.`,
    fix: 'Uw webbouwer kan deze instellingen (security headers) meestal in een paar minuten toevoegen.' };
}

function scoreCaa(caa) {
  const t = 'Wie mag certificaten uitgeven (CAA)';
  return caa.length > 0
    ? { id: 'caa', title: t, status: G, summary: 'Er is vastgelegd welke partijen certificaten voor uw domein mogen uitgeven.', fix: null }
    : { id: 'caa', title: t, status: O, summary: 'Niet vastgelegd welke partijen certificaten mogen uitgeven. Een kleine, maar nuttige verbetering.', fix: 'Voeg een CAA-record toe voor uw certificaatleverancier, bijvoorbeeld letsencrypt.org.' };
}

function overall(checks) {
  if (checks.some((c) => c.status === R)) return R;
  if (checks.some((c) => c.status === O)) return O;
  return G;
}

// ---------- netwerk (alleen naar gecontroleerde publieke IP's) ----------

function fetchHttps(ip, domain) {
  return new Promise((resolve) => {
    const req = https.request({ host: ip, port: 443, servername: domain, path: '/', method: 'GET',
      headers: { Host: domain, 'User-Agent': UA }, rejectUnauthorized: false, timeout: TIMEOUT_MS }, (res) => {
      const s = res.socket;
      const cert = s.getPeerCertificate ? s.getPeerCertificate() : {};
      const validTo = cert && cert.valid_to ? new Date(cert.valid_to) : null;
      const out = {
        tls: {
          valid: s.authorized === true,
          reason: s.authorizationError ? String(s.authorizationError) : null,
          daysLeft: validTo ? Math.floor((validTo - Date.now()) / 86400000) : null,
          issuer: cert && cert.issuer ? (cert.issuer.O || cert.issuer.CN || null) : null,
        },
        headers: res.headers,
      };
      res.resume();
      res.destroy();
      resolve(out);
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', (e) => resolve({ tls: { error: e.code || e.message }, headers: null }));
    req.end();
  });
}

function fetchHttp(ip, domain) {
  return new Promise((resolve) => {
    const req = http.request({ host: ip, port: 80, path: '/', method: 'GET',
      headers: { Host: domain, 'User-Agent': UA }, timeout: TIMEOUT_MS }, (res) => {
      const out = { status: res.statusCode, location: res.headers.location || null };
      res.resume();
      res.destroy();
      resolve(out);
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', (e) => resolve({ error: e.code || e.message }));
    req.end();
  });
}

// ---------- hoofdfunctie ----------

async function runCheck(domain) {
  const [mx, rootTxt, dmarcTxt, caa, a4] = await Promise.all([
    safe(() => withTimeout(dns.resolveMx(domain)), []),
    safe(() => txt(domain), []),
    safe(() => txt('_dmarc.' + domain), []),
    safe(() => withTimeout(dns.resolveCaa(domain)), []),
    safe(() => withTimeout(dns.resolve4(domain)), []),
  ]);
  const wwwA = a4.length ? [] : await safe(() => withTimeout(dns.resolve4('www.' + domain)), []);
  const hasMx = mx.length > 0;

  const dkimFound = [];
  await Promise.all(DKIM_SELECTORS.map(async (sel) => {
    const recs = await safe(() => txt(`${sel}._domainkey.${domain}`), []);
    const cname = recs.length ? [] : await safe(() => withTimeout(dns.resolveCname(`${sel}._domainkey.${domain}`)), []);
    if (recs.some((r) => /v=DKIM1|p=/i.test(r)) || cname.length) dkimFound.push(sel);
  }));

  const host = a4.length ? domain : (wwwA.length ? 'www.' + domain : domain);
  const ips = (a4.length ? a4 : wwwA);
  const ip = ips.find(isPublicIPv4);

  let web = null, httpRes = null, note = null;
  if (ips.length === 0) note = 'Dit domein heeft geen website (geen IPv4-adres gevonden).';
  else if (!ip) note = 'Dit domein verwijst niet naar een openbaar adres; de website is niet gecontroleerd.';
  else [web, httpRes] = await Promise.all([fetchHttps(ip, host), fetchHttp(ip, host)]);

  const checks = [
    scoreDmarc(dmarcTxt),
    scoreSpf(rootTxt, hasMx),
    scoreDkim(dkimFound.sort(), hasMx),
  ];
  if (ip) checks.push(scoreTls(web && web.tls), scoreRedirect(httpRes), scoreHeaders(web && web.headers));
  checks.push(scoreCaa(caa));

  return { domain, checkedAt: new Date().toISOString(), overall: overall(checks), note,
    email: hasMx ? 'Dit domein ontvangt e-mail.' : 'Dit domein ontvangt geen e-mail (geen MX-record).', checks };
}

module.exports = { normalizeDomain, isPublicIPv4, scoreSpf, scoreDmarc, scoreDkim, scoreTls, scoreRedirect, scoreHeaders, scoreCaa, overall, runCheck };
