import React, { useState } from 'react';
import { blogPosts } from './blogPosts';

export default function Techwes() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [email, setEmail] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const allBlogPosts = blogPosts;
  const featuredPost = allBlogPosts.find(post => post.featured);
  const selectedPost = allBlogPosts.find(post => post.id === selectedPostId);
  const filteredPosts = selectedCategory 
    ? allBlogPosts.filter(post => post.category === selectedCategory && !post.featured)
    : allBlogPosts.filter(post => !post.featured);
  
  const latestPosts = [...allBlogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const categories = [...new Set(allBlogPosts.map(post => post.category))];

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
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' }
  ];

  const categoryColors = {
    'Purview': '#1e3a8a',
    'DLP': '#2563eb',
    'MVP Journey': '#059669'
  };

  // Blog Detail Page
  if (selectedPostId) {
    return (
      <div style={{ minHeight: '100vh', background: '#faf8f3' }}>
        {/* Navigation */}
        <nav style={{
          borderBottom: '1px solid #e5e7eb',
          padding: '1.5rem 2rem',
          position: 'sticky',
          top: 0,
          background: '#faf8f3',
          zIndex: 10
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#1e3a8a', cursor: 'pointer' }} onClick={() => { setCurrentPage('home'); setSelectedPostId(null); }}>techwes</div>
            <button
              onClick={() => { setCurrentPage('blog'); setSelectedPostId(null); }}
              style={{
                background: '#1e3a8a',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#162e6f'}
              onMouseLeave={(e) => e.target.style.background = '#1e3a8a'}
            >
              ← Back to Blog
            </button>
          </div>
        </nav>

        {/* Blog Post Content */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
          {selectedPost && (
            <article>
              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '42px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem', lineHeight: '1.2' }}>
                  {selectedPost.title}
                </h1>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '14px', color: '#6b7280', marginBottom: '2rem' }}>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span style={{ color: categoryColors[selectedPost.category] || '#1e3a8a', fontWeight: '500' }}>{selectedPost.category}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              {/* Blog Content */}
              <div style={{
                fontSize: '16px',
                color: '#4b5563',
                lineHeight: '1.8',
                background: '#ffffff',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                {selectedPost.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={index} style={{ fontSize: '28px', fontWeight: '600', color: '#1a1a1a', marginTop: '2rem', marginBottom: '1rem' }}>{paragraph.replace('# ', '')}</h1>;
                  }
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index} style={{ fontSize: '22px', fontWeight: '600', color: '#1a1a1a', marginTop: '1.5rem', marginBottom: '1rem' }}>{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index} style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginTop: '1rem', marginBottom: '0.5rem' }}>{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return <li key={index} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>{paragraph.replace('- ', '')}</li>;
                  }
                  if (paragraph.trim() === '') {
                    return <div key={index} style={{ height: '0.5rem' }}></div>;
                  }
                  return <p key={index} style={{ marginBottom: '1rem' }}>{paragraph}</p>;
                })}
              </div>

              {/* Author Bio */}
              <div style={{
                background: '#f3f4f6',
                padding: '1.5rem',
                borderRadius: '8px',
                marginTop: '2rem',
                borderLeft: '4px solid #1e3a8a'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>About the Author</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Wesley de Marie is een security consultant met 12 jaar ervaring in data governance en compliance. Gepassioneerd over Microsoft Purview en het helpen van organisaties hun data veilig in te richten.
                </p>
                <a href="https://www.linkedin.com/in/wesley-d-551a019b/" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block',
                  fontSize: '14px',
                  color: '#1e3a8a',
                  textDecoration: 'none',
                  fontWeight: '500',
                  borderBottom: '1px solid #1e3a8a'
                }}>
                  Connect on LinkedIn →
                </a>
              </div>

              {/* Newsletter CTA */}
              <div style={{
                background: '#f3f4f6',
                padding: '2rem',
                borderRadius: '12px',
                marginTop: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>📧 Don't Miss New Articles</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '1.5rem' }}>Get insights on data governance, Purview, and MVP journey delivered weekly</p>
                <form onSubmit={handleNewsletterSignup} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '10px 16px',
                      background: '#1e3a8a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#162e6f'}
                    onMouseLeave={(e) => e.target.style.background = '#1e3a8a'}
                  >
                    Subscribe
                  </button>
                </form>
                {showSuccess && <p style={{ fontSize: '13px', color: '#10b981', marginTop: '1rem' }}>✓ Thanks for subscribing!</p>}
              </div>
            </article>
          )}
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid #e5e7eb',
          padding: '2rem',
          marginTop: '3rem',
          color: '#9ca3af',
          fontSize: '14px',
          textAlign: 'center',
          background: '#faf8f3'
        }}>
          <p>© 2025 Techwes. All rights reserved. | <a href="https://www.linkedin.com/in/wesley-d-551a019b/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>LinkedIn</a></p>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f3' }}>
      {/* Navigation */}
      <nav style={{
        borderBottom: '1px solid #e5e7eb',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: 0,
        background: '#faf8f3',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#1e3a8a', cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>techwes</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '15px',
                  cursor: 'pointer',
                  color: currentPage === item.page ? '#1e3a8a' : '#6b7280',
                  fontWeight: currentPage === item.page ? '500' : '400',
                  paddingBottom: '4px',
                  borderBottom: currentPage === item.page ? '2px solid #1e3a8a' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div style={{ maxWidth: '700px' }}>
              <h1 style={{ fontSize: '48px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem', lineHeight: '1.2' }}>
                Welcome to Techwes
              </h1>
              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '2rem', lineHeight: '1.7' }}>
                A journey towards becoming a Microsoft MVP, focusing on data governance, Microsoft Purview, and cloud solutions. Here you'll find insights, best practices, and lessons learned along the way.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                <button
                  onClick={() => setCurrentPage('blog')}
                  style={{
                    padding: '12px 28px',
                    background: '#1e3a8a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(30, 58, 138, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#162e6f';
                    e.target.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#1e3a8a';
                    e.target.style.boxShadow = '0 2px 8px rgba(30, 58, 138, 0.15)';
                  }}
                >
                  Read the Blog
                </button>
                <button
                  onClick={() => setCurrentPage('about')}
                  style={{
                    padding: '12px 28px',
                    background: 'white',
                    color: '#1e3a8a',
                    border: '1px solid #1e3a8a',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f0f5ff'}
                  onMouseLeave={(e) => e.target.style.background = 'white'}
                >
                  Learn About Me
                </button>
              </div>

              {/* FEATURED POST ON HOME PAGE */}
              {featuredPost && (
                <div style={{
                  padding: '2.5rem',
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #162e6f 100%)',
                  borderRadius: '12px',
                  color: 'white',
                  marginBottom: '3rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(30, 58, 138, 0.2)'
                }}
                onClick={() => setSelectedPostId(featuredPost.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(30, 58, 138, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{ background: 'rgba(255,255,255,0.25)', display: 'inline-block', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', marginBottom: '1rem', letterSpacing: '0.5px' }}>
                    ⭐ FEATURED ARTICLE
                  </div>
                  <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '1rem', lineHeight: '1.3' }}>{featuredPost.title}</h2>
                  <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '1.5rem', opacity: 0.95 }}>{featuredPost.excerpt}</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '13px', opacity: 0.85 }}>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              )}

              {/* MVP Progress */}
              <div style={{ background: '#f3f4f6', padding: '2rem', borderRadius: '12px', marginTop: '3rem' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1.5rem' }}>MVP Journey Progress</h2>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '14px' }}>
                    <span style={{ color: '#6b7280' }}>Community Engagement</span>
                    <span style={{ color: '#1e3a8a', fontWeight: '500' }}>45%</span>
                  </div>
                  <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '45%', background: '#1e3a8a' }}></div>
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '14px' }}>
                    <span style={{ color: '#6b7280' }}>Blog & Content</span>
                    <span style={{ color: '#1e3a8a', fontWeight: '500' }}>65%</span>
                  </div>
                  <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '65%', background: '#1e3a8a' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '14px' }}>
                    <span style={{ color: '#6b7280' }}>Technical Expertise</span>
                    <span style={{ color: '#1e3a8a', fontWeight: '500' }}>70%</span>
                  </div>
                  <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '70%', background: '#1e3a8a' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BLOG PAGE */}
        {currentPage === 'blog' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }}>
            {/* MAIN BLOG SECTION */}
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>Blog</h1>
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '2rem' }}>Insights and learnings on my path to Microsoft MVP</p>
              
              {/* Category Filter */}
              <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <button
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    padding: '8px 16px',
                    background: selectedCategory === null ? '#1e3a8a' : 'white',
                    color: selectedCategory === null ? 'white' : '#6b7280',
                    border: selectedCategory === null ? 'none' : '1px solid #e5e7eb',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  All Posts
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '8px 16px',
                      background: selectedCategory === cat ? categoryColors[cat] : 'white',
                      color: selectedCategory === cat ? 'white' : '#6b7280',
                      border: selectedCategory === cat ? 'none' : '1px solid #e5e7eb',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Blog Posts */}
              <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
                {filteredPosts.map(post => (
                  <article 
                    key={post.id} 
                    onMouseEnter={() => setHoveredPostId(post.id)}
                    onMouseLeave={() => setHoveredPostId(null)}
                    style={{
                      padding: '1.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      background: hoveredPostId === post.id ? '#ffffff' : '#faf8f3',
                      transition: 'all 0.3s ease',
                      boxShadow: hoveredPostId === post.id ? '0 8px 24px rgba(30, 58, 138, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
                      transform: hoveredPostId === post.id ? 'translateY(-4px)' : 'translateY(0)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ marginBottom: '1rem' }}>
                      <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>{post.title}</h2>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '13px', color: '#9ca3af', marginBottom: '0.75rem' }}>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span style={{ color: categoryColors[post.category] || '#1e3a8a', fontWeight: '500' }}>{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem' }}>{post.excerpt}</p>
                    
                    {/* AUTHOR BIO */}
                    <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginBottom: '1rem' }}>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>By <strong style={{ color: '#1a1a1a' }}>Wesley de Marie</strong> • Data Governance Advocate</p>
                    </div>

                    <button 
                      onClick={() => setSelectedPostId(post.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#1e3a8a',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.2s'
                      }}>
                      Read more →
                    </button>
                  </article>
                ))}
              </div>

              {/* NEWSLETTER CTA */}
              <div style={{
                background: '#f3f4f6',
                padding: '2rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>📧 Don't Miss New Articles</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '1.5rem' }}>Get insights on data governance, Purview, and MVP journey delivered weekly</p>
                <form onSubmit={handleNewsletterSignup} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '10px 16px',
                      background: '#1e3a8a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#162e6f'}
                    onMouseLeave={(e) => e.target.style.background = '#1e3a8a'}
                  >
                    Subscribe
                  </button>
                </form>
                {showSuccess && <p style={{ fontSize: '13px', color: '#10b981', marginTop: '1rem' }}>✓ Thanks for subscribing!</p>}
              </div>
            </div>

            {/* SIDEBAR - LATEST POSTS */}
            <div style={{ display: 'grid', gap: '2rem' }}>
              {/* Latest Posts Widget */}
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1.5rem' }}>Latest Posts</h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {latestPosts.map(post => (
                    <div key={post.id} style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', cursor: 'pointer' }} onClick={() => setSelectedPostId(post.id)}>
                      <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '0.25rem' }}>{post.date}</p>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                        {post.title}
                      </h4>
                      <span style={{ fontSize: '12px', color: 'white', background: categoryColors[post.category], padding: '2px 8px', borderRadius: '4px' }}>
                        {post.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* About the Author */}
              <div style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', borderLeft: '4px solid #1e3a8a' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem' }}>About the Author</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Wesley de Marie is een security consultant met 12 jaar ervaring. Gepassioneerd over data governance en Microsoft Purview.
                </p>
                <a href="https://www.linkedin.com/in/wesley-d-551a019b/" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block',
                  fontSize: '13px',
                  color: '#1e3a8a',
                  textDecoration: 'none',
                  fontWeight: '500',
                  borderBottom: '1px solid #1e3a8a'
                }}>
                  Connect on LinkedIn →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h1 style={{ fontSize: '42px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem' }}>Over Mij</h1>
              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '3rem', lineHeight: '1.7' }}>
                Hallo! Ik ben Wesley de Marie, 30 jaar oud en afkomstig uit Nederland. Ik ben een security consultant met een passie voor data governance en Microsoft Purview.
              </p>

              {/* Introduction */}
              <div style={{ background: '#f3f4f6', padding: '2rem', borderRadius: '12px', marginBottom: '3rem', borderLeft: '4px solid #1e3a8a' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem' }}>Wie Ben Ik?</h2>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.8' }}>
                  Met 12 jaar werkervaring heb ik mijn carrière opgebouwd in IT security en compliance. Ik ben ervan overtuigd dat goed beveiligde data de basis is van een veilige organisatie. Mijn specialiteit ligt in het configureren van Microsoft security solutions en het helpen van organisaties een betere data governance na te streven.
                </p>
              </div>

              {/* My Journey */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1.5rem' }}>Mijn Carrière</h2>
                
                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>Het Begin: GFK Servicedesk</h3>
                  <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.7' }}>
                    Mijn eerste IT baan was op de servicedesk van GFK. Daar heb ik geleerd hoe supporteren werkt en hoe je users helpt met hun technische problemen. Dit is een waardevolle basis geweest voor alles wat ik nu doe.
                  </p>
                </div>

                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>Het Wendpunt: Security & Compliance Training</h3>
                  <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.7' }}>
                    Tijdens een Microsoft Fundamentals (MS900) training voelde ik iets klikken. Security en compliance spaken me aan - het was de connectie die ik zocht. Ik realiseerde me dat dit mijn volgende stap zou zijn. Ik wilde niet zomaar IT support geven, ik wilde organisaties helpen hun data veilig in te richten.
                  </p>
                </div>

                <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>Mijn Technische Expertise</h3>
                  <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.7', marginBottom: '1rem' }}>
                    In de loop der jaren heb ik diep kennis opgebouwd van diverse Microsoft security platforms:
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['Microsoft Entra (Azure AD)', 'Intune - Device Management', 'Microsoft Defender XDR - Threat Protection', 'Microsoft Defender for Office 365 (MDO)', 'Microsoft Purview - Data Governance'].map(item => (
                      <li key={item} style={{ fontSize: '15px', color: '#6b7280', marginBottom: '0.75rem', paddingLeft: '24px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#1e3a8a', fontWeight: 'bold' }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>Waarom Purview?</h3>
                  <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.7' }}>
                    5 jaar geleden ontdekte ik Microsoft Purview. Op dat moment kwam AI om de hoek kijken, en ik besefte dat data beveiliging eigenlijk heel belangrijk gaat worden. Purview was voor mij het perfecte instrument om organisaties te helpen hun data governance op orde te krijgen. Nu, 5 jaar later, is dit mijn specialiteit en mijn passie.
                  </p>
                </div>
              </div>

              {/* MVP Mission */}
              <div style={{ background: '#f3f4f6', padding: '2rem', borderRadius: '12px', marginBottom: '3rem', borderLeft: '4px solid #1e3a8a' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem' }}>Waarom Microsoft MVP?</h2>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.8', marginBottom: '1rem' }}>
                  Ik geloof dat de juiste security configuratie van cruciaal belang is. Te veel organisaties hebben security configured, maar doen het niet goed. Dit leidt tot gaten in hun beveiliging en compliance issues.
                </p>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.8' }}>
                  Mijn doel is om andere IT professionals de juiste weg te wijzen. Door MVP te worden, kan ik een groter platform krijgen om kennis te delen. Ik wil bloggen, presentaties geven, en misschien zelfs YouTube filmpjes maken. Mijn droom is om beter te worden in wat ik nu doe en mijn netwerk uit te breiden zodat ik meer kan helpen.
                </p>
              </div>

              {/* What I'm Doing Now */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1.5rem' }}>Wat Ik Nu Doe</h2>
                <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', padding: '2rem', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e3a8a', marginBottom: '0.5rem' }}>🖊️ Blogs Schrijven</h3>
                  <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
                    Ik schrijf momenteel blogs over Microsoft Purview, data governance, en security best practices. Deze site (techwes.nl) is mijn platform om kennis te delen.
                  </p>
                  
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e3a8a', marginBottom: '0.5rem' }}>🎤 Toekomstige Presentaties</h3>
                  <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
                    Ik plan zeker presentaties te geven op conferenties en meetups. Dit wil ik verder uitbouwen en ontwikkelen.
                  </p>
                  
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e3a8a', marginBottom: '0.5rem' }}>📹 YouTube (Toekomst)</h3>
                  <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.7' }}>
                    Ik overweeg YouTube video's te maken om technische concepts visueel uit te leggen. Dit is mijn volgende stap!
                  </p>
                </div>
              </div>

              {/* Personal */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1.5rem' }}>Buiten Het Werk</h2>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.8', marginBottom: '1rem' }}>
                  Buiten werktijden ben ik graag bezig met sporten. Vissen is mijn favoriete hobby - het is een moment om even alles los te laten en van de natuur te genieten.
                </p>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.8' }}>
                  Wat mij drijft is mijn overtuiging dat communicatie en samenwerking kunnen worden geleerd. Ik kijk alles positief in. Dat is mijn mindset: bekijk alles positief en je ziet mogelijkheden.
                </p>
              </div>

              {/* Call to Action */}
              <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #162e6f 100%)', padding: '2rem', borderRadius: '12px', color: 'white', textAlign: 'center' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '1rem' }}>Laten We Verbinden!</h2>
                <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>
                  Wil je discussiëren over data governance, Purview of security? Laten we contact opnemen!
                </p>
                <a href="https://www.linkedin.com/in/wesley-d-551a019b/" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  background: 'white',
                  color: '#1e3a8a',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Connect op LinkedIn →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>Contact</h1>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '2rem' }}>Have questions or want to collaborate? I'd love to hear from you.</p>
            
            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '0.5rem' }}>Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '0.5rem' }}>Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '0.5rem' }}>Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '12px 28px',
                  background: '#1e3a8a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#162e6f';
                  e.target.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#1e3a8a';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Send Message
              </button>
              {showSuccess && <p style={{ fontSize: '14px', color: '#10b981' }}>✓ Message sent! I'll get back to you soon.</p>}
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #e5e7eb',
        padding: '2rem',
        marginTop: '3rem',
        color: '#9ca3af',
        fontSize: '14px',
        textAlign: 'center',
        background: '#faf8f3'
      }}>
        <p>© 2025 Techwes. All rights reserved. | <a href="https://www.linkedin.com/in/wesley-d-551a019b/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>LinkedIn</a></p>
      </footer>
    </div>
  );
}