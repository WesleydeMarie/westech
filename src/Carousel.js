// Eenvoudige horizontale slider: vegen op telefoon, pijltjes op desktop, pijltjestoetsen.
// Geen externe libraries (CSP: script-src 'self'). Gebruikt voor de levels van Tenant Admin.
import React, { Children, useEffect, useRef, useState } from 'react';

export default function Carousel({ id, label, children, perView = 2, start = 0, gap = 16, palette, ofText = 'van', prevText = 'Vorige', nextText = 'Volgende' }) {
  const track = useRef(null);
  const items = Children.toArray(children);
  const [pos, setPos] = useState({ first: 1, last: 1, atStart: true, atEnd: false });

  const measure = () => {
    const el = track.current;
    if (!el || !el.children.length) return;
    const step = el.children[0].getBoundingClientRect().width + gap;
    const first = Math.round(el.scrollLeft / step) + 1;
    const visible = Math.max(1, Math.round((el.clientWidth + gap) / step));
    setPos({
      first: Math.min(first, items.length),
      last: Math.min(first + visible - 1, items.length),
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  // Begin bij het opgegeven item (bijv. het nieuwste speelbare level).
  useEffect(() => {
    const el = track.current;
    if (el && el.children[start]) el.scrollLeft = el.children[start].offsetLeft - el.children[0].offsetLeft;
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, items.length]);

  const slide = (dir) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); slide(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); slide(-1); }
  };
  const arrow = (disabled) => ({
    // Zelfde pijltjes als de blogslider (BlogSlider.js), zodat alle sliders op de site gelijk zijn.
    width: 40, height: 40, borderRadius: '50%', border: `1px solid ${palette.border}`, background: palette.white,
    color: disabled ? palette.border : palette.primary, fontSize: 18, cursor: disabled ? 'default' : 'pointer', padding: 0,
    boxShadow: disabled ? 'none' : '0 2px 8px rgba(15,23,42,.08)',
  });
  const basis = `calc((100% - ${(perView - 1) * gap}px) / ${perView})`;

  return (
    <div>
      <style>{`
        .${id}-track{display:flex;gap:${gap}px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;
          padding:2px 2px 12px;-webkit-overflow-scrolling:touch;scrollbar-width:thin;overscroll-behavior-x:contain}
        .${id}-track:focus-visible{outline:2px solid ${palette.primary};outline-offset:4px;border-radius:10px}
        .${id}-item{flex:0 0 ${basis};scroll-snap-align:start;min-width:0;display:flex}
        .${id}-item>*{flex:1}
        @media (max-width:600px){.${id}-item{flex-basis:85%}}
      `}</style>
      <div ref={track} className={`${id}-track`} tabIndex={0} onScroll={measure} onKeyDown={onKey}
        role="region" aria-roledescription="carrousel" aria-label={label}>
        {items.map((child, i) => <div key={i} className={`${id}-item`}>{child}</div>)}
      </div>
      {items.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span aria-live="polite" style={{ fontSize: 13, color: palette.mute }}>{pos.first === pos.last ? pos.first : `${pos.first}–${pos.last}`} {ofText} {items.length}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" aria-label={prevText} disabled={pos.atStart} onClick={() => slide(-1)} style={arrow(pos.atStart)}>←</button>
            <button type="button" aria-label={nextText} disabled={pos.atEnd} onClick={() => slide(1)} style={arrow(pos.atEnd)}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}
