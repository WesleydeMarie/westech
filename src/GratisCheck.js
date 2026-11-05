// Pagina /gratis-check: openbare securitycheck van een domein (e-mail en website).
// De check zelf draait in api/check.js; deze component toont alleen de uitkomst.
import React, { useState } from 'react';

const STATUS = {
  groen: { label: 'Goed', bg: '#dcfce7', fg: '#166534', dot: '#16a34a' },
  oranje: { label: 'Aandachtspunt', bg: '#ffedd5', fg: '#9a3412', dot: '#ea580c' },
  rood: { label: 'Actie nodig', bg: '#fee2e2', fg: '#991b1b', dot: '#dc2626' },
};

const OVERALL = {
  groen: 'Uw domein is netjes ingericht. Blijf het wel bewaken: certificaten verlopen en instellingen veranderen.',
  oranje: 'De basis is er, maar er zijn verbeterpunten die criminelen kunnen misbruiken.',
  rood: 'Er zijn punten die direct aandacht nodig hebben. Hieronder staat per punt wat er aan de hand is en hoe u het oplost.',
};

function Badge({ status }) {
  const s = STATUS[status] || STATUS.oranje;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '999px', background: s.bg, color: s.fg, fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>
      <span aria-hidden="true" style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.dot }} />
      {s.label}
    </span>
  );
}

export default function GratisCheck({ colors, fonts, navigate }) {
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setBusy(true);
    try {
      const r = await fetch('/api/check?domain=' + encodeURIComponent(input.trim()));
      const data = await r.json().catch(() => ({}));
      if (!r.ok) setError(data.error || 'De check is mislukt. Probeer het later opnieuw.');
      else setResult(data);
    } catch (err) {
      setError('Er ging iets mis met de verbinding. Probeer het opnieuw.');
    } finally {
      setBusy(false);
    }
  };

  const order = { rood: 0, oranje: 1, groen: 2 };
  const checks = result ? [...result.checks].sort((a, b) => order[a.status] - order[b.status]) : [];

  return (
    <div style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '760px', margin: '0 auto' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.accent, marginBottom: '0.75rem' }}>Gratis check</p>
      <h1 style={{ fontFamily: fonts.serif, fontSize: '40px', fontWeight: 400, color: colors.text, margin: '0 0 1rem', letterSpacing: '-0.01em', lineHeight: 1.15 }}>Is uw e-mail en website goed beveiligd?</h1>
      <p style={{ fontSize: '17px', color: colors.textLight, lineHeight: 1.6, marginBottom: '2rem' }}>
        Vul uw domeinnaam in. Binnen een paar seconden ziet u of criminelen e-mail kunnen versturen die van u lijkt te komen, en of uw website veilig is ingericht. In gewone taal, met per punt hoe u het oplost.
      </p>

      <form onSubmit={submit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        <label htmlFor="gc-domain" style={{ position: 'absolute', left: '-9999px' }}>Domeinnaam</label>
        <input id="gc-domain" type="text" inputMode="url" autoComplete="url" spellCheck="false" placeholder="uwbedrijf.nl" value={input}
          onChange={(e) => setInput(e.target.value)} required maxLength={253}
          style={{ flex: '1 1 260px', padding: '14px 16px', border: `1px solid ${colors.border}`, borderRadius: '8px', fontSize: '16px', outline: 'none', background: colors.white }} />
        <button type="submit" disabled={busy}
          style={{ flex: '0 0 auto', padding: '14px 24px', background: busy ? colors.textLight : colors.accent, color: colors.white, border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: busy ? 'wait' : 'pointer' }}>
          {busy ? 'Bezig met controleren…' : 'Controleer gratis'}
        </button>
      </form>
      <p style={{ fontSize: '13px', color: colors.textLight, marginBottom: '2rem' }}>
        We bekijken alleen openbare informatie (DNS, het certificaat en de instellingen van uw homepage). Er wordt niets gescand of ingelogd, en we bewaren de uitkomst niet.
      </p>

      {error && <div role="alert" style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: '#fee2e2', color: '#991b1b', marginBottom: '2rem' }}>{error}</div>}

      {result && (
        <div aria-live="polite">
          <div style={{ padding: '1.5rem', borderRadius: '12px', background: colors.white, border: `1px solid ${colors.border}`, marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <h2 style={{ fontFamily: fonts.serif, fontSize: '26px', fontWeight: 400, margin: 0, color: colors.text, overflowWrap: 'anywhere' }}>
                <span style={{ display: 'block', fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: colors.textLight, marginBottom: '0.25rem' }}>Resultaat voor</span>
                {result.domain}
              </h2>
              <Badge status={result.overall} />
            </div>
            <p style={{ margin: 0, color: colors.text, lineHeight: 1.6 }}><strong style={{ fontWeight: 600 }}>Totaaloordeel: {(STATUS[result.overall] || STATUS.oranje).label.toLowerCase()}.</strong> {OVERALL[result.overall]}</p>
            <p style={{ margin: '0.75rem 0 0', fontSize: '13px', color: colors.textLight }}>{result.email}{result.note ? ' ' + result.note : ''}</p>
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 600, color: colors.text, margin: '0 0 0.75rem' }}>De checks, belangrijkste eerst</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {checks.map((c) => (
              <div key={c.id} style={{ padding: '1.25rem', borderRadius: '10px', background: colors.white, border: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem 1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <h3 style={{ flex: '1 1 180px', fontSize: '16px', fontWeight: 600, margin: 0, color: colors.text }}>{c.title}</h3>
                  <Badge status={c.status} />
                </div>
                <p style={{ margin: 0, color: colors.text, lineHeight: 1.6, fontSize: '15px' }}>{c.summary}</p>
                {c.fix && <p style={{ margin: '0.5rem 0 0', color: colors.textLight, lineHeight: 1.6, fontSize: '14px' }}><strong style={{ color: colors.text, fontWeight: 600 }}>Zo lost u het op: </strong>{c.fix}</p>}
              </div>
            ))}
          </div>

          <div style={{ padding: '1.75rem', borderRadius: '12px', background: colors.primaryDark, color: colors.white }}>
            <h3 style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: 400, margin: '0 0 0.5rem' }}>U hoort het van mij, niet van uw klant</h3>
            <p style={{ margin: '0 0 1.25rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
              Wilt u hulp bij het oplossen, of dat dit elke maand voor u wordt bewaakt? Dan krijgt u een melding zodra er iets misgaat, en één keer per maand een kort rapport in gewone taal.
            </p>
            <button onClick={() => navigate('/contact')} style={{ padding: '12px 24px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>Neem contact op</button>
          </div>
          <p style={{ fontSize: '12px', color: colors.textLight, marginTop: '1rem' }}>Gecontroleerd op {new Date(result.checkedAt).toLocaleString('nl-NL')}. Deze check is een momentopname en geen volledige beveiligingsaudit.</p>
        </div>
      )}
    </div>
  );
}
