// Gesimuleerde, vereenvoudigde beheerportal ("Nordwind Compliance Center") voor het DLP-level.
// Bewust geen kopie van de echte Microsoft-portal: eigen opmaak, geen logo's.
// Drie stappen die op elkaar voortbouwen: create → tune → finish.
import React, { useState } from 'react';

const C = {
  // Huisstijl techwes.nl
  bg: '#ffffff', panel: '#f8fafc', line: '#cbd5e1', text: '#0f172a', mute: '#64748b',
  teal: '#1e40af', accent: '#f97316', orange: '#ea580c', red: '#dc2626', green: '#059669', side: '#f1f5f9', tint: '#dbeafe',
};

const TXT = {
  nl: {
    portal: 'Nordwind Compliance Center',
    nav: { home: 'Home', labels: 'Labels', dlp: 'DLP', ret: 'Retentie', ediscovery: 'eDiscovery', insider: 'Insider risk', audit: 'Audit' },
    notNeeded: 'Niet nodig voor dit ticket. Ga naar DLP.',
    policies: 'Policies', create: '+ Policy maken', none: 'Nog geen policies.', edit: 'Bewerken',
    status: { sim: 'Simulatie', on: 'Aan', off: 'Uit' },
    step: 'Stap', of: 'van', back: 'Terug', nextStep: 'Volgende', save: 'Opslaan',
    name: 'Naam', namePh: 'bijv. BSN extern',
    locations: 'Waar moet de policy gelden?',
    loc: { exchange: 'Exchange e-mail', sharepoint: 'SharePoint-sites', onedrive: 'OneDrive-accounts', teams: 'Teams-chats', devices: 'Apparaten (endpoints)' },
    rule: 'Regel', contains: 'Inhoud bevat', scope: 'Gedeeld met',
    sit: { bsn: "Netherlands citizen's service (BSN) number", cc: 'Credit card number', iban: 'International banking account number (IBAN)' },
    scopes: { external: 'Mensen buiten de organisatie', any: 'Iedereen (intern en extern)' },
    action: 'Actie', actions: { audit: 'Alleen auditen', override: 'Blokkeren, met override en motivatie', block: 'Altijd blokkeren' },
    mode: 'Modus', modes: { sim: 'Simulatie met policy tips', on: 'Direct aanzetten' },
    confidence: 'Betrouwbaarheid (confidence)', conf: { low: 'Laag', medium: 'Gemiddeld', high: 'Hoog' },
    minCount: 'Minimaal aantal', exceptions: 'Uitzonderingen', addExc: '+ Uitzondering toevoegen',
    exc: { none: 'Geen', group: 'Afzender is lid van groep', domain: 'Ontvanger-domein is', groupExclude: 'Groep uitsluiten van de hele policy' },
    groups: { payroll: 'Salarisadministratie', procurement: 'Inkoop', all: 'Alle medewerkers' },
    simTitle: 'Resultaat simulatie (3 dagen)', matches: 'treffers',
    simRows: [
      ['Inkoop', 'Ordernummers van 9 cijfers', 25, false],
      ['Sales', 'Klantdossier met BSN naar extern adres', 2, true],
      ['HR', 'Loonstrook met BSN naar privé-adres', 1, true],
    ],
    realLeak: 'echt lek', falsePos: 'false positive',
    done: 'Klaar met deze opdracht',
  },
  en: {
    portal: 'Nordwind Compliance Center',
    nav: { home: 'Home', labels: 'Labels', dlp: 'DLP', ret: 'Retention', ediscovery: 'eDiscovery', insider: 'Insider risk', audit: 'Audit' },
    notNeeded: 'Not needed for this ticket. Go to DLP.',
    policies: 'Policies', create: '+ Create policy', none: 'No policies yet.', edit: 'Edit',
    status: { sim: 'Simulation', on: 'On', off: 'Off' },
    step: 'Step', of: 'of', back: 'Back', nextStep: 'Next', save: 'Save',
    name: 'Name', namePh: 'e.g. BSN external',
    locations: 'Where should the policy apply?',
    loc: { exchange: 'Exchange email', sharepoint: 'SharePoint sites', onedrive: 'OneDrive accounts', teams: 'Teams chats', devices: 'Devices (endpoints)' },
    rule: 'Rule', contains: 'Content contains', scope: 'Shared with',
    sit: { bsn: "Netherlands citizen's service (BSN) number", cc: 'Credit card number', iban: 'International banking account number (IBAN)' },
    scopes: { external: 'People outside the organisation', any: 'Anyone (internal and external)' },
    action: 'Action', actions: { audit: 'Audit only', override: 'Block, with override and justification', block: 'Always block' },
    mode: 'Mode', modes: { sim: 'Simulation with policy tips', on: 'Turn on right away' },
    confidence: 'Confidence level', conf: { low: 'Low', medium: 'Medium', high: 'High' },
    minCount: 'Minimum instances', exceptions: 'Exceptions', addExc: '+ Add exception',
    exc: { none: 'None', group: 'Sender is a member of group', domain: 'Recipient domain is', groupExclude: 'Exclude group from the whole policy' },
    groups: { payroll: 'Payroll', procurement: 'Procurement', all: 'All employees' },
    simTitle: 'Simulation result (3 days)', matches: 'matches',
    simRows: [
      ['Procurement', '9-digit order numbers', 25, false],
      ['Sales', 'Customer file with BSN to external address', 2, true],
      ['HR', 'Payslip with BSN to private address', 1, true],
    ],
    realLeak: 'real leak', falsePos: 'false positive',
    done: 'Finish this task',
  },
};

// Beoordeling per stap. Geeft { score, effects, feedback[] } terug.
export function evaluate(step, p, lang) {
  const nl = lang === 'nl';
  const fb = []; let ok = 0; let total = 0; const eff = { sec: 0, usr: 0, cmp: 0 };
  const check = (cond, good, bad, e) => { total += 1; if (cond) { ok += 1; fb.push(['✅', good]); } else { fb.push(['❌', bad]); if (e) Object.keys(e).forEach((k) => { eff[k] += e[k]; }); } };
  if (step === 'create') {
    const extra = Object.keys(p.locations).filter((k) => p.locations[k] && k !== 'exchange');
    check(p.locations.exchange && extra.length === 0,
      nl ? 'Alleen Exchange: precies waar het ticket over gaat.' : 'Exchange only: exactly what the ticket is about.',
      nl ? `Locaties: ${p.locations.exchange ? 'Exchange klopt, maar ' + extra.length + ' extra locatie(s) geven onnodige meldingen.' : 'Exchange ontbreekt, en daar gaat het om.'}` : `Locations: ${p.locations.exchange ? 'Exchange is right, but ' + extra.length + ' extra location(s) cause unnecessary alerts.' : 'Exchange is missing, and that is the point.'}`,
      p.locations.exchange ? { usr: -1 } : { sec: -2 });
    check(p.sit === 'bsn', nl ? 'Het juiste sensitive info type: BSN.' : 'The right sensitive info type: BSN.', nl ? 'Verkeerd sensitive info type: het ticket gaat over BSN\'s.' : 'Wrong sensitive info type: the ticket is about BSNs.', { sec: -2 });
    check(p.scope === 'external', nl ? 'Alleen extern: interne mail blijft ongestoord.' : 'External only: internal mail is not disturbed.', nl ? 'Ook intern verkeer geraakt: HR mailt BSN\'s intern volkomen legitiem.' : 'Internal traffic hit too: HR legitimately emails BSNs internally.', { usr: -2 });
    check(p.action === 'override', nl ? 'Blokkeren met override: veilig, zonder legitiem werk stil te leggen.' : 'Block with override: safe without halting legitimate work.', p.action === 'audit' ? (nl ? 'Alleen auditen houdt niets tegen.' : 'Audit only stops nothing.') : (nl ? 'Altijd blokkeren legt legitiem werk stil.' : 'Always block halts legitimate work.'), p.action === 'audit' ? { sec: -1 } : { usr: -2 });
    check(p.mode === 'sim', nl ? 'Eerst simulatie: je ziet het effect zonder iemand te hinderen.' : 'Simulation first: you see the impact without disturbing anyone.', nl ? 'Direct aan: false positives raken meteen de business.' : 'Straight on: false positives hit the business immediately.', { usr: -2 });
  }
  if (step === 'tune') {
    check(p.confidence === 'high', nl ? 'Hoge confidence: er is ondersteunend bewijs nodig (bijv. het woord "BSN" in de buurt). De ordernummers vallen af.' : 'High confidence: supporting evidence is required (e.g. the word "BSN" nearby). The order numbers drop out.',
      nl ? 'Met lage of gemiddelde confidence blijven de ordernummers matchen.' : 'With low or medium confidence the order numbers keep matching.', { usr: -1 });
    check(!p.excludeProcurement, nl ? 'Inkoop niet uitgesloten: echte BSN\'s van Inkoop blijven gevangen.' : 'Procurement not excluded: real BSNs from procurement are still caught.',
      nl ? 'Inkoop uitsluiten: nu kunnen zij ook échte BSN\'s ongemerkt mailen.' : 'Excluding procurement: now they can also send real BSNs unnoticed.', { sec: -2, cmp: -1 });
    check(p.minCount <= 1, nl ? 'Minimaal aantal op 1: één BSN is al een lek.' : 'Minimum instances at 1: one BSN is already a leak.', nl ? 'Minimaal aantal te hoog: een mail met één BSN glipt erdoor.' : 'Minimum instances too high: an email with one BSN slips through.', { sec: -1 });
  }
  if (step === 'finish') {
    check(p.exception && p.exception.group === 'payroll' && p.exception.domain === 'belastingdienst.nl' && !p.exception.wholeGroup,
      nl ? 'Uitzondering zo smal mogelijk: alleen Salarisadministratie, alleen naar belastingdienst.nl.' : 'Exception as narrow as possible: only Payroll, only to belastingdienst.nl.',
      nl ? 'De uitzondering is te breed of niet juist ingesteld (groep én domein samen).' : 'The exception is too broad or not set correctly (group and domain together).', p.exception && p.exception.wholeGroup ? { sec: -1, cmp: -1 } : { usr: -1 });
    check(p.mode === 'on', nl ? 'Policy aangezet na een goede simulatie.' : 'Policy turned on after a good simulation.', nl ? 'De policy staat nog in simulatie: er wordt nog niets tegengehouden.' : 'The policy is still in simulation: nothing is blocked yet.', { sec: -1 });
  }
  const score = ok === total ? 1 : ok >= total - 1 ? 0.5 : 0;
  if (score === 1) { eff.sec += 1; eff.usr += 1; eff.cmp += 1; }
  return { score, effects: eff, feedback: fb };
}

function Nav({ t, onWrong }) {
  const items = ['home', 'labels', 'dlp', 'ret', 'ediscovery', 'insider', 'audit'];
  const icons = { home: '🏠', labels: '🏷️', dlp: '🚫', ret: '🗄️', ediscovery: '🔍', insider: '👤', audit: '📜' };
  return (
    <div style={{ background: C.side, borderRight: `1px solid ${C.line}`, padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
      {items.map((k) => (
        <button key={k} type="button" className="nav-btn" title={t.nav[k]} aria-label={t.nav[k]} onClick={() => (k === 'dlp' ? null : onWrong())}
          style={{ textAlign: 'left', background: k === 'dlp' ? 'rgba(30,64,175,.10)' : 'transparent', color: k === 'dlp' ? C.teal : C.mute, border: 'none', borderRadius: 6, padding: '8px 8px', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <span aria-hidden="true">{icons[k]}</span> <span className="nav-label">{t.nav[k]}</span>
        </button>
      ))}
    </div>
  );
}

const field = { width: '100%', boxSizing: 'border-box', background: C.bg, color: C.text, border: `1px solid ${C.line}`, borderRadius: 6, padding: '9px 10px', fontSize: 14 };
const label = { display: 'block', fontSize: 13, color: C.mute, margin: '12px 0 6px' };
const btn = (primary) => ({ padding: '10px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: primary ? 'none' : `1px solid ${C.line}`, background: primary ? C.accent : C.bg, color: primary ? '#ffffff' : C.text });

function Radio({ name, value, current, onChange, children }) {
  return (
    <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '6px 0', cursor: 'pointer', fontSize: 14 }}>
      <input type="radio" name={name} checked={current === value} onChange={() => onChange(value)} style={{ marginTop: 3 }} />{children}
    </label>
  );
}

export default function DlpPortal({ lang, step, policy, onSubmit }) {
  const t = TXT[lang];
  const [toast, setToast] = useState(null);
  const [view, setView] = useState(step === 'create' ? 'list' : 'list');
  const [wizard, setWizard] = useState(1);
  const [p, setP] = useState(() => policy || {
    name: '', locations: { exchange: false, sharepoint: false, onedrive: false, teams: false, devices: false },
    sit: '', scope: '', action: '', mode: '', confidence: 'medium', minCount: 1, excludeProcurement: false, exception: null,
  });
  const set = (k, v) => setP((x) => ({ ...x, [k]: v }));
  const wrong = () => { setToast(t.notNeeded); setTimeout(() => setToast(null), 2200); };

  const statusPill = (m) => (
    <span style={{ fontSize: 12, padding: '3px 8px', borderRadius: 999, background: m === 'on' ? 'rgba(5,150,105,.12)' : 'rgba(234,88,12,.12)', color: m === 'on' ? C.green : C.orange }}>{t.status[m] || t.status.off}</span>
  );

  let body;
  if (view === 'list') {
    body = (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{t.nav.dlp} › {t.policies}</div>
          {step === 'create' && !policy && <button type="button" style={btn(true)} onClick={() => { setView('wizard'); setWizard(1); }}>{t.create}</button>}
        </div>
        {step === 'create' ? (
          <div style={{ color: C.mute, fontSize: 14, padding: '18px 0' }}>{t.none}</div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8, padding: 12 }}>
              <span style={{ fontWeight: 600 }}>{p.name || 'BSN'}</span>
              <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>{statusPill(p.mode)}<button type="button" style={btn(false)} onClick={() => setView('edit')}>{t.edit}</button></span>
            </div>
            {step === 'tune' && (
              <div style={{ marginTop: 14, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 13, color: C.mute, marginBottom: 8 }}>{t.simTitle}: 28 {t.matches}</div>
                {t.simRows.map(([who, what, n, real]) => (
                  <div key={who} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13, padding: '6px 0', borderTop: `1px solid ${C.line}` }}>
                    <span><b>{who}</b> · {what}</span>
                    <span style={{ color: real ? C.red : C.orange, whiteSpace: 'nowrap' }}>{n} · {real ? t.realLeak : t.falsePos}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  } else if (view === 'wizard') {
    const canNext = wizard === 1 ? p.name.trim() && Object.values(p.locations).some(Boolean) : wizard === 2 ? p.sit && p.scope && p.action : !!p.mode;
    body = (
      <div>
        <div style={{ fontSize: 13, color: C.mute, marginBottom: 6 }}>{t.create.replace('+ ', '')} · {t.step} {wizard} {t.of} 3</div>
        {wizard === 1 && (
          <>
            <label style={label} htmlFor="dlp-name">{t.name}</label>
            <input id="dlp-name" style={field} value={p.name} placeholder={t.namePh} onChange={(e) => set('name', e.target.value)} maxLength={60} />
            <span style={label}>{t.locations}</span>
            {Object.keys(t.loc).map((k) => (
              <label key={k} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '5px 0', fontSize: 14, cursor: 'pointer' }}>
                <input type="checkbox" checked={p.locations[k]} onChange={() => set('locations', { ...p.locations, [k]: !p.locations[k] })} />{t.loc[k]}
              </label>
            ))}
          </>
        )}
        {wizard === 2 && (
          <>
            <label style={label} htmlFor="dlp-sit">{t.contains}</label>
            <select id="dlp-sit" style={field} value={p.sit} onChange={(e) => set('sit', e.target.value)}>
              <option value="">—</option>{Object.keys(t.sit).map((k) => <option key={k} value={k}>{t.sit[k]}</option>)}
            </select>
            <label style={label} htmlFor="dlp-scope">{t.scope}</label>
            <select id="dlp-scope" style={field} value={p.scope} onChange={(e) => set('scope', e.target.value)}>
              <option value="">—</option>{Object.keys(t.scopes).map((k) => <option key={k} value={k}>{t.scopes[k]}</option>)}
            </select>
            <span style={label}>{t.action}</span>
            {Object.keys(t.actions).map((k) => <Radio key={k} name="act" value={k} current={p.action} onChange={(v) => set('action', v)}>{t.actions[k]}</Radio>)}
          </>
        )}
        {wizard === 3 && (
          <>
            <span style={label}>{t.mode}</span>
            {Object.keys(t.modes).map((k) => <Radio key={k} name="mode" value={k} current={p.mode} onChange={(v) => set('mode', v)}>{t.modes[k]}</Radio>)}
          </>
        )}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {wizard > 1 && <button type="button" style={btn(false)} onClick={() => setWizard(wizard - 1)}>{t.back}</button>}
          {wizard < 3 && <button type="button" style={{ ...btn(true), opacity: canNext ? 1 : 0.5 }} disabled={!canNext} onClick={() => setWizard(wizard + 1)}>{t.nextStep}</button>}
          {wizard === 3 && <button type="button" style={{ ...btn(true), opacity: canNext ? 1 : 0.5 }} disabled={!canNext} onClick={() => onSubmit(p)}>{t.save}</button>}
        </div>
      </div>
    );
  } else {
    // edit
    const exc = p.exception || { group: '', domain: '', wholeGroup: false };
    body = (
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{p.name || 'BSN'} › {t.rule}</div>
        <div style={{ fontSize: 13, color: C.mute }}>{t.contains}: {t.sit[p.sit] || '—'} · {t.scope}: {t.scopes[p.scope] || '—'}</div>
        {step === 'tune' && (
          <>
            <label style={label} htmlFor="dlp-conf">{t.confidence}</label>
            <select id="dlp-conf" style={field} value={p.confidence} onChange={(e) => set('confidence', e.target.value)}>
              {Object.keys(t.conf).map((k) => <option key={k} value={k}>{t.conf[k]}</option>)}
            </select>
            <label style={label} htmlFor="dlp-min">{t.minCount}</label>
            <input id="dlp-min" type="number" min={1} max={50} style={field} value={p.minCount} onChange={(e) => set('minCount', Math.max(1, Number(e.target.value) || 1))} />
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 14, fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={p.excludeProcurement} onChange={() => set('excludeProcurement', !p.excludeProcurement)} />
              {t.exc.groupExclude}: {t.groups.procurement}
            </label>
          </>
        )}
        {step === 'finish' && (
          <>
            <span style={label}>{t.exceptions}</span>
            <div style={{ display: 'grid', gap: 8 }}>
              <label style={{ fontSize: 13, color: C.mute }} htmlFor="dlp-exgroup">{t.exc.group}</label>
              <select id="dlp-exgroup" style={field} value={exc.group} onChange={(e) => set('exception', { ...exc, group: e.target.value })}>
                <option value="">—</option>{Object.keys(t.groups).map((k) => <option key={k} value={k}>{t.groups[k]}</option>)}
              </select>
              <label style={{ fontSize: 13, color: C.mute }} htmlFor="dlp-exdom">{t.exc.domain}</label>
              <input id="dlp-exdom" style={field} value={exc.domain} placeholder={lang === 'nl' ? 'bijv. voorbeeld.nl' : 'e.g. example.com'} onChange={(e) => set('exception', { ...exc, domain: e.target.value.trim().toLowerCase() })} maxLength={60} />
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, cursor: 'pointer' }}>
                <input type="checkbox" checked={exc.wholeGroup} onChange={() => set('exception', { ...exc, wholeGroup: !exc.wholeGroup })} />{t.exc.groupExclude}
              </label>
            </div>
            <span style={label}>{t.mode}</span>
            <Radio name="mode2" value="sim" current={p.mode} onChange={(v) => set('mode', v)}>{t.status.sim}</Radio>
            <Radio name="mode2" value="on" current={p.mode} onChange={(v) => set('mode', v)}>{t.status.on}</Radio>
          </>
        )}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button type="button" style={btn(false)} onClick={() => setView('list')}>{t.back}</button>
          <button type="button" style={btn(true)} onClick={() => onSubmit(p)}>{t.save}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, overflow: 'hidden', background: C.panel }}>
      <style>{'@media (max-width:560px){.dlp-grid{grid-template-columns:48px 1fr!important}.dlp-grid .nav-label{display:none}.dlp-grid .nav-btn{text-align:center!important;padding:8px 0!important;text-overflow:clip!important}}'}</style>
      <div style={{ background: C.side, borderBottom: `1px solid ${C.line}`, padding: '10px 14px', fontSize: 13, fontWeight: 600, color: C.text }}>🛡️ {t.portal}</div>
      <div className="dlp-grid" style={{ display: 'grid', gridTemplateColumns: '170px 1fr', minHeight: 300 }}>
        <Nav t={t} onWrong={wrong} />
        <div style={{ padding: 16, minWidth: 0, position: 'relative' }}>
          {toast && <div role="status" style={{ background: 'rgba(234,88,12,.12)', color: C.orange, borderRadius: 8, padding: '8px 12px', fontSize: 13, marginBottom: 12 }}>{toast}</div>}
          {body}
        </div>
      </div>
    </div>
  );
}
