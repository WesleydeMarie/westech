// Slider met alle gepubliceerde blogposts op de homepage: vegen op telefoon, pijltjes op desktop,
// filteren per onderwerp. Geen externe libraries (CSP: script-src 'self').
import React, { useEffect, useRef, useState } from 'react';

const FILTERS = ['Alle', 'Purview', 'AI', 'Entra', 'Defender'];

export default function BlogSlider({ colors, fonts, posts, navigate, postPath }) {
  const [filter, setFilter] = useState('Alle');
  const [pos, setPos] = useState({ first: 1, last: 1, atStart: true, atEnd: false });
  const track = useRef(null);

  const list = filter === 'Alle' ? posts : posts.filter((p) => p.category === filter);
  const counts = FILTERS.reduce((m, f) => ({ ...m, [f]: f === 'Alle' ? posts.length : posts.filter((p) => p.category === f).length }), {});

  const measure = () => {
    const el = track.current;
    if (!el || !el.children.length) return;
    const step = el.children[0].getBoundingClientRect().width + 20;
    const first = Math.round(el.scrollLeft / step) + 1;
    const visible = Math.max(1, Math.round((el.clientWidth + 20) / step));
    setPos({
      first: Math.min(first, list.length),
      last: Math.min(first + visible - 1, list.length),
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    if (track.current) track.current.scrollLeft = 0;
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, posts]);

  const slide = (dir) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); slide(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); slide(-1); }
  };

  const chip = (active) => ({
    padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
    border: `1px solid ${active ? colors.primary : colors.border}`,
    background: active ? colors.primary : colors.white, color: active ? colors.white : colors.textLight,
  });
  const arrow = (disabled) => ({
    width: 40, height: 40, borderRadius: '50%', border: `1px solid ${colors.border}`, background: colors.white,
    color: disabled ? colors.border : colors.primary, fontSize: 18, cursor: disabled ? 'default' : 'pointer',
    boxShadow: disabled ? 'none' : '0 2px 8px rgba(15,23,42,.08)',
  });

  return (
    <div>
      <style>{`
        .bs-track{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;
          padding:4px 2px 18px;-webkit-overflow-scrolling:touch;scrollbar-width:thin;overscroll-behavior-x:contain}
        .bs-track:focus-visible{outline:2px solid ${colors.primary};outline-offset:4px;border-radius:10px}
        .bs-card{flex:0 0 calc((100% - 40px) / 3);scroll-snap-align:start;min-width:0}
        @media (max-width:900px){.bs-card{flex-basis:calc((100% - 20px) / 2)}}
        .bs-hint-phone{display:none}
        @media (max-width:600px){.bs-card{flex-basis:85%}.bs-arrows,.bs-hint-desk{display:none!important}.bs-hint-phone{display:inline}}
        .bs-card:hover{transform:translateY(-2px)}
      `}</style>

      <div role="group" aria-label="Filter op onderwerp" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1rem' }}>
        {FILTERS.filter((f) => counts[f] > 0).map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} style={chip(filter === f)}>
            {f} <span style={{ opacity: 0.7, fontWeight: 400 }}>{counts[f]}</span>
          </button>
        ))}
      </div>

      <div ref={track} className="bs-track" tabIndex={0} onScroll={measure} onKeyDown={onKey}
        role="region" aria-roledescription="carrousel" aria-label="Blogartikelen">
        {list.map((post, i) => (
          <button key={post.id} type="button" className="bs-card" onClick={() => navigate(postPath(post))}
            aria-label={`${i + 1} van ${list.length}: ${post.title}`}
            style={{ background: colors.white, border: `1px solid ${colors.border}`, borderTop: `4px solid ${colors.primary}`, borderRadius: 10, padding: '1.5rem', boxShadow: '0 1px 2px rgba(15,23,42,.04), 0 12px 32px rgba(15,23,42,.06)', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '.6rem', font: 'inherit', color: 'inherit', transition: 'transform .15s' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: colors.primary, textTransform: 'uppercase', letterSpacing: '.06em' }}>{post.category}</span>
            <span style={{ fontFamily: fonts.serif, fontSize: 21, lineHeight: 1.3, color: colors.text }}>{post.title}</span>
            <span style={{ fontSize: 14, lineHeight: 1.6, color: colors.textLight, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</span>
            <span style={{ fontSize: 13, color: colors.textLight, marginTop: 'auto' }}>{post.date}{post.readTime ? ` · ${post.readTime}` : ''}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 4 }}>
        <span aria-live="polite" style={{ fontSize: 13, color: colors.textLight }}>
          {pos.first === pos.last ? pos.first : `${pos.first}–${pos.last}`} van {list.length}
          <span className="bs-hint-desk" style={{ marginLeft: 8 }}>· scroll of gebruik de pijltjes</span>
          <span className="bs-hint-phone" style={{ marginLeft: 8 }}>· veeg voor meer</span>
        </span>
        <div className="bs-arrows" style={{ display: 'flex', gap: 8 }}>
          <button type="button" aria-label="Vorige artikelen" disabled={pos.atStart} onClick={() => slide(-1)} style={arrow(pos.atStart)}>←</button>
          <button type="button" aria-label="Volgende artikelen" disabled={pos.atEnd} onClick={() => slide(1)} style={arrow(pos.atEnd)}>→</button>
        </div>
      </div>
    </div>
  );
}
