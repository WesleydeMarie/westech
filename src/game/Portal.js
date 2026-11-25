// Generieke, vereenvoudigde beheerportal ("Nordwind Compliance Center") voor portal-opdrachten.
// Een opdracht beschrijft: in welk onderdeel je moet zijn (section), welke velden er zijn (fields),
// optioneel een tabel met gegevens (table), en regels om te beoordelen (checks, in content.js).
// Bewust geen kopie van de echte Microsoft-portal: eigen, eenvoudige opmaak, geen logo's.
import React, { useState } from 'react';

export const C = {
  // Huisstijl techwes.nl
  bg: '#ffffff', panel: '#f8fafc', line: '#cbd5e1', text: '#0f172a', mute: '#64748b',
  teal: '#1e40af', accent: '#f97316', orange: '#ea580c', red: '#dc2626', green: '#059669', side: '#f1f5f9', tint: '#dbeafe',
};

export const SECTIONS = {
  home: { icon: '🏠', nl: 'Home', en: 'Home' },
  roles: { icon: '🔑', nl: 'Rollen', en: 'Roles' },
  labels: { icon: '🏷️', nl: 'Labels', en: 'Labels' },
  dlp: { icon: '🚫', nl: 'DLP', en: 'DLP' },
  dspm: { icon: '🤖', nl: 'DSPM for AI', en: 'DSPM for AI' },
  explorer: { icon: '🗂️', nl: 'Data explorer', en: 'Data explorer' },
  retention: { icon: '🗄️', nl: 'Retentie', en: 'Retention' },
  ediscovery: { icon: '🔍', nl: 'eDiscovery', en: 'eDiscovery' },
  insider: { icon: '👤', nl: 'Insider risk', en: 'Insider risk' },
  audit: { icon: '📜', nl: 'Audit', en: 'Audit' },
};

const T = {
  nl: { portal: 'Nordwind Compliance Center', pick: 'Kies in het menu het onderdeel waar je deze opdracht uitvoert.', wrong: 'Hier niet: dit onderdeel is niet nodig voor dit ticket.', save: 'Opslaan', missing: 'Vul eerst alle velden in.' },
  en: { portal: 'Nordwind Compliance Center', pick: 'Pick the section in the menu where you carry out this task.', wrong: 'Not here: this section is not needed for this ticket.', save: 'Save', missing: 'Fill in all fields first.' },
};

const field = { width: '100%', boxSizing: 'border-box', background: C.bg, color: C.text, border: `1px solid ${C.line}`, borderRadius: 6, padding: '9px 10px', fontSize: 14 };
const labelSt = { display: 'block', fontSize: 13, color: C.mute, margin: '12px 0 6px' };

// Beoordeling: checks = [{ test(v) → bool, good, bad, effects }]. Geeft { score, effects, feedback[] }.
export function evaluateGeneric(task, v, lang) {
  const fb = []; let ok = 0; const eff = { sec: 0, usr: 0, cmp: 0 };
  task.checks.forEach((c) => {
    if (c.test(v)) { ok += 1; fb.push(['✅', c.good[lang]]); } else {
      fb.push(['❌', c.bad[lang]]);
      Object.keys(c.effects || {}).forEach((k) => { eff[k] += c.effects[k]; });
    }
  });
  const total = task.checks.length;
  const score = ok === total ? 1 : ok >= total - 1 ? 0.5 : 0;
  if (score === 1) { eff.sec += 1; eff.usr += 1; eff.cmp += 1; }
  return { score, effects: eff, feedback: fb };
}

function Field({ f, value, onChange, lang }) {
  const L = (o) => (o && typeof o === 'object' ? o[lang] : o);
  const id = `pf-${f.id}`;
  if (f.kind === 'select') {
    return (<><label style={labelSt} htmlFor={id}>{L(f.label)}</label>
      <select id={id} style={field} value={value || ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>{f.options.map((o) => <option key={o.v} value={o.v}>{L(o.label)}</option>)}
      </select></>);
  }
  if (f.kind === 'radio') {
    return (<><span style={labelSt}>{L(f.label)}</span>
      {f.options.map((o) => (
        <label key={o.v} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '5px 0', fontSize: 14, cursor: 'pointer' }}>
          <input type="radio" name={id} checked={value === o.v} onChange={() => onChange(o.v)} style={{ marginTop: 3 }} />{L(o.label)}
        </label>))}</>);
  }
  if (f.kind === 'checks') {
    const cur = value || [];
    return (<><span style={labelSt}>{L(f.label)}</span>
      {f.options.map((o) => (
        <label key={o.v} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '5px 0', fontSize: 14, cursor: 'pointer' }}>
          <input type="checkbox" checked={cur.includes(o.v)} onChange={() => onChange(cur.includes(o.v) ? cur.filter((x) => x !== o.v) : [...cur, o.v])} />{L(o.label)}
        </label>))}</>);
  }
  if (f.kind === 'toggle') {
    return (
      <label style={{ display: 'flex', gap: 10, alignItems: 'center', margin: '12px 0', fontSize: 14, cursor: 'pointer' }}>
        <input type="checkbox" checked={!!value} onChange={() => onChange(!value)} style={{ width: 18, height: 18 }} />{L(f.label)}
      </label>
    );
  }
  if (f.kind === 'number') {
    return (<><label style={labelSt} htmlFor={id}>{L(f.label)}</label>
      <input id={id} type="number" min={f.min ?? 0} max={f.max ?? 999} style={field} value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} /></>);
  }
  return (<><label style={labelSt} htmlFor={id}>{L(f.label)}</label>
    <input id={id} style={field} value={value || ''} maxLength={80} placeholder={L(f.placeholder) || ''} onChange={(e) => onChange(e.target.value)} /></>);
}

export default function Portal({ task, lang, onSubmit }) {
  const t = T[lang];
  const L = (o) => (o && typeof o === 'object' ? o[lang] : o);
  const [section, setSection] = useState('home');
  const [toast, setToast] = useState(null);
  const [v, setV] = useState(() => ({ ...(task.defaults || {}) }));
  const nav = task.nav || ['home', 'roles', 'labels', 'dlp', 'dspm', 'explorer', 'retention', 'ediscovery', 'insider', 'audit'];

  const go = (k) => {
    if (k === task.section) { setSection(k); setToast(null); return; }
    if (k === 'home') { setSection('home'); return; }
    setToast(t.wrong); setTimeout(() => setToast(null), 2200);
  };
  // Resultatentabel (bijv. zoekresultaten); verschijnt pas als de velden het toelaten.
  const renderTable = () => {
    if (!task.table) return null;
    const rows = typeof task.table.rows === 'function' ? task.table.rows(v) : task.table.rows;
    if (!rows) return null;
    return (
      <div style={{ marginTop: 10, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead><tr>{task.table.head.map((h, i) => <th key={i} style={{ textAlign: 'left', padding: '8px 10px', color: C.mute, fontWeight: 600, borderBottom: `1px solid ${C.line}` }}>{L(h)}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={{ padding: '7px 10px', borderTop: i ? `1px solid ${C.line}` : 'none' }}>{L(c)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  };
  const visible = (f) => !f.showIf || f.showIf(v);
  const complete = task.fields.filter(visible).every((f) => f.optional || f.kind === 'toggle' || (Array.isArray(v[f.id]) ? v[f.id].length > 0 : v[f.id] !== undefined && v[f.id] !== ''));

  return (
    <div style={{ border: `1px solid ${C.line}`, borderRadius: 10, overflow: 'hidden', background: C.panel }}>
      <style>{'@media (max-width:560px){.pt-grid{grid-template-columns:48px 1fr!important}.pt-grid .nav-label{display:none}.pt-grid .nav-btn{text-align:center!important;padding:8px 0!important}}'}</style>
      <div style={{ background: C.side, borderBottom: `1px solid ${C.line}`, padding: '10px 14px', fontSize: 13, fontWeight: 600 }}>🛡️ {t.portal}</div>
      <div className="pt-grid" style={{ display: 'grid', gridTemplateColumns: '170px 1fr', minHeight: 300 }}>
        <div style={{ background: C.side, borderRight: `1px solid ${C.line}`, padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          {nav.map((k) => (
            <button key={k} type="button" className="nav-btn" title={SECTIONS[k][lang]} aria-label={SECTIONS[k][lang]} onClick={() => go(k)}
              style={{ textAlign: 'left', background: section === k ? 'rgba(30,64,175,.10)' : 'transparent', color: section === k ? C.teal : C.mute, border: 'none', borderRadius: 6, padding: '8px', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <span aria-hidden="true">{SECTIONS[k].icon}</span> <span className="nav-label">{SECTIONS[k][lang]}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: 16, minWidth: 0 }}>
          {toast && <div role="status" style={{ background: 'rgba(234,88,12,.12)', color: C.orange, borderRadius: 8, padding: '8px 12px', fontSize: 13, marginBottom: 12 }}>{toast}</div>}
          {section === 'home' ? (
            <div style={{ color: C.mute, fontSize: 14, padding: '18px 0' }}>👈 {t.pick}</div>
          ) : (
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{SECTIONS[section][lang]} › {L(task.page)}</div>
              {task.info && <div style={{ fontSize: 13, color: C.mute, marginBottom: 6 }}>{L(task.info)}</div>}

              {!(task.table && task.table.after) && renderTable()}
              {task.fields.filter(visible).map((f) => (
                <React.Fragment key={f.id}>
                  <Field f={f} lang={lang} value={v[f.id]} onChange={(val) => setV((x) => ({ ...x, [f.id]: val }))} />
                  {task.table && task.table.after === f.id && renderTable()}
                </React.Fragment>
              ))}
              <div style={{ marginTop: 16 }}>
                <button type="button" disabled={!complete} onClick={() => onSubmit(v)} title={complete ? '' : t.missing}
                  style={{ padding: '10px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: complete ? 'pointer' : 'default', border: 'none', background: C.accent, color: '#fff', opacity: complete ? 1 : 0.5 }}>{t.save}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
