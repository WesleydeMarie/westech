import React, { useState } from 'react';
import { blogPosts } from './blogPosts';
import { handleidingen } from './handleidingen';

export default function Techwes() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedHandleidingId, setSelectedHandleidingId] = useState(null);
  const [email, setEmail] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [hoveredHandleidingId, setHoveredHandleidingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedHandleidingCategory, setSelectedHandleidingCategory] = useState(null);

  const allBlogPosts = blogPosts;
  const allHandleidingen = handleidingen;
  const featuredPost = allBlogPosts.find(post => post.featured);
  const selectedPost = allBlogPosts.find(post => post.id === selectedPostId);
  const selectedHandleiding = allHandleidingen.find(h => h.id === selectedHandleidingId);
  
  const filteredPosts = selectedCategory 
    ? allBlogPosts.filter(post => post.category === selectedCategory && !post.featured)
    : allBlogPosts.filter(post => !post.featured);

  const filteredHandleidingen = selectedHandleidingCategory
    ? allHandleidingen.filter(h => h.category === selectedHandleidingCategory)
    : allHandleidingen;
  
  const latestPosts = [...allBlogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const categories = ['Purview', 'Entra', 'Intune', 'Defender'];

  const colors = {
    primary: '#0066cc',
    primaryDark: '#0052a3',
    primaryLight: '#e0f2fe',
    background: '#f8fafc',
    white: '#ffffff',
    text: '#1e293b',
    textLight: '#64748b',
    border: '#cbd5e1',
    success: '#10b981',
  };

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
    { label: 'Home', page: 'home' },
    { label: 'Blog', page: 'blog' },
    { label: 'Handleidingen', page: 'handleidingen' },
    { label: 'Over Mij', page: 'about' },
    { label: 'Contact', page: 'contact' }
  ];

  // BLOG DETAIL PAGE
  if (selectedPostId) {
    return (
      <div style={{ minHeight: '100vh', background: colors.background }}>
        <nav style={{ borderBottom: `1px solid ${colors.border}`, padding: '1.5rem 2rem', position: 'sticky', top: 0, background: colors.primary, zIndex: 10 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: colors.white, cursor: 'pointer' }} onClick={() => { setCurrentPage('home'); setSelectedPostId(null); }}>techwes</div>
            <button onClick={() => { setCurrentPage('blog'); setSelectedPostId(null); }} style={{ background: colors.primaryLight, color: colors.primary, border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>← Terug naar Blog</button>
          </div>
        </nav>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
          {selectedPost && (
            <article>
              <h1 style={{ fontSize: '42px', fontWeight: '600', color: colors.text, marginBottom: '1rem', lineHeight: '1.2' }}>{selectedPost.title}</h1>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '14px', color: colors.textLight, marginBottom: '2rem' }}>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span style={{ color: colors.primary, fontWeight: '500' }}>{selectedPost.category}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <div style={{ fontSize: '16px', color: colors.text, lineHeight: '1.8', background: colors.white, padding: '2rem', borderRadius: '8px', border: `1px solid ${colors.border}` }}>
                {selectedPost.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) return <h1 key={index} style={{ fontSize: '28px', fontWeight: '600', color: colors.text, marginTop: '2rem', marginBottom: '1rem' }}>{paragraph.replace('# ', '')}</h1>;
                  if (paragraph.startsWith('## ')) return <h2 key={index} style={{ fontSize: '22px', fontWeight: '600', color: colors.text, marginTop: '1.5rem', marginBottom: '1rem' }}>{paragraph.replace('## ', '')}</h2>;
                  if (paragraph.startsWith('### ')) return <h3 key={index} style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginTop: '1rem', marginBottom: '0.5rem' }}>{paragraph.replace('### ', '')}</h3>;
                  if (paragraph.startsWith('- ')) return <li key={index} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>{paragraph.replace('- ', '')}</li>;
                  if (paragraph.trim() === '') return <div key={index} style={{ height: '0.5rem' }}></div>;
                  return <p key={index} style={{ marginBottom: '1rem' }}>{paragraph}</p>;
                })}
              </div>

              <div style={{ background: colors.primaryLight, padding: '1.5rem', borderRadius: '8px', marginTop: '2rem', borderLeft: `4px solid ${colors.primary}` }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>Over de Auteur</h3>
                <p style={{ fontSize: '14px', color: colors.textLight, lineHeight: '1.6', marginBottom: '1rem' }}>Wesley de Marie is een security consultant met 12 jaar ervaring. Gepassioneerd over data governance en Microsoft Purview.</p>
                <a href="https://www.linkedin.com/in/wesley-d-551a019b/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '14px', color: colors.primary, textDecoration: 'none', fontWeight: '500', borderBottom: `1px solid ${colors.primary}` }}>Connect op LinkedIn →</a>
              </div>
            </article>
          )}
        </div>

        <footer style={{ borderTop: `1px solid ${colors.border}`, padding: '2rem', marginTop: '3rem', color: colors.textLight, fontSize: '14px', textAlign: 'center', background: colors.background }}>
          <p>© 2025 Techwes. Alle rechten voorbehouden. | <a href="https://www.linkedin.com/in/wesley-d-551a019b/" style={{ color: colors.primary, textDecoration: 'none' }}>LinkedIn</a></p>
        </footer>
      </div>
    );
  }

  // HANDLEIDING DETAIL PAGE
  if (selectedHandleidingId) {
    return (
      <div style={{ minHeight: '100vh', background: colors.background }}>
        <nav style={{ borderBottom: `1px solid ${colors.border}`, padding: '1.5rem 2rem', position: 'sticky', top: 0, background: colors.primary, zIndex: 10 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: colors.white, cursor: 'pointer' }} onClick={() => { setCurrentPage('home'); setSelectedHandleidingId(null); }}>techwes</div>
            <button onClick={() => { setCurrentPage('handleidingen'); setSelectedHandleidingId(null); }} style={{ background: colors.primaryLight, color: colors.primary, border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>← Terug naar Handleidingen</button>
          </div>
        </nav>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
          {selectedHandleiding && (
            <article>
              <div style={{ fontSize: '48px', marginBottom: '1rem' }}>{selectedHandleiding.icon}</div>
              <h1 style={{ fontSize: '42px', fontWeight: '600', color: colors.text, marginBottom: '1rem', lineHeight: '1.2' }}>{selectedHandleiding.title}</h1>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '14px', color: colors.textLight, marginBottom: '2rem' }}>
                <span>{selectedHandleiding.date}</span>
                <span>•</span>
                <span style={{ color: colors.primary, fontWeight: '500' }}>{selectedHandleiding.category}</span>
              </div>

              {selectedHandleiding.type === 'pdf' ? (
                <div style={{ background: colors.white, padding: '2rem', borderRadius: '8px', border: `1px solid ${colors.border}`, textAlign: 'center' }}>
                  <p style={{ fontSize: '16px', color: colors.textLight, marginBottom: '1.5rem' }}>{selectedHandleiding.description}</p>
                  <a href={selectedHandleiding.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 28px', background: colors.primary, color: colors.white, textDecoration: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '500' }}>📄 Open PDF</a>
                </div>
              ) : (
                <div style={{ fontSize: '16px', color: colors.text, lineHeight: '1.8', background: colors.white, padding: '2rem', borderRadius: '8px', border: `1px solid ${colors.border}` }}>
                  {selectedHandleiding.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) return <h1 key={index} style={{ fontSize: '28px', fontWeight: '600', color: colors.text, marginTop: '2rem', marginBottom: '1rem' }}>{paragraph.replace('# ', '')}</h1>;
                    if (paragraph.startsWith('## ')) return <h2 key={index} style={{ fontSize: '22px', fontWeight: '600', color: colors.text, marginTop: '1.5rem', marginBottom: '1rem' }}>{paragraph.replace('## ', '')}</h2>;
                    if (paragraph.startsWith('### ')) return <h3 key={index} style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginTop: '1rem', marginBottom: '0.5rem' }}>{paragraph.replace('### ', '')}</h3>;
                    if (paragraph.startsWith('- ')) return <li key={index} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>{paragraph.replace('- ', '')}</li>;
                    if (paragraph.trim() === '') return <div key={index} style={{ height: '0.5rem' }}></div>;
                    return <p key={index} style={{ marginBottom: '1rem' }}>{paragraph}</p>;
                  })}
                </div>
              )}
            </article>
          )}
        </div>

        <footer style={{ borderTop: `1px solid ${colors.border}`, padding: '2rem', marginTop: '3rem', color: colors.textLight, fontSize: '14px', textAlign: 'center', background: colors.background }}>
          <p>© 2025 Techwes. Alle rechten voorbehouden. | <a href="https://www.linkedin.com/in/wesley-d-551a019b/" style={{ color: colors.primary, textDecoration: 'none' }}>LinkedIn</a></p>
        </footer>
      </div>
    );
  }

  // MAIN APP
  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      <nav style={{ borderBottom: `1px solid ${colors.border}`, padding: '1.5rem 2rem', position: 'sticky', top: 0, background: colors.primary, zIndex: 10, boxShadow: '0 2px 8px rgba(0, 102, 204, 0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '600', color: colors.white, cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>techwes</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {navItems.map(item => (
              <button key={item.page} onClick={() => setCurrentPage(item.page)} style={{ background: 'none', border: 'none', fontSize: '15px', cursor: 'pointer', color: currentPage === item.page ? colors.white : 'rgba(255,255,255,0.8)', fontWeight: currentPage === item.page ? '500' : '400', paddingBottom: '4px', borderBottom: currentPage === item.page ? `2px solid ${colors.white}` : 'none' }}>{item.label}</button>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div style={{ maxWidth: '700px' }}>
              <h1 style={{ fontSize: '48px', fontWeight: '600', color: colors.text, marginBottom: '1rem', lineHeight: '1.2' }}>Welkom bij Techwes</h1>
              <p style={{ fontSize: '18px', color: colors.textLight, marginBottom: '2rem', lineHeight: '1.7' }}>Een reis richting Microsoft MVP, met focus op data governance, Microsoft Purview, en cloud security. Hier vind je inzichten, best practices, en lessons learned langs de weg.</p>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                <button onClick={() => setCurrentPage('blog')} style={{ padding: '12px 28px', background: colors.primary, color: colors.white, border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0, 102, 204, 0.2)' }}>Lees de Blog</button>
                <button onClick={() => setCurrentPage('about')} style={{ padding: '12px 28px', background: colors.white, color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '6px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>Over Mij</button>
              </div>

              {featuredPost && (
                <div style={{ padding: '2.5rem', background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, borderRadius: '12px', color: colors.white, marginBottom: '3rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 102, 204, 0.2)' }} onClick={() => setSelectedPostId(featuredPost.id)}>
                  <div style={{ background: 'rgba(255,255,255,0.25)', display: 'inline-block', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', marginBottom: '1rem' }}>⭐ UITGELICHT ARTIKEL</div>
                  <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '1rem', lineHeight: '1.3' }}>{featuredPost.title}</h2>
                  <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '1.5rem', opacity: 0.95 }}>{featuredPost.excerpt}</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '13px', opacity: 0.85 }}>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              )}

              <div style={{ background: colors.primaryLight, padding: '2rem', borderRadius: '12px', marginTop: '3rem', border: `1px solid ${colors.border}` }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '1.5rem' }}>MVP Reis Voortgang</h2>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '14px' }}>
                    <span style={{ color: colors.textLight }}>Community Betrokkenheid</span>
                    <span style={{ color: colors.primary, fontWeight: '500' }}>45%</span>
                  </div>
                  <div style={{ height: '8px', background: colors.border, borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '45%', background: colors.primary }}></div>
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '14px' }}>
                    <span style={{ color: colors.textLight }}>Blog & Content</span>
                    <span style={{ color: colors.primary, fontWeight: '500' }}>65%</span>
                  </div>
                  <div style={{ height: '8px', background: colors.border, borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '65%', background: colors.primary }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '14px' }}>
                    <span style={{ color: colors.textLight }}>Technische Expertise</span>
                    <span style={{ color: colors.primary, fontWeight: '500' }}>70%</span>
                  </div>
                  <div style={{ height: '8px', background: colors.border, borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '70%', background: colors.primary }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BLOG PAGE */}
        {currentPage === 'blog' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>Blog</h1>
              <p style={{ fontSize: '16px', color: colors.textLight, marginBottom: '2rem' }}>Inzichten en lessons learned op mijn pad naar Microsoft MVP</p>
              
              <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <button onClick={() => setSelectedCategory(null)} style={{ padding: '8px 16px', background: selectedCategory === null ? colors.primary : colors.white, color: selectedCategory === null ? colors.white : colors.textLight, border: selectedCategory === null ? 'none' : `1px solid ${colors.border}`, borderRadius: '20px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Alle Posts</button>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '8px 16px', background: selectedCategory === cat ? colors.primary : colors.white, color: selectedCategory === cat ? colors.white : colors.textLight, border: selectedCategory === cat ? 'none' : `1px solid ${colors.border}`, borderRadius: '20px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>{cat}</button>
                ))}
              </div>

              <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
                {filteredPosts.map(post => (
                  <article key={post.id} onMouseEnter={() => setHoveredPostId(post.id)} onMouseLeave={() => setHoveredPostId(null)} style={{ padding: '1.5rem', border: `1px solid ${colors.border}`, borderRadius: '8px', background: hoveredPostId === post.id ? colors.white : colors.background, boxShadow: hoveredPostId === post.id ? '0 8px 24px rgba(0, 102, 204, 0.1)' : 'none', transform: hoveredPostId === post.id ? 'translateY(-4px)' : 'translateY(0)', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>{post.title}</h2>
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
                      <p style={{ fontSize: '12px', color: colors.textLight }}>Door <strong style={{ color: colors.text }}>Wesley de Marie</strong> • Data Governance Advocate</p>
                    </div>
                    <button onClick={() => setSelectedPostId(post.id)} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: '14px', fontWeight: '500', cursor: 'pointer', padding: 0 }}>Lees meer →</button>
                  </article>
                ))}
              </div>

              <div style={{ background: colors.primaryLight, padding: '2rem', borderRadius: '12px', marginBottom: '2rem', border: `1px solid ${colors.border}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>📧 Mis Geen Nieuwe Artikelen</h3>
                <p style={{ fontSize: '14px', color: colors.textLight, marginBottom: '1.5rem' }}>Krijg inzichten over data governance, Purview en MVP reis wekelijks in je inbox</p>
                <form onSubmit={handleNewsletterSignup} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="email" placeholder="jouw@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ flex: 1, padding: '10px 12px', border: `1px solid ${colors.border}`, borderRadius: '6px', fontSize: '14px', outline: 'none' }} />
                  <button type="submit" style={{ padding: '10px 16px', background: colors.primary, color: colors.white, border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}>Abonneer</button>
                </form>
                {showSuccess && <p style={{ fontSize: '13px', color: colors.success, marginTop: '1rem' }}>✓ Bedankt voor je aanmelding!</p>}
              </div>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
              <div style={{ background: colors.white, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.text, marginBottom: '1.5rem' }}>Laatste Posts</h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {latestPosts.map(post => (
                    <div key={post.id} style={{ paddingBottom: '1.5rem', borderBottom: `1px solid ${colors.border}`, cursor: 'pointer' }} onClick={() => setSelectedPostId(post.id)}>
                      <p style={{ fontSize: '13px', color: colors.textLight, marginBottom: '0.25rem' }}>{post.date}</p>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem', lineHeight: '1.3' }}>{post.title}</h4>
                      <span style={{ fontSize: '12px', color: colors.white, background: colors.primary, padding: '2px 8px', borderRadius: '4px' }}>{post.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: colors.primaryLight, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '1.5rem', borderLeft: `4px solid ${colors.primary}` }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: colors.text, marginBottom: '1rem' }}>Over de Auteur</h3>
                <p style={{ fontSize: '13px', color: colors.textLight, lineHeight: '1.6', marginBottom: '1rem' }}>Wesley de Marie is een security consultant met 12 jaar ervaring. Gepassioneerd over data governance en Microsoft Purview.</p>
                <a href="https://www.linkedin.com/in/wesley-d-551a019b/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '13px', color: colors.primary, textDecoration: 'none', fontWeight: '500', borderBottom: `1px solid ${colors.primary}` }}>Connect op LinkedIn →</a>
              </div>
            </div>
          </div>
        )}

        {/* HANDLEIDINGEN PAGE */}
        {currentPage === 'handleidingen' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>Handleidingen</h1>
            <p style={{ fontSize: '16px', color: colors.textLight, marginBottom: '2rem' }}>Praktische gidsen en quick references voor Microsoft security tools</p>

            <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button onClick={() => setSelectedHandleidingCategory(null)} style={{ padding: '8px 16px', background: selectedHandleidingCategory === null ? colors.primary : colors.white, color: selectedHandleidingCategory === null ? colors.white : colors.textLight, border: selectedHandleidingCategory === null ? 'none' : `1px solid ${colors.border}`, borderRadius: '20px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Alle Handleidingen</button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedHandleidingCategory(cat)} style={{ padding: '8px 16px', background: selectedHandleidingCategory === cat ? colors.primary : colors.white, color: selectedHandleidingCategory === cat ? colors.white : colors.textLight, border: selectedHandleidingCategory === cat ? 'none' : `1px solid ${colors.border}`, borderRadius: '20px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>{cat}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {filteredHandleidingen.map(handleiding => (
                <div key={handleiding.id} onClick={() => setSelectedHandleidingId(handleiding.id)} onMouseEnter={() => setHoveredHandleidingId(handleiding.id)} onMouseLeave={() => setHoveredHandleidingId(null)} style={{ padding: '1.5rem', background: hoveredHandleidingId === handleiding.id ? colors.white : colors.background, border: `1px solid ${colors.border}`, borderRadius: '8px', cursor: 'pointer', boxShadow: hoveredHandleidingId === handleiding.id ? '0 8px 24px rgba(0, 102, 204, 0.1)' : 'none', transform: hoveredHandleidingId === handleiding.id ? 'translateY(-4px)' : 'translateY(0)', transition: 'all 0.3s ease' }}>
                  <div style={{ fontSize: '36px', marginBottom: '0.75rem' }}>{handleiding.icon}</div>
                  <div style={{ display: 'inline-block', background: colors.primaryLight, color: colors.primary, padding: '2px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '500', marginBottom: '0.75rem' }}>{handleiding.category}</div>
                  <h3 style={{ fontSize: '17px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem', lineHeight: '1.3' }}>{handleiding.title}</h3>
                  <p style={{ fontSize: '13px', color: colors.textLight, lineHeight: '1.5', marginBottom: '1rem' }}>{handleiding.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: colors.textLight }}>
                    <span>{handleiding.date}</span>
                    <span style={{ color: colors.primary, fontWeight: '500' }}>{handleiding.type === 'pdf' ? '📄 PDF' : '📝 Lezen →'}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredHandleidingen.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: colors.textLight }}>
                <p>Nog geen handleidingen in deze categorie.</p>
              </div>
            )}
          </div>
        )}

        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h1 style={{ fontSize: '42px', fontWeight: '600', color: colors.text, marginBottom: '1rem' }}>Over Mij</h1>
              <p style={{ fontSize: '18px', color: colors.textLight, marginBottom: '3rem', lineHeight: '1.7' }}>Hallo! Ik ben Wesley de Marie, 30 jaar oud en afkomstig uit Nederland. Ik ben een security consultant met een passie voor data governance en Microsoft Purview.</p>

              <div style={{ background: colors.primaryLight, padding: '2rem', borderRadius: '12px', marginBottom: '3rem', borderLeft: `4px solid ${colors.primary}` }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: colors.text, marginBottom: '1rem' }}>Wie Ben Ik?</h2>
                <p style={{ fontSize: '16px', color: colors.textLight, lineHeight: '1.8' }}>Met 12 jaar werkervaring heb ik mijn carrière opgebouwd in IT security en compliance. Ik ben ervan overtuigd dat goed beveiligde data de basis is van een veilige organisatie. Mijn specialiteit ligt in het configureren van Microsoft security solutions en het helpen van organisaties een betere data governance na te streven.</p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: colors.text, marginBottom: '1.5rem' }}>Mijn Carrière</h2>
                
                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: `1px solid ${colors.border}` }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>Het Begin: GFK Servicedesk</h3>
                  <p style={{ fontSize: '15px', color: colors.textLight, lineHeight: '1.7' }}>Mijn eerste IT baan was op de servicedesk van GFK. Daar heb ik geleerd hoe supporten werkt en hoe je users helpt met hun technische problemen.</p>
                </div>

                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: `1px solid ${colors.border}` }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>Het Wendpunt: Security & Compliance Training</h3>
                  <p style={{ fontSize: '15px', color: colors.textLight, lineHeight: '1.7' }}>Tijdens een Microsoft Fundamentals (MS900) training voelde ik iets klikken. Security en compliance spraken mij aan - het was de connectie die ik zocht.</p>
                </div>

                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: `1px solid ${colors.border}` }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>Mijn Technische Expertise</h3>
                  <p style={{ fontSize: '15px', color: colors.textLight, lineHeight: '1.7', marginBottom: '1rem' }}>In de loop der jaren heb ik diepgaande kennis opgebouwd van diverse Microsoft security platforms:</p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['Microsoft Entra (Azure AD)', 'Intune - Device Management', 'Microsoft Defender XDR - Threat Protection', 'Microsoft Defender for Office 365 (MDO)', 'Microsoft Purview - Data Governance'].map(item => (
                      <li key={item} style={{ fontSize: '15px', color: colors.textLight, marginBottom: '0.75rem', paddingLeft: '24px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: colors.primary, fontWeight: 'bold' }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>Waarom Purview?</h3>
                  <p style={{ fontSize: '15px', color: colors.textLight, lineHeight: '1.7' }}>5 jaar geleden ontdekte ik Microsoft Purview. Op dat moment kwam AI om de hoek kijken, en ik besefte dat data beveiliging belangrijker zou worden dan ooit. Purview was voor mij het perfecte instrument om organisaties te helpen.</p>
                </div>
              </div>

              <div style={{ background: colors.primaryLight, padding: '2rem', borderRadius: '12px', marginBottom: '3rem', borderLeft: `4px solid ${colors.primary}` }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: colors.text, marginBottom: '1rem' }}>Waarom Microsoft MVP?</h2>
                <p style={{ fontSize: '16px', color: colors.textLight, lineHeight: '1.8', marginBottom: '1rem' }}>Ik geloof dat de juiste security configuratie van cruciaal belang is. Te veel organisaties hebben security geconfigureerd, maar doen het niet goed.</p>
                <p style={{ fontSize: '16px', color: colors.textLight, lineHeight: '1.8' }}>Mijn doel is om andere IT professionals de juiste weg te wijzen. Door MVP te worden, kan ik een groter platform krijgen om kennis te delen.</p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: colors.text, marginBottom: '1.5rem' }}>Buiten Het Werk</h2>
                <p style={{ fontSize: '16px', color: colors.textLight, lineHeight: '1.8', marginBottom: '1rem' }}>Buiten werktijden ben ik graag bezig met sporten. Vissen is mijn favoriete hobby - het is een moment om even alles los te laten.</p>
                <p style={{ fontSize: '16px', color: colors.textLight, lineHeight: '1.8' }}>Wat mij drijft is mijn overtuiging dat communiceren je kunt leren. Ik kijk alles positief in.</p>
              </div>

              <div style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, padding: '2rem', borderRadius: '12px', color: colors.white, textAlign: 'center' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '1rem' }}>Laten We Verbinden!</h2>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>Wil je discussiëren over data governance, Purview of security? Neem contact op!</p>
                <a href="https://www.linkedin.com/in/wesley-d-551a019b/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 28px', background: colors.white, color: colors.primary, textDecoration: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600' }}>Connect op LinkedIn →</a>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '600', color: colors.text, marginBottom: '0.5rem' }}>Neem Contact Op</h1>
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

              <button type="submit" style={{ padding: '12px 28px', background: colors.primary, color: colors.white, border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>Verstuur Bericht</button>
              {showSuccess && <p style={{ fontSize: '14px', color: colors.success }}>✓ Bericht verstuurd! Ik kom snel bij je terug.</p>}
            </form>
          </div>
        )}
      </div>

      <footer style={{ borderTop: `1px solid ${colors.border}`, padding: '2rem', marginTop: '3rem', color: colors.textLight, fontSize: '14px', textAlign: 'center', background: colors.background }}>
        <p>© 2025 Techwes. Alle rechten voorbehouden. | <a href="https://www.linkedin.com/in/wesley-d-551a019b/" style={{ color: colors.primary, textDecoration: 'none' }}>LinkedIn</a></p>
      </footer>
    </div>
  );
}