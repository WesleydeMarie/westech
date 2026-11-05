// Draaien met: node --test api/_lib/securecheck.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert');
const s = require('./securecheck');

test('normalizeDomain accepteert gewone invoer', () => {
  assert.strictEqual(s.normalizeDomain('https://www.Techwes.nl/blog?x=1'), 'techwes.nl');
  assert.strictEqual(s.normalizeDomain(' bedrijf.co.uk. '), 'bedrijf.co.uk');
  assert.strictEqual(s.normalizeDomain('xn--bcher-kva.example'), 'xn--bcher-kva.example');
});

test('normalizeDomain weigert IP-adressen, poorten en rommel', () => {
  for (const bad of ['127.0.0.1', 'http://10.0.0.1/', 'localhost', 'evil.nl:8080', 'user@evil.nl', '[::1]', 'a..nl', '-a.nl', 'nl', '', 'a.123']) {
    assert.strictEqual(s.normalizeDomain(bad), null, bad);
  }
});

test('isPublicIPv4 blokkeert interne en bijzondere reeksen', () => {
  for (const ip of ['127.0.0.1', '10.1.2.3', '192.168.50.1', '172.16.0.1', '172.31.255.255', '169.254.169.254', '100.64.0.1', '0.0.0.0', '224.0.0.1', '255.255.255.255']) {
    assert.strictEqual(s.isPublicIPv4(ip), false, ip);
  }
  for (const ip of ['1.1.1.1', '8.8.8.8', '172.32.0.1', '76.76.21.21']) assert.strictEqual(s.isPublicIPv4(ip), true, ip);
  assert.strictEqual(s.isPublicIPv4('::1'), false);
});

test('SPF-scoring', () => {
  assert.strictEqual(s.scoreSpf([], true).status, 'rood');
  assert.strictEqual(s.scoreSpf(['v=spf1 -all', 'v=spf1 ~all'], true).status, 'rood');
  assert.strictEqual(s.scoreSpf(['v=spf1 +all'], true).status, 'rood');
  assert.strictEqual(s.scoreSpf(['v=spf1 include:x ?all'], true).status, 'oranje');
  assert.strictEqual(s.scoreSpf(['v=spf1 include:x ~all'], true).status, 'groen');
  assert.strictEqual(s.scoreSpf(['v=spf1 include:x -all'], true).status, 'groen');
  const many = 'v=spf1 ' + Array.from({ length: 11 }, (_, i) => `include:i${i}.nl`).join(' ') + ' -all';
  assert.strictEqual(s.scoreSpf([many], true).status, 'oranje');
});

test('DMARC-scoring', () => {
  assert.strictEqual(s.scoreDmarc([]).status, 'rood');
  assert.strictEqual(s.scoreDmarc(['v=DMARC1; p=none; rua=mailto:a@b.nl']).status, 'oranje');
  assert.strictEqual(s.scoreDmarc(['v=DMARC1; p=quarantine']).status, 'groen');
  assert.strictEqual(s.scoreDmarc(['v=DMARC1; p=reject; rua=mailto:a@b.nl']).fix, null);
});

test('TLS-scoring', () => {
  assert.strictEqual(s.scoreTls({ error: 'ECONNREFUSED' }).status, 'rood');
  assert.strictEqual(s.scoreTls({ valid: false, reason: 'CERT_HAS_EXPIRED' }).status, 'rood');
  assert.strictEqual(s.scoreTls({ valid: true, daysLeft: 5 }).status, 'rood');
  assert.strictEqual(s.scoreTls({ valid: true, daysLeft: 20 }).status, 'oranje');
  assert.strictEqual(s.scoreTls({ valid: true, daysLeft: 80, issuer: "Let's Encrypt" }).status, 'groen');
});

test('redirect, headers, CAA en totaal', () => {
  assert.strictEqual(s.scoreRedirect({ status: 301, location: 'https://a.nl/' }).status, 'groen');
  assert.strictEqual(s.scoreRedirect({ status: 200 }).status, 'oranje');
  assert.strictEqual(s.scoreHeaders({}).status, 'rood');
  assert.strictEqual(s.scoreHeaders({ 'strict-transport-security': 'max-age=63072000', 'x-frame-options': 'DENY', 'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer' }).status, 'groen');
  assert.strictEqual(s.scoreCaa([]).status, 'oranje');
  assert.strictEqual(s.overall([{ status: 'groen' }, { status: 'oranje' }]), 'oranje');
  assert.strictEqual(s.overall([{ status: 'groen' }, { status: 'rood' }]), 'rood');
});
