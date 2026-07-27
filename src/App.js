import React, { useState, useEffect } from 'react';
import '@fontsource/newsreader/400.css';
import '@fontsource/newsreader/500.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import { blogPosts } from './blogPosts';

// --- Routing ----------------------------------------------------------------
// Maakt van een titel een URL-slug: "Custom SITs in Purview" -> "custom-sits-in-purview"
function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const postSlug = (post) => post.slug || slugify(post.title);

// Houdt React-state in sync met de browser-URL (pushState + popstate),
// zodat F5, de terug-knop en directe links gewoon werken.
function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  const navigate = (to) => {
    if (to !== window.location.pathname) {
      window.history.pushState(null, '', to);
    }
    setPath(to);
    window.scrollTo(0, 0);
  };
  return [path, navigate];
}

export default function Techwes() {
  const [path, navigate] = usePath();
  const [email, setEmail] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const today = new Date();
  const allBlogPosts = blogPosts.filter(post => {
    if (!post.publishDate) return true;
    return new Date(post.publishDate) <= today;
  });
  const featuredPost = allBlogPosts.find(post => post.featured);

  // De URL is de single source of truth voor pagina en artikel.
  // Slugs uit de URL worden alleen gebruikt om op te zoeken in eigen data — nooit gerenderd.
  let segments = [];
  try {
    segments = path.split('/').filter(Boolean).map(decodeURIComponent);
  } catch (err) {
    segments = [];
  }
  const pageMap = { blog: 'blog', 'over-mij': 'about', contact: 'contact' };
  const currentPage = segments.length === 0 ? 'home' : (pageMap[segments[0]] || 'notfound');
  const detailSlug = segments.length > 1 ? segments[1] : null;

  const selectedPost = detailSlug && segments[0] === 'blog'
    ? allBlogPosts.find(post => postSlug(post) === detailSlug)
    : undefined;
  const postPath = (post) => '/blog/' + postSlug(post);

  const filteredPosts = selectedCategory
    ? allBlogPosts.filter(post => post.category === selectedCategory && !post.featured)
    : allBlogPosts.filter(post => !post.featured);
  
  const latestPosts = [...allBlogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const categories = ['Purview', 'Defender', 'AI'];
  // Royal Tech Color Palette
  const colors = {
    primary: '#1e40af',
    primaryDark: '#1e3a8a',
    primaryLight: '#dbeafe',
    accent: '#f97316',
    accentDark: '#ea580c',
    accentLight: '#fed7aa',
    background: '#f8fafc',
    white: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    border: '#cbd5e1',
    success: '#10b981',
  };

  const fonts = {
    serif: "'Newsreader', Georgia, 'Times New Roman', serif",
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  };

  useEffect(() => {
    document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    document.body.style.webkitFontSmoothing = 'antialiased';
    document.body.style.textRendering = 'optimizeLegibility';
  }, []);

  useEffect(() => {
    if (selectedPost) {
      document.title = selectedPost.title + ' | Techwes';
    } else {
      document.title = 'Techwes';
    }
  }, [selectedPost]);

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    setEmail('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactForm({ name: '', email: '', message: '' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const navItems = [
    { label: 'Home', page: 'home', path: '/' },
    { label: 'Blog', page: 'blog', path: '/blog' },
    { label: 'Over Mij', page: 'about', path: '/over-mij' },
    { label: 'Contact', page: 'contact', path: '/contact' }
  ];

  // BLOG DETAIL PAGE
  if (detailSlug && segments[0] === 'blog') {
    return (
      <div style={{ minHeight: '100vh', background: colors.background }}>
        <nav style={{ borderBottom: `1px solid ${colors.border}`, padding: '1.5rem 2rem', position: 'sticky', top: 0, background: colors.primary, zIndex: 10 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: fonts.serif, fontSize: '26px', fontWeight: '400', letterSpacing: '0.01em', color: colors.white, cursor: 'pointer' }} onClick={() => navigate('/')}>techwes</div>
            <button onClick={() => navigate('/blog')} style={{ background: colors.accent, color: colors.white, border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>← Terug naar Blog</button>
          </div>
        </nav>

        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '4.5rem 2rem 3rem' }}>
          {selectedPost && (
            <article>
              <h1 style={{ fontFamily: fonts.serif, fontSize: '44px', fontWeight: '400', color: colors.text, marginBottom: '1.25rem', lineHeight: '1.18', letterSpacing: '-0.01em' }}>{selectedPost.title}</h1>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '13px', color: colors.textLight, marginBottom: '3rem', paddingBottom: '2rem', borderBottom: `1px solid ${colors.border}` }}>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span style={{ color: colors.primary, fontWeight: '500' }}>{selectedPost.category}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <div style={{ fontSize: '18px', color: colors.text, lineHeight: '1.75' }}>
                {(() => {
                  const lines = selectedPost.content.split('\n');
                  const elements = [];
                  let i = 0;
                  while (i < lines.length) {
                    const line = lines[i];
                    const isTableRow = /^\s*\|.*\|\s*$/.test(line);
                    const isSeparatorRow = /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] || '');
                    if (isTableRow && isSeparatorRow) {
                      const headerCells = line.split('|').slice(1, -1).map(c => c.trim());
                      let j = i + 2;
                      const rows = [];
                      while (j < lines.length && /^\s*\|.*\|\s*$/.test(lines[j])) {
                        rows.push(lines[j].split('|').slice(1, -1).map(c => c.trim()));
                        j++;
                      }
                      elements.push(
                        <div key={i} style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
                            <thead>
                              <tr>
                                {headerCells.map((cell, ci) => (
                                  <th key={ci} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: `2px solid ${colors.border}`, fontWeight: '600', color: colors.text }}>{cell}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((row, ri) => (
                                <tr key={ri} style={{ background: ri % 2 === 1 ? colors.background : 'transparent' }}>
                                  {row.map((cell, ci) => (
                                    <td key={ci} style={{ padding: '10px 14px', borderBottom: `1px solid ${colors.border}`, color: colors.textLight, verticalAlign: 'top' }}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                      i = j;
                      continue;
                    }
                    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
                    if (imageMatch) {
                      elements.push(<img key={i} src={imageMatch[2]} alt={imageMatch[1]} style={{ maxWidth: '100%', borderRadius: '8px', margin: '1.5rem 0', border: `1px solid ${colors.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />);
                    } else if (line.startsWith('# ')) {
                      // titel wordt elders al getoond
                    } else if (line.startsWith('## ')) {
                      elements.push(<h2 key={i} style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: '400', color: colors.text, marginTop: '3rem', marginBottom: '1rem', lineHeight: '1.3' }}>{line.replace('## ', '')}</h2>);
                    } else if (line.startsWith('### ')) {
                      elements.push(<h3 key={i} style={{ fontFamily: fonts.serif, fontSize: '21px', fontWeight: '500', color: colors.text, marginTop: '2rem', marginBottom: '0.5rem' }}>{line.replace('### ', '')}</h3>);
                    } else if (line.startsWith('- ')) {
                      elements.push(<li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>{line.replace('- ', '')}</li>);
                    } else if (line.trim() === '') {
                      elements.push(<div key={i} style={{ height: '0.5rem' }}></div>);
                    } else {
                      elements.push(<p key={i} style={{ marginBottom: '1.5rem' }}>{line}</p>);
                    }
                    i++;
                  }
                  return elements;
                })()}
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginTop: '4rem', paddingTop: '2rem', borderTop: `1px solid ${colors.border}` }}>
                <img src="/images/wesley-avatar.jpg" alt="Wesley de Marie" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: fonts.serif, fontSize: '19px', fontWeight: '500', color: colors.text, marginBottom: '0.35rem' }}>Wesley de Marie</p>
                  <p style={{ fontSize: '15px', color: colors.textLight, lineHeight: '1.65', marginBottom: '0.75rem' }}>Security consultant in Nederland. Schrijft over Microsoft Purview, Defender en de securitykant van AI, op basis van wat er in productie daadwerkelijk gebeurt.</p>
                  <a href="https://www.linkedin.com/in/wesley-d-551a019b/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: colors.accent, textDecoration: 'none', fontWeight: '500', borderBottom: `1px solid ${colors.accent}` }}>Connect op LinkedIn</a>
                </div>
              </div>
            </article>
          )}
          {!selectedPost && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <h1 style={{ fontFamily: fonts.serif, fontSize: '32px', fontWeight: '400', color: colors.text, marginBottom: '1rem' }}>Artikel niet gevonden</h1>
              <p style={{ fontSize: '16px', color: colors.textLight, marginBottom: '2rem' }}>Dit artikel bestaat niet (meer), of de link klopt niet.</p>
              <button onClick={() => navigate('/blog')} style={{ padding: '12px 28px', background: colors.primary, color: colors.white, border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>Naar de Blog</button>
            </div>
          )}
        </div>

        <footer style={{ borderTop: `1px solid ${colors.border}`, padding: '2rem', marginTop: '3rem', color: colors.textLight, fontSize: '14px', textAlign: 'center', background: colors.background }}>
          <p>© 2026 Techwes. Alle rechten voorbehouden. | <a href="https://www.linkedin.com/in/wesley-d-551a019b/" style={{ color: colors.primary, textDecoration: 'none' }}>LinkedIn</a></p>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      <nav style={{ borderBottom: `1px solid ${colors.border}`, padding: '1.5rem 2rem', position: 'sticky', top: 0, background: colors.primary, zIndex: 10, boxShadow: '0 2px 8px rgba(30, 64, 175, 0.15)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: fonts.serif, fontSize: '26px', fontWeight: '400', letterSpacing: '0.01em', color: colors.white, cursor: 'pointer' }} onClick={() => navigate('/')}>techwes</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {navItems.map(item => (
              <button key={item.page} onClick={() => navigate(item.path)} style={{ background: 'none', border: 'none', fontSize: '15px', cursor: 'pointer', color: currentPage === item.page ? colors.white : 'rgba(255,255,255,0.8)', fontWeight: currentPage === item.page ? '500' : '400', paddingBottom: '4px', borderBottom: currentPage === item.page ? `2px solid ${colors.accent}` : 'none' }}>{item.label}</button>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {currentPage === 'home' && (
          <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div style={{ maxWidth: '700px' }}>
              <h1 style={{ fontFamily: fonts.serif, fontSize: '52px', fontWeight: '400', color: colors.text, marginBottom: '1.25rem', lineHeight: '1.15', letterSpacing: '-0.015em' }}>Techwes</h1>
              <p style={{ fontSize: '18px', color: colors.textLight, marginBottom: '2rem', lineHeight: '1.7' }}>Praktijkgerichte analyses over Microsoft Purview, Defender en AI-security. Geschreven voor security- en complianceprofessionals die verder willen dan de documentatie.</p>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                <button onClick={() => navigate('/blog')} style={{ padding: '12px 28px', background: colors.primary, color: colors.white, border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 2px 8px rgba(30, 64, 175, 0.2)' }}>Lees de Blog</button>
                <button onClick={() => navigate('/over-mij')} style={{ padding: '12px 28px', background: colors.white, color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '6px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>Over Mij</button>
              </div>

              {featuredPost && (
                <div style={{ padding: '2.5rem', background: colors.primaryDark, borderRadius: '12px', color: colors.white, marginBottom: '3rem', cursor: 'pointer' }} onClick={() => navigate(postPath(featuredPost))}>
                  <div style={{ color: colors.accentLight, fontSize: '12px', fontWeight: '500', marginBottom: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Uitgelicht</div>
                  <h2 style={{ fontFamily: fonts.serif, fontSize: '32px', fontWeight: '400', marginBottom: '1rem', lineHeight: '1.25' }}>{featuredPost.title}</h2>
                  <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '1.5rem', opacity: 0.95 }}>{featuredPost.excerpt}</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '13px', opacity: 0.85 }}>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {currentPage === 'blog' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h1 style={{ fontFamily: fonts.serif, fontSize: '40px', fontWeight: '400', color: colors.text, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>Blog</h1>
              <p style={{ fontSize: '16px', color: colors.textLight, marginBottom: '2rem' }}>Diepgaande analyses van Microsoft Purview, ai & Defender — vanuit de praktijk</p>
              
              <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <button onClick={() => setSelectedCategory(null)} style={{ padding: '8px 16px', background: selectedCategory === null ? colors.primary : colors.white, color: selectedCategory === null ? colors.white : colors.textLight, border: selectedCategory === null ? 'none' : `1px solid ${colors.border}`, borderRadius: '20px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Alle Posts</button>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '8px 16px', background: selectedCategory === cat ? colors.primary : colors.white, color: selectedCategory === cat ? colors.white : colors.textLight, border: selectedCategory === cat ? 'none' : `1px solid ${colors.border}`, borderRadius: '20px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>{cat}</button>
                ))}
              </div>

              <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
                {filteredPosts.map(post => (
                  <article key={post.id} onMouseEnter={() => setHoveredPostId(post.id)} onMouseLeave={() => setHoveredPostId(null)} style={{ padding: '1.5rem', border: `1px solid ${colors.border}`, borderRadius: '8px', background: hoveredPostId === post.id ? colors.white : colors.background, boxShadow: hoveredPostId === post.id ? '0 8px 24px rgba(30, 64, 175, 0.1)' : 'none', transform: hoveredPostId === post.id ? 'translateY(-4px)' : 'translateY(0)', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <h2 style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: '400', color: colors.text, marginBottom: '0.6rem', lineHeight: '1.3' }}>{post.title}</h2>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '13px', color: colors.textLight, marginBottom: '0.75rem' }}>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span style={{ color: colors.primary, fontWeight: '500' }}>{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '15px', color: colors.textLight, lineHeight: '1.6', marginBottom: '1rem' }}>{post.excerpt}</p>
                    <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '1rem', marginBottom: '1rem' }}>
                      <p style={{ fontSize: '12px', color: colors.textLight }}>Door <strong style={{ color: colors.text }}>Wesley de Marie</strong> • Security Consultant</p>
                    </div>
                    <button onClick={() => navigate(postPath(post))} style={{ background: 'none', border: 'none', color: colors.accent, fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: 0 }}>Lees meer →</button>
                  </article>
                ))}
              </div>

              <div style={{ background: colors.primaryLight, padding: '2rem', borderRadius: '12px', marginBottom: '2rem', border: `1px solid ${colors.border}`, borderLeft: `4px solid ${colors.accent}` }}>
                <h3 style={{ fontFamily: fonts.serif, fontSize: '20px', fontWeight: '500', color: colors.text, marginBottom: '0.5rem' }}>Mis geen nieuwe artikelen</h3>
                <p style={{ fontSize: '14px', color: colors.textLight, marginBottom: '1.5rem' }}>Krijg nieuwe analyses over Purview, Defender en AI-security wekelijks in je inbox</p>
                <form onSubmit={handleNewsletterSignup} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="email" placeholder="jouw@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ flex: 1, padding: '10px 12px', border: `1px solid ${colors.border}`, borderRadius: '6px', fontSize: '14px', outline: 'none' }} />
                  <button type="submit" style={{ padding: '10px 16px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)' }}>Abonneer</button>
                </form>
                {showSuccess && <p style={{ fontSize: '13px', color: colors.success, marginTop: '1rem' }}>Bedankt, je bent aangemeld.</p>}
              </div>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
              <div style={{ background: colors.white, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.text, marginBottom: '1.5rem' }}>Laatste Posts</h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {latestPosts.map(post => (
                    <div key={post.id} style={{ paddingBottom: '1.5rem', borderBottom: `1px solid ${colors.border}`, cursor: 'pointer' }} onClick={() => navigate(postPath(post))}>
                      <p style={{ fontSize: '13px', color: colors.textLight, marginBottom: '0.25rem' }}>{post.date}</p>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem', lineHeight: '1.3' }}>{post.title}</h4>
                      <span style={{ fontSize: '12px', color: colors.white, background: colors.primary, padding: '2px 8px', borderRadius: '4px' }}>{post.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: colors.primaryLight, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '1.5rem', borderLeft: `4px solid ${colors.accent}` }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: colors.text, marginBottom: '1rem' }}>Over de Auteur</h3>
                <p style={{ fontSize: '13px', color: colors.textLight, lineHeight: '1.6', marginBottom: '1rem' }}>Wesley de Marie is een security consultant met 12 jaar ervaring. Gepassioneerd over data governance en Microsoft Purview.</p>
                <a href="https://www.linkedin.com/in/wesley-d-551a019b/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '13px', color: colors.accent, textDecoration: 'none', fontWeight: '600', borderBottom: `1px solid ${colors.accent}` }}>Connect op LinkedIn →</a>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'notfound' && (
          <div style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
            <h1 style={{ fontFamily: fonts.serif, fontSize: '40px', fontWeight: '400', color: colors.text, marginBottom: '1rem' }}>Pagina niet gevonden</h1>
            <p style={{ fontSize: '16px', color: colors.textLight, marginBottom: '2rem' }}>De pagina die je zoekt bestaat niet (meer).</p>
            <button onClick={() => navigate('/')} style={{ padding: '12px 28px', background: colors.primary, color: colors.white, border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>Terug naar Home</button>
          </div>
        )}

        {currentPage === 'about' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '4rem' }}>
                <div style={{ flex: '1 1 320px', minWidth: '280px' }}>
                  <h1 style={{ fontFamily: fonts.serif, fontSize: '44px', fontWeight: '400', color: colors.text, marginBottom: '1.25rem', letterSpacing: '-0.01em', lineHeight: '1.15' }}>Over mij</h1>
                  <p style={{ fontSize: '19px', color: colors.textLight, lineHeight: '1.7', marginBottom: '1rem' }}>Ik ben Wesley de Marie, security consultant in Nederland. Ik richt me op Microsoft Purview, Entra, Intune en Defender, en op de vraag die daaronder ligt: hoe je databeveiliging zo inricht dat een organisatie er ook mee kan werken.</p>
                  <p style={{ fontSize: '19px', color: colors.textLight, lineHeight: '1.7' }}>Op deze site schrijf ik daarover voor vakgenoten, op basis van wat er in productie daadwerkelijk gebeurt.</p>
                </div>
                <div style={{ flex: '0 0 300px', maxWidth: '300px' }}>
                  <img src="/images/wesley-portret.jpg" alt="Wesley de Marie" style={{ width: '100%', borderRadius: '12px', display: 'block' }} />
                </div>
              </div>

              <div style={{ background: colors.primaryLight, padding: '2rem', borderRadius: '12px', marginBottom: '3rem', borderLeft: `4px solid ${colors.accent}` }}>
                <h2 style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: '400', color: colors.text, marginBottom: '1rem' }}>Wie ben ik</h2>
                <p style={{ fontSize: '16px', color: colors.textLight, lineHeight: '1.8' }}>Met 12 jaar werkervaring heb ik mijn carrière opgebouwd in IT security en compliance. Ik ben ervan overtuigd dat goed beveiligde data de basis is van een veilige organisatie. Mijn specialiteit ligt in het configureren van Microsoft security solutions en het helpen van organisaties een betere data governance na te streven.</p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: '400', color: colors.text, marginBottom: '1.5rem' }}>Mijn carrière</h2>
                
                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: `1px solid ${colors.border}` }}>
                  <h3 style={{ fontFamily: fonts.serif, fontSize: '21px', fontWeight: '500', color: colors.text, marginBottom: '0.5rem' }}>Mijn passie voor IT begon al heel vroeg op school</h3>
                  <p style={{ fontSize: '15px', color: colors.textLight, lineHeight: '1.7' }}>Mijn eerste IT baan was op de servicedesk/werkplekbeheerder. Daar heb ik geleerd hoe supporten werkt en hoe je users helpt met hun technische problemen.</p>
                </div>

                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: `1px solid ${colors.border}` }}>
                  <h3 style={{ fontFamily: fonts.serif, fontSize: '21px', fontWeight: '500', color: colors.text, marginBottom: '0.5rem' }}>Het wendpunt: security en compliance training</h3>
                  <p style={{ fontSize: '15px', color: colors.textLight, lineHeight: '1.7' }}>Tijdens een Microsoft Fundamentals (MS900) training voelde ik iets klikken. Security en compliance spraken mij aan, dat was de connectie die ik zocht.</p>
                </div>

                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: `1px solid ${colors.border}` }}>
                  <h3 style={{ fontFamily: fonts.serif, fontSize: '21px', fontWeight: '500', color: colors.text, marginBottom: '0.5rem' }}>Mijn technische expertise</h3>
                  <p style={{ fontSize: '15px', color: colors.textLight, lineHeight: '1.7', marginBottom: '1rem' }}>In de loop der jaren heb ik diepgaande kennis opgebouwd van diverse Microsoft security platforms:</p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['Microsoft Entra (Azure AD)', 'Intune - Device Management', 'Microsoft Defender XDR - Threat Protection', 'Microsoft Defender for Office 365 (MDO)', 'Microsoft Purview - Data Governance'].map(item => (
                      <li key={item} style={{ fontSize: '15px', color: colors.textLight, marginBottom: '0.75rem', paddingLeft: '24px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: colors.accent, fontWeight: 'bold' }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontFamily: fonts.serif, fontSize: '21px', fontWeight: '500', color: colors.text, marginBottom: '0.5rem' }}>Waarom Purview</h3>
                  <p style={{ fontSize: '15px', color: colors.textLight, lineHeight: '1.7' }}>5 jaar geleden ontdekte ik Microsoft Purview. Op dat moment kwam AI om de hoek kijken, en ik besefte dat data beveiliging belangrijker zou worden dan ooit. Purview was voor mij het perfecte instrument om organisaties te helpen.</p>
                </div>
              </div>

              <div style={{ background: colors.primaryLight, padding: '2rem', borderRadius: '12px', marginBottom: '3rem', borderLeft: `4px solid ${colors.accent}` }}>
                <h2 style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: '400', color: colors.text, marginBottom: '1rem' }}>Waarom Microsoft MVP</h2>
                <p style={{ fontSize: '16px', color: colors.textLight, lineHeight: '1.8', marginBottom: '1rem' }}>Ik geloof dat de juiste security configuratie van cruciaal belang is. Te veel organisaties hebben security geconfigureerd, maar doen het niet goed.</p>
                <p style={{ fontSize: '16px', color: colors.textLight, lineHeight: '1.8' }}>Mijn doel is om andere IT professionals de juiste weg te wijzen. Door MVP te worden, kan ik een groter platform krijgen om kennis te delen.</p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: '400', color: colors.text, marginBottom: '1.5rem' }}>Buiten het werk</h2>
                <p style={{ fontSize: '16px', color: colors.textLight, lineHeight: '1.8', marginBottom: '1rem' }}>Buiten werktijden ben ik graag bezig met sporten. Vissen is mijn favoriete hobby, een moment om alles los te laten.</p>
                <p style={{ fontSize: '16px', color: colors.textLight, lineHeight: '1.8' }}>Wat mij drijft is mijn overtuiging dat communiceren je kunt leren. Ik kijk alles positief in.</p>
              </div>

              <div style={{ background: colors.primaryDark, padding: '2.5rem', borderRadius: '12px', color: colors.white }}>
                <h2 style={{ fontFamily: fonts.serif, fontSize: '26px', fontWeight: '400', marginBottom: '0.75rem' }}>Laten we verbinden</h2>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>Wil je sparren over data governance, Purview of de securitykant van AI? Ik hoor het graag.</p>
                <a href="https://www.linkedin.com/in/wesley-d-551a019b/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 24px', background: colors.accent, color: colors.white, textDecoration: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '500' }}>Connect op LinkedIn</a>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: fonts.serif, fontSize: '40px', fontWeight: '400', color: colors.text, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>Neem contact op</h1>
            <p style={{ fontSize: '16px', color: colors.textLight, marginBottom: '2rem' }}>Vragen of wil je samenwerken? Ik hoor graag van je.</p>
            
            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: colors.text, marginBottom: '0.5rem' }}>Naam</label>
                <input type="text" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required style={{ width: '100%', padding: '12px', border: `1px solid ${colors.border}`, borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: colors.text, marginBottom: '0.5rem' }}>Email</label>
                <input type="email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} required style={{ width: '100%', padding: '12px', border: `1px solid ${colors.border}`, borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: colors.text, marginBottom: '0.5rem' }}>Bericht</label>
                <textarea value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} required rows="6" style={{ width: '100%', padding: '12px', border: `1px solid ${colors.border}`, borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }} />
              </div>

              <button type="submit" style={{ padding: '12px 28px', background: colors.accent, color: colors.white, border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)' }}>Verstuur Bericht</button>
              {showSuccess && <p style={{ fontSize: '14px', color: colors.success }}>Bericht verstuurd, ik kom snel bij je terug.</p>}
            </form>
          </div>
        )}
      </div>

      <footer style={{ borderTop: `1px solid ${colors.border}`, padding: '2rem', marginTop: '3rem', color: colors.textLight, fontSize: '14px', textAlign: 'center', background: colors.background }}>
        <p>© 2026 Techwes. Alle rechten voorbehouden. | <a href="https://www.linkedin.com/in/wesley-d-551a019b/" style={{ color: colors.accent, textDecoration: 'none', fontWeight: '500' }}>LinkedIn</a></p>
      </footer>
    </div>
  );
}