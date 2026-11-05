// Vercel-functie voor de gratis check: GET /api/check?domain=voorbeeld.nl
'use strict';

const { normalizeDomain, runCheck } = require('./_lib/securecheck');

// Eenvoudige rate limit per IP-adres. Geldt per serverinstantie, dus is een rem en geen harde garantie.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function limited(ip) {
  const now = Date.now();
  for (const [k, v] of hits) if (now - v.start > WINDOW_MS) hits.delete(k);
  const h = hits.get(ip) || { start: now, n: 0 };
  h.n += 1;
  hits.set(ip, h);
  return h.n > MAX_PER_WINDOW;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'GET') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Alleen GET is toegestaan.' }));
  }
  const ip = String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'onbekend').split(',')[0].trim();
  if (limited(ip)) {
    res.statusCode = 429;
    return res.end(JSON.stringify({ error: 'U heeft het maximale aantal checks bereikt. Probeer het over 10 minuten opnieuw.' }));
  }
  const url = new URL(req.url, 'http://localhost');
  const domain = normalizeDomain(url.searchParams.get('domain') || '');
  if (!domain) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'Vul een geldige domeinnaam in, bijvoorbeeld uwbedrijf.nl.' }));
  }
  try {
    const result = await runCheck(domain);
    res.statusCode = 200;
    return res.end(JSON.stringify(result));
  } catch (e) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'De check kon niet worden uitgevoerd. Probeer het later opnieuw.' }));
  }
};
