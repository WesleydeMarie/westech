// "Tenant Admin" — interactief Purview-spel voor beheerders. Pagina /spel.
// Geen externe scripts of netwerkverkeer: alles draait in de browser.
// Voortgang (vrijgespeelde levels, taal) staat alleen lokaal in de browser.
import React, { useEffect, useMemo, useState } from 'react';
import { LEVELS, UI, UPCOMING, TASK_LINKS, LEVEL_BLOGS } from './content';
import { blogPosts } from '../blogPosts';
import Portal, { evaluateGeneric } from './Portal';
import DlpPortal, { evaluate as evalPortal } from './DlpPortal';

const C = {
  // Huisstijl techwes.nl
  bg: '#ffffff', panel: '#f8fafc', line: '#cbd5e1', text: '#0f172a', mute: '#64748b',
  teal: '#1e40af', accent: '#f97316', orange: '#ea580c', red: '#dc2626', green: '#059669', side: '#f1f5f9', tint: '#dbeafe',
};
const STORE = 'techwes-tenant-admin-v1';
const PASS = 0.7;
const START = 60;
const STEP = 8;

function load() {
  try { return JSON.parse(window.localStorage.getItem(STORE)) || {}; } catch (e) { return {}; }
}
function save(data) {
  try { window.localStorage.setItem(STORE, JSON.stringify(data)); } catch (e) { /* privé-venster: negeren */ }
}
// Wekelijkse vrijgave: op techwes.nl komt een level vrij op zijn releasedatum.
// In previews en lokaal (andere hostnaam) zijn alle levels zichtbaar, zodat je vooruit kunt testen.
const LIVE = typeof window !== 'undefined' && /(^|\.)techwes\.nl$/.test(window.location.hostname);
const todayISO = () => new Date().toISOString().slice(0, 10);
export const isReleased = (lv) => !LIVE || !lv.release || lv.release <= todayISO();
const fmtDate = (iso, lang) => new Date(iso + 'T12:00:00').toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', { day: 'numeric', month: 'long' });
// Blogverwijzingen: alleen naar posts die bestaan en al gepubliceerd zijn.
const slugify = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const POSTS = {};
blogPosts.forEach((bp) => { POSTS[bp.slug || slugify(bp.title)] = bp; });
const publishedPost = (slug) => {
  const bp = slug && POSTS[slug];
  if (!bp) return null;
  if (bp.publishDate && new Date(bp.publishDate) > new Date()) return null;
  return bp;
};
const clamp = (v) => Math.max(0, Math.min(100, v));
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

function Meter({ label, value }) {
  const color = value < 30 ? C.red : value < 55 ? C.orange : C.teal;
  return (
    <div style={{ flex: '1 1 140px', minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.mute, marginBottom: 4 }}>
        <span>{label}</span><span>{value}</span>
      </div>
      <div style={{ height: 8, background: C.line, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, transition: 'width .4s ease' }} />
      </div>
    </div>
  );
}

function Btn({ children, onClick, kind = 'primary', disabled, style }) {
  const base = { padding: '12px 18px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: disabled ? 'default' : 'pointer', border: 'none', textAlign: 'left', lineHeight: 1.4 };
  const kinds = {
    primary: { background: C.accent, color: '#ffffff', boxShadow: '0 2px 8px rgba(249,115,22,.25)' },
    ghost: { background: 'transparent', color: C.text, border: `1px solid ${C.line}` },
  };
  return <button type="button" onClick={onClick} disabled={disabled} style={{ ...base, ...kinds[kind], opacity: disabled ? 0.5 : 1, ...style }}>{children}</button>;
}

export default function AdminGame({ fonts, navigate }) {
  const stored = useMemo(load, []);
  const [lang, setLang] = useState(stored.lang || 'nl');
  const [unlocked, setUnlocked] = useState(stored.unlocked || 1);
  const [best, setBest] = useState(stored.best || {});
  const [view, setView] = useState('menu'); // menu | play | result
  const [levelIdx, setLevelIdx] = useState(0);
  const [taskIdx, setTaskIdx] = useState(0);
  const [meters, setMeters] = useState({ sec: START, usr: START, cmp: START });
  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState(null); // { score, feedback, picked }
  const [multi, setMulti] = useState([]);
  const [order, setOrder] = useState([]);
  const [opts, setOpts] = useState([]);
  const [policy, setPolicy] = useState(null); // portal-stand, gaat mee naar de volgende portal-opdracht

  const t = UI[lang];
  const L = (o) => (o && typeof o === 'object' ? o[lang] : o);
  const level = LEVELS[levelIdx];
  const task = level && level.tasks[taskIdx];

  useEffect(() => { save({ lang, unlocked, best }); }, [lang, unlocked, best]);
  useEffect(() => { document.title = `${t.title} | Techwes`; }, [t.title]);

  // Opties per opdracht schudden, zodat het juiste antwoord niet steeds op dezelfde plek staat.
  useEffect(() => {
    if (!task) return;
    if (task.type === 'order') setOpts(shuffle(task.steps.map((s, i) => ({ s, i }))));
    else if (task.options) setOpts(shuffle(task.options.map((o, i) => ({ o, i }))));
    else setOpts([]);
    setMulti([]); setOrder([]); setAnswer(null);
  }, [levelIdx, taskIdx, task]);

  const startLevel = (i) => {
    setLevelIdx(i); setTaskIdx(0); setPoints(0); setPolicy(null);
    setMeters({ sec: START, usr: START, cmp: START });
    setView('play');
    window.scrollTo(0, 0);
  };

  const applyEffects = (e) => setMeters((m) => ({
    sec: clamp(m.sec + (e.sec || 0) * STEP), usr: clamp(m.usr + (e.usr || 0) * STEP), cmp: clamp(m.cmp + (e.cmp || 0) * STEP),
  }));

  const choose = (idx) => {
    if (answer) return;
    const o = task.options[idx];
    const score = o.correct ? 1 : 0;
    applyEffects(o.effects || {});
    setPoints((p) => p + score);
    setAnswer({ score, feedback: L(o.feedback), picked: idx });
  };

  const checkMulti = () => {
    const right = task.options.map((o, i) => (o.correct ? i : -1)).filter((i) => i >= 0);
    const hits = multi.filter((i) => right.includes(i)).length;
    const wrong = multi.length - hits;
    const score = hits === right.length && wrong === 0 ? 1 : (hits >= right.length - 1 && wrong <= 1 ? 0.5 : 0);
    applyEffects(score === 1 ? { sec: 1, usr: 1, cmp: 1 } : score ? {} : { sec: -1, usr: -1, cmp: -1 });
    setPoints((p) => p + score);
    setAnswer({ score, feedback: L(task.feedback), right });
  };

  const checkOrder = () => {
    const pos = order.filter((v, i) => v === i).length;
    const score = pos === task.steps.length ? 1 : pos >= 2 ? 0.5 : 0;
    applyEffects(score === 1 ? { sec: 2, usr: 1, cmp: 2 } : score ? {} : { sec: -1, usr: 0, cmp: -2 });
    setPoints((p) => p + score);
    setAnswer({ score, feedback: L(task.feedback) });
  };

  const submitConsole = (v) => {
    const r = evaluateGeneric(task, v, lang);
    applyEffects(r.effects);
    setPoints((x) => x + r.score);
    setAnswer({ score: r.score, list: r.feedback });
  };

  const submitPortal = (p) => {
    const r = evalPortal(task.step, p, lang);
    applyEffects(r.effects);
    setPoints((x) => x + r.score);
    setPolicy(p);
    setAnswer({ score: r.score, list: r.feedback });
  };

  const next = () => {
    if (taskIdx + 1 < level.tasks.length) { setTaskIdx(taskIdx + 1); window.scrollTo(0, 0); return; }
    const pct = points / level.tasks.length;
    if (pct >= PASS) setUnlocked((u) => Math.max(u, level.id + 1));
    setBest((b) => ({ ...b, [level.id]: Math.max(b[level.id] || 0, Math.round(pct * 100)) }));
    setView('result');
    window.scrollTo(0, 0);
  };

  // Zelfde kader als de blog-animaties (src/animaties.js: .ta-frame)
  const frame = { background: C.bg, color: C.text, border: `1px solid ${C.line}`, borderTop: `4px solid ${C.teal}`, borderRadius: 10, padding: 'clamp(16px, 4vw, 32px)', boxShadow: '0 1px 2px rgba(15,23,42,.04), 0 12px 32px rgba(15,23,42,.06)' };
  const heading = { fontFamily: fonts.serif, fontWeight: 400, margin: 0, color: C.text };

  // ---------- MENU ----------
  if (view === 'menu') {
    return (
      <div style={{ paddingTop: '2.5rem', paddingBottom: '3rem', maxWidth: 820, margin: '0 auto' }}>
        <div style={frame}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.teal }}>🛡️ {t.subtitle}</span>
            <Btn kind="ghost" onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')} style={{ padding: '6px 12px', fontSize: 13 }}>{t.lang}</Btn>
          </div>
          <h1 style={{ ...heading, fontSize: 'clamp(32px, 6vw, 44px)', marginBottom: 12 }}>{t.title}</h1>
          <p style={{ color: C.mute, lineHeight: 1.6, marginTop: 0, marginBottom: 24 }}>{t.intro}</p>
          <div style={{ display: 'grid', gap: 12 }}>
            {LEVELS.map((lv, i) => {
              const open = isReleased(lv);
              const interactive = lv.tasks.some((x) => x.type === 'portal' || x.type === 'console');
              return (
                <button key={lv.id} type="button" disabled={!open} onClick={() => startLevel(i)}
                  style={{ textAlign: 'left', background: C.panel, border: `1px solid ${open ? C.line : C.panel}`, borderRadius: 10, padding: 16, color: C.text, cursor: open ? 'pointer' : 'default', opacity: open ? 1 : 0.55 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: 16 }}>{open ? '' : '🔒 '}Level {lv.id} · {L(lv.name)}{interactive && <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 600, color: C.teal, background: C.tint, borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap' }}>🖱️ {lang === 'nl' ? 'Interactieve portal' : 'Interactive portal'}</span>}</span>
                    <span style={{ fontSize: 13, color: best[lv.id] >= 70 ? C.green : C.mute }}>{best[lv.id] >= 70 ? '✓ ' : ''}{L(lv.rank)}{best[lv.id] != null ? ` · ${best[lv.id]}%` : ''}</span>
                  </div>
                  <div style={{ fontSize: 14, color: C.mute, marginTop: 6 }}>{open ? `${L(lv.blurb)} ${t.minutes}.` : `🗓️ ${t.releaseOn} ${fmtDate(lv.release, lang)}`}</div>
                </button>
              );
            })}
          </div>
          {UPCOMING.map((u) => (
            <div key={u.id} style={{ marginTop: 12, border: `1px dashed ${C.line}`, borderRadius: 10, padding: 14, color: C.mute }}>
              <div style={{ fontWeight: 600 }}>🔒 Level {u.id} · {L(u.name)}</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>🗓️ {t.releaseOn} {fmtDate(u.release, lang)}</div>
            </div>
          ))}
          <p style={{ fontSize: 13, color: C.mute, marginTop: 20, marginBottom: 0 }}>{t.weekly}</p>
          {!LIVE && <p style={{ fontSize: 12, color: C.orange, marginTop: 8, marginBottom: 0 }}>{t.previewNote}</p>}
        </div>
        <p style={{ fontSize: 12, color: '#64748b', marginTop: 12 }}>{t.disclaimer}</p>
      </div>
    );
  }

  // ---------- RESULTAAT ----------
  if (view === 'result') {
    const pct = Math.round((points / level.tasks.length) * 100);
    const ok = pct >= PASS * 100;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://techwes.nl/spel')}`;
    return (
      <div style={{ paddingTop: '2.5rem', paddingBottom: '3rem', maxWidth: 820, margin: '0 auto' }}>
        <div style={frame}>
          <p style={{ color: ok ? C.teal : C.orange, fontWeight: 600, marginTop: 0 }}>{ok ? t.passed : t.failed}</p>
          <h1 style={{ ...heading, fontSize: 36, marginBottom: 8 }}>Level {level.id} · {L(level.name)}</h1>
          <p style={{ fontSize: 48, fontWeight: 700, margin: '8px 0', color: ok ? C.teal : C.orange }}>{pct}%</p>
          {!ok && <p style={{ color: C.mute, marginTop: 0 }}>{t.needed}</p>}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', margin: '20px 0' }}>
            {['sec', 'usr', 'cmp'].map((k) => <Meter key={k} label={t.meters[k]} value={meters[k]} />)}
          </div>
          {ok && (
            <div style={{ border: `1px solid ${C.teal}`, borderRadius: 12, padding: 16, margin: '20px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span aria-hidden="true" style={{ fontSize: 36 }}>🏅</span>
              <div>
                <div style={{ fontSize: 12, color: C.mute }}>{t.badge}</div>
                <div style={{ fontSize: 20, fontWeight: 600 }}>{L(level.badge)}</div>
              </div>
            </div>
          )}
          {(LEVEL_BLOGS[level.id] || []).map(publishedPost).filter(Boolean).length > 0 && (
            <div style={{ margin: '20px 0', background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>📚 {t.blogs}</div>
              <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 6 }}>
                {(LEVEL_BLOGS[level.id] || []).filter((sl) => publishedPost(sl)).map((sl) => (
                  <li key={sl}><button type="button" onClick={() => navigate('/blog/' + sl)} style={{ background: 'none', border: 'none', padding: 0, color: C.teal, cursor: 'pointer', fontSize: 14, textAlign: 'left' }}>{POSTS[sl].title}</button></li>
                ))}
              </ul>
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {ok && levelIdx + 1 < LEVELS.length && isReleased(LEVELS[levelIdx + 1]) && <Btn onClick={() => startLevel(levelIdx + 1)}>{t.nextLevel} →</Btn>}
            <Btn kind="ghost" onClick={() => startLevel(levelIdx)}>{t.again}</Btn>
            <Btn kind="ghost" onClick={() => setView('menu')}>{t.levels}</Btn>
            {ok && <a href={shareUrl} target="_blank" rel="noopener noreferrer" title={t.shareText(L(level.badge))}
              style={{ padding: '12px 18px', borderRadius: 8, fontSize: 15, fontWeight: 600, color: C.text, border: `1px solid ${C.line}`, textDecoration: 'none' }}>{t.share}</a>}
          </div>
        </div>
      </div>
    );
  }

  // ---------- SPELEN ----------
  const isLast = taskIdx + 1 === level.tasks.length;
  const verdict = answer && (answer.score === 1 ? t.correct : answer.score > 0 ? t.partly : t.wrong);
  const verdictColor = answer && (answer.score === 1 ? C.green : answer.score > 0 ? C.orange : C.red);

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: 820, margin: '0 auto' }}>
      <div style={frame}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 13, color: C.mute, marginBottom: 12 }}>
          <button type="button" onClick={() => setView('menu')} style={{ background: 'none', border: 'none', color: C.mute, cursor: 'pointer', padding: 0, fontSize: 13 }}>← {t.levels}</button>
          <span>Level {level.id} · {L(level.name)} · {t.task} {taskIdx + 1} {t.of} {level.tasks.length}</span>
        </div>
        <div style={{ height: 4, background: C.line, borderRadius: 2, marginBottom: 18 }}>
          <div style={{ width: `${((taskIdx + (answer ? 1 : 0)) / level.tasks.length) * 100}%`, height: '100%', background: C.teal, borderRadius: 2, transition: 'width .3s' }} />
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 22 }}>
          {['sec', 'usr', 'cmp'].map((k) => <Meter key={k} label={t.meters[k]} value={meters[k]} />)}
        </div>

        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 13, color: C.teal, marginBottom: 8 }}>🎫 {t.from}: {L(task.from)}</div>
          <p style={{ fontSize: 17, lineHeight: 1.55, margin: 0 }}>{L(task.prompt)}</p>
          {task.code && (
            <pre style={{ background: C.side, border: `1px solid ${C.line}`, borderRadius: 8, padding: 12, marginTop: 14, marginBottom: 0, overflowX: 'auto', fontSize: 13, lineHeight: 1.5, color: C.text }}><code>{task.code}</code></pre>
          )}
        </div>

        <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
          {task.type === 'console' && !answer && (
            <Portal key={`${levelIdx}-${taskIdx}`} task={task} lang={lang} onSubmit={submitConsole} />
          )}

          {task.type === 'portal' && !answer && (
            <DlpPortal key={`${levelIdx}-${taskIdx}`} lang={lang} step={task.step} policy={policy} onSubmit={submitPortal} />
          )}

          {task.type === 'choice' && opts.map(({ o, i }) => {
            const shown = !!answer;
            const border = !shown ? C.line : o.correct ? C.green : i === answer.picked ? C.red : C.line;
            return (
              <Btn key={i} kind="ghost" disabled={shown && i !== answer.picked && !o.correct} onClick={() => choose(i)}
                style={{ border: `1px solid ${border}`, fontWeight: 500 }}>{L(o.text)}</Btn>
            );
          })}

          {task.type === 'multi' && (
            <>
              <div style={{ fontSize: 13, color: C.mute }}>{t.pickAll}</div>
              {opts.map(({ o, i }) => {
                const on = multi.includes(i);
                const border = answer ? (o.correct ? C.green : on ? C.red : C.line) : on ? C.teal : C.line;
                return (
                  <Btn key={i} kind="ghost" disabled={!!answer} onClick={() => setMulti(on ? multi.filter((x) => x !== i) : [...multi, i])}
                    style={{ border: `1px solid ${border}`, fontWeight: 500, background: on ? 'rgba(30,64,175,.06)' : 'transparent' }}>
                    {on ? '☑ ' : '☐ '}{L(o.text)}
                  </Btn>
                );
              })}
              {!answer && <Btn onClick={checkMulti} disabled={multi.length === 0}>{t.submit}</Btn>}
            </>
          )}

          {task.type === 'order' && (
            <>
              <div style={{ fontSize: 13, color: C.mute }}>{t.tapOrder}</div>
              {opts.map(({ s, i }) => {
                const pos = order.indexOf(i);
                const good = answer && pos === i;
                return (
                  <Btn key={i} kind="ghost" disabled={!!answer || pos >= 0} onClick={() => setOrder([...order, i])}
                    style={{ border: `1px solid ${answer ? (good ? C.green : C.red) : pos >= 0 ? C.teal : C.line}`, fontWeight: 500, opacity: 1 }}>
                    <span style={{ display: 'inline-block', width: 26, color: C.teal }}>{pos >= 0 ? `${pos + 1}.` : '·'}</span>{L(s)}
                  </Btn>
                );
              })}
              {!answer && (
                <div style={{ display: 'flex', gap: 10 }}>
                  <Btn onClick={checkOrder} disabled={order.length !== task.steps.length}>{t.submit}</Btn>
                  <Btn kind="ghost" onClick={() => setOrder([])} disabled={order.length === 0}>{t.reset}</Btn>
                </div>
              )}
            </>
          )}
        </div>

        {answer && (
          <div role="status" style={{ marginTop: 18, borderLeft: `4px solid ${verdictColor}`, background: C.panel, borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontWeight: 700, color: verdictColor, marginBottom: 6 }}>{verdict}</div>
            {answer.feedback && <div style={{ lineHeight: 1.55 }}>{answer.feedback}</div>}
            {answer.list && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
                {answer.list.map(([icon, msg], i) => <li key={i} style={{ lineHeight: 1.5 }}>{icon} {msg}</li>)}
              </ul>
            )}
            {task.type === 'choice' && answer.score !== 1 && (
              <div style={{ marginTop: 8, color: C.mute, fontSize: 14 }}>✅ {L(task.options.find((o) => o.correct).text)}{' — '}{L(task.options.find((o) => o.correct).feedback)}</div>
            )}
            {task.type === 'order' && answer.score !== 1 && (
              <ol style={{ margin: '8px 0 0', paddingLeft: 20, color: C.mute, fontSize: 14 }}>{task.steps.map((s, i) => <li key={i}>{L(s)}</li>)}</ol>
            )}
            {publishedPost(task.link || TASK_LINKS[`${level.id}-${taskIdx}`]) && (
              <button type="button" onClick={() => navigate('/blog/' + (task.link || TASK_LINKS[`${level.id}-${taskIdx}`]))} style={{ marginTop: 10, background: 'none', border: 'none', padding: 0, color: C.teal, cursor: 'pointer', fontSize: 14 }}>{t.readMore} →</button>
            )}
            <div style={{ marginTop: 14 }}>
              <Btn onClick={next}>{isLast ? t.finish : t.next} →</Btn>
            </div>
          </div>
        )}
        <div style={{ marginTop: 16, fontSize: 13, color: C.mute }}>{t.score}: {points} / {level.tasks.length}</div>
      </div>
    </div>
  );
}
