// Homepage van techwes.nl: wie, wat er nieuw is, het spel, de presentaties en de onderwerpen.
import React from 'react';
import { LEVELS, UPCOMING } from './game/content';
import { isReleased } from './game/AdminGame';
import BlogSlider from './BlogSlider';

const PRESENTATIONS = [
  { href: '/presentaties/levensloop-van-een-document.html', title: 'De levensloop van een document', text: 'Sensitivity labels, encryptie en DLP, aan de hand van één document dat de organisatie verlaat.', tag: 'Purview · labels en DLP' },
  { href: '/presentaties/bewaren-en-vernietigen.html', title: 'Bewaren en vernietigen', text: 'Retentie in Purview: hoe lang je bewaart, wanneer je vernietigt en hoe je dat aantoont.', tag: 'Purview · retentie' },
  { href: '/presentaties/van-prompt-tot-policy.html', title: 'Van prompt tot policy', text: 'DSPM for AI: zien wat er met AI-prompts gebeurt, en daar policies op zetten.', tag: 'Purview · AI' },
  { href: '/presentaties/van-verzoek-tot-export.html', title: 'Van verzoek tot export', text: 'eDiscovery: van het verzoek via hold, zoekopdracht en review set tot het exportpakket.', tag: 'Purview · eDiscovery' },
  { href: '/presentaties/risicobeleid.html', title: 'Sign-in risk en user risk', text: 'De twee risk-based Conditional Access-policies in Entra, geanimeerd uitgelegd.', tag: 'Entra · Conditional Access' },
];

const TOPICS = [
  { cat: 'Purview', icon: '🛡️', text: 'DLP, labels, retentie, eDiscovery en Insider Risk: hoe je data in Microsoft 365 echt beschermt.' },
  { cat: 'AI', icon: '🤖', text: 'Copilot, agents en DSPM for AI: wat AI met je data doet en hoe je dat beheerst.' },
  { cat: 'Entra', icon: '🔑', text: 'Identiteit en toegang: Conditional Access, risk policies en ID Protection.' },
  { cat: 'Defender', icon: '🔍', text: 'Detectie en onderzoek: hoe Purview en Defender samen een incident oplossen.' },
];

export default function Home({ colors, fonts, navigate, posts, featured, postPath, onCategory }) {
  const card = { background: colors.white, border: `1px solid ${colors.border}`, borderRadius: 10, padding: '1.5rem', boxShadow: '0 1px 2px rgba(15,23,42,.04), 0 12px 32px rgba(15,23,42,.06)' };
  const h2 = { fontFamily: fonts.serif, fontSize: 30, fontWeight: 400, color: colors.text, margin: '0 0 1.25rem', letterSpacing: '-0.01em' };
  const eyebrow = { fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: colors.accent, marginBottom: '.5rem' };
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' };
  const section = { marginTop: '4rem' };
  const btnPrimary = { padding: '12px 24px', background: colors.primary, color: colors.white, border: 'none', borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: 'pointer', boxShadow: '0 2px 8px rgba(30,64,175,.2)' };
  const btnAccent = { ...btnPrimary, background: colors.accent, boxShadow: '0 2px 8px rgba(249,115,22,.3)' };
  const btnGhost = { padding: '12px 24px', background: colors.white, color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: 'pointer' };

  // Een uitgelichte post (featured: true) gaat voor; daarna de nieuwste.
  const latest = featured ? [featured, ...posts.filter((p) => p !== featured)] : posts;
  const open = LEVELS.filter(isReleased);
  const nextLevel = LEVELS.find((lv) => !isReleased(lv)) || UPCOMING[0];
  const fmt = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' });

  return (
    <div style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
      {/* Hero */}
      <div style={{ maxWidth: 760 }}>
        <div style={eyebrow}>Techwes · Microsoft security en compliance</div>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(38px, 7vw, 56px)', fontWeight: 400, color: colors.text, margin: '0 0 1.25rem', lineHeight: 1.1, letterSpacing: '-0.015em' }}>Data beschermen in Microsoft 365, uitgelegd vanuit de praktijk</h1>
        <p style={{ fontSize: 18, color: colors.textLight, marginBottom: '2rem', lineHeight: 1.7 }}>Praktijkgerichte analyses over Microsoft Purview, Defender en AI-security. Geschreven voor security- en complianceprofessionals die verder willen dan de documentatie.</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="button" style={btnPrimary} onClick={() => navigate('/blog')}>Lees de blog</button>
          <button type="button" style={btnAccent} onClick={() => navigate('/spel')}>🎮 Speel Tenant Admin</button>
          <button type="button" style={btnGhost} onClick={() => navigate('/over-mij')}>Over mij</button>
        </div>
      </div>

      {/* Laatste artikelen */}
      <div style={section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <h2 style={h2}>Op de blog</h2>
          <button type="button" onClick={() => navigate('/blog')} style={{ background: 'none', border: 'none', color: colors.accent, fontWeight: 600, cursor: 'pointer', fontSize: 14, padding: 0 }}>Alle artikelen →</button>
        </div>
        <BlogSlider colors={colors} fonts={fonts} posts={latest} navigate={navigate} postPath={postPath} />
      </div>

      {/* Het spel */}
      <div style={{ ...section, ...card, borderTop: `4px solid ${colors.accent}`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
        <div>
          <div style={eyebrow}>Nieuw · het Purview-spel voor beheerders</div>
          <h2 style={{ ...h2, marginBottom: '.75rem' }}>Tenant Admin</h2>
          <p style={{ color: colors.textLight, lineHeight: 1.7, margin: '0 0 1.25rem' }}>Je bent de nieuwe Purview-beheerder bij het fictieve Nordwind BV. Bouw policies in een gesimuleerde portal, los tickets op en houd beveiliging, gebruikers en compliance in balans. Van beginner tot expert, elke week een nieuw level. In het Nederlands en Engels.</p>
          <button type="button" style={btnAccent} onClick={() => navigate('/spel')}>Speel nu →</button>
        </div>
        <div style={{ display: 'grid', gap: '.5rem' }}>
          {LEVELS.map((lv) => {
            const ok = isReleased(lv);
            return (
              <div key={lv.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '.6rem .9rem', borderRadius: 8, background: ok ? colors.primaryLight : colors.background, color: ok ? colors.primaryDark : colors.textLight, fontSize: 14 }}>
                <span>{ok ? '▶' : '🔒'} Level {lv.id} · {lv.name.nl}</span>
                <span style={{ whiteSpace: 'nowrap' }}>{ok ? lv.rank.nl : fmt(lv.release)}</span>
              </div>
            );
          })}
          {nextLevel && !LEVELS.includes(nextLevel) && (
            <div style={{ padding: '.6rem .9rem', borderRadius: 8, border: `1px dashed ${colors.border}`, color: colors.textLight, fontSize: 14 }}>🔒 Level {nextLevel.id} · {nextLevel.name.nl} · {fmt(nextLevel.release)}</div>
          )}
          <div style={{ fontSize: 12, color: colors.textLight, marginTop: 4 }}>{open.length} van {LEVELS.length} levels speelbaar · geen account nodig, er wordt niets opgeslagen</div>
        </div>
      </div>

      {/* Presentaties */}
      <div style={section}>
        <h2 style={h2}>Interactieve presentaties</h2>
        <p style={{ color: colors.textLight, lineHeight: 1.7, margin: '-0.5rem 0 1.25rem', maxWidth: 720 }}>Ingewikkelde onderwerpen als één verhaal: klik of gebruik de pijltjestoetsen om door te gaan.</p>
        <div style={grid}>
          {PRESENTATIONS.map((p) => (
            <a key={p.href} href={p.href} style={{ ...card, textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: colors.accent, textTransform: 'uppercase', letterSpacing: '.06em' }}>{p.tag}</span>
              <span style={{ fontFamily: fonts.serif, fontSize: 20, color: colors.text }}>{p.title}</span>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: colors.textLight }}>{p.text}</span>
              <span style={{ fontSize: 14, color: colors.primary, fontWeight: 600, marginTop: 'auto' }}>Bekijk presentatie →</span>
            </a>
          ))}
        </div>
      </div>

      {/* Onderwerpen */}
      <div style={section}>
        <h2 style={h2}>Onderwerpen</h2>
        <div style={grid}>
          {TOPICS.map((tp) => {
            const n = posts.filter((p) => p.category === tp.cat).length;
            return (
              <button key={tp.cat} type="button" onClick={() => onCategory(tp.cat)} style={{ ...card, textAlign: 'left', cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
                <div style={{ fontSize: 28, marginBottom: '.5rem' }} aria-hidden="true">{tp.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 18, color: colors.text, marginBottom: '.4rem' }}>{tp.cat} <span style={{ fontSize: 13, color: colors.textLight, fontWeight: 400 }}>· {n} {n === 1 ? 'artikel' : 'artikelen'}</span></div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: colors.textLight }}>{tp.text}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Over mij */}
      <div style={{ ...section, display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', ...card }}>
        <img src="/images/wesley-avatar.jpg" alt="Wesley de Marie" width="88" height="88" style={{ borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ flex: '1 1 320px' }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: colors.text }}>Wesley de Marie</div>
          <div style={{ fontSize: 14, color: colors.textLight, margin: '.25rem 0 .75rem' }}>Security consultant · Microsoft Purview, Defender en AI-security</div>
          <button type="button" onClick={() => navigate('/over-mij')} style={{ background: 'none', border: 'none', color: colors.accent, fontWeight: 600, cursor: 'pointer', fontSize: 14, padding: 0 }}>Meer over mij →</button>
        </div>
      </div>
    </div>
  );
}
