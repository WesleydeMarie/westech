import React, { useState } from 'react';
 
export default function Techwes() {
  const [currentPage, setCurrentPage] = useState('home');
  const [email, setEmail] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);
 
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Microsoft Purview',
      date: 'May 2025',
      category: 'Purview',
      excerpt: 'A comprehensive introduction to Microsoft Purview and how it can transform your data governance strategy.',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Data Loss Prevention Best Practices',
      date: 'April 2025',
      category: 'DLP',
      excerpt: 'Essential strategies for implementing effective Data Loss Prevention policies in your organization.',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'My MVP Journey Begins',
      date: 'March 2025',
      category: 'Journey',
      excerpt: 'Why I decided to pursue the Microsoft MVP award and what drives my passion for data governance.',
      readTime: '4 min read'
    }
  ];
 
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
 
  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Navigation */}
      <nav style={{
        borderBottom: '1px solid #e5e7eb',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: 0,
        background: 'white',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#1e3a8a' }}>techwes</div>
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
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#1e3a8a'}
                  onMouseLeave={(e) => e.target.style.background = '#1e3a8a'}
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
                >
                  Learn About Me
                </button>
              </div>
 
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
                    <span style={{ color: '#1e3a8a', fontWeight: '500' }}>60%</span>
                  </div>
                  <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '60%', background: '#1e3a8a' }}></div>
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
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>Blog</h1>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '2rem' }}>Insights and learnings on my path to Microsoft MVP</p>
            
            <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
              {blogPosts.map(post => (
                <article key={post.id} style={{
                  padding: '1.5rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>{post.title}</h2>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '13px', color: '#9ca3af' }}>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span style={{ color: '#1e3a8a', fontWeight: '500' }}>{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6' }}>{post.excerpt}</p>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    color: '#1e3a8a',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    marginTop: '1rem',
                    padding: 0
                  }}>
                    Read more →
                  </button>
                </article>
              ))}
            </div>
 
            {/* Newsletter Signup */}
            <div style={{
              background: '#f3f4f6',
              padding: '2rem',
              borderRadius: '12px',
              maxWidth: '500px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>Subscribe to Updates</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '1.5rem' }}>Get notified when new blog posts are published</p>
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
                    cursor: 'pointer'
                  }}
                >
                  Subscribe
                </button>
              </form>
              {showSuccess && <p style={{ fontSize: '13px', color: '#10b981', marginTop: '1rem' }}>✓ Thanks for subscribing!</p>}
            </div>
          </div>
        )}
 
        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '700px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '600', color: '#1a1a1a', marginBottom: '2rem' }}>About Me</h1>
            
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem' }}>Wesley de Marie</h2>
              <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                I'm a data governance enthusiast and cloud solutions architect passionate about helping organizations build secure, compliant, and efficient data ecosystems. Currently on the path to becoming a Microsoft MVP, focusing on Microsoft Purview and modern data governance practices.
              </p>
            </div>
 
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem' }}>Focus Areas</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Microsoft Purview & Data Governance', 'Data Loss Prevention (DLP)', 'Cloud Security & Compliance', 'Information Protection', 'Regulatory Compliance (GDPR, HIPAA)'].map(item => (
                  <li key={item} style={{ fontSize: '15px', color: '#6b7280', marginBottom: '0.75rem', paddingLeft: '24px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#1e3a8a' }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
 
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem' }}>Connect With Me</h3>
              <a href="https://www.linkedin.com/in/wesley-d-551a019b/" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block',
                padding: '10px 16px',
                background: '#1e3a8a',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background 0.2s'
              }}>
                Visit LinkedIn →
              </a>
            </div>
 
            <div style={{
              background: '#f3f4f6',
              padding: '1.5rem',
              borderRadius: '8px',
              borderLeft: '4px solid #1e3a8a'
            }}>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>
                <strong style={{ color: '#1a1a1a' }}>Fun fact:</strong> I'm a big believer in continuous learning and sharing knowledge. This blog is my way of documenting my MVP journey and helping others in the data governance space.
              </p>
            </div>
          </div>
        )}
 
        {/* CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>Get In Touch</h1>
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
                  transition: 'background 0.2s'
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
        textAlign: 'center'
      }}>
        <p>© 2025 Techwes. All rights reserved. | <a href="https://www.linkedin.com/in/wesley-d-551a019b/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>LinkedIn</a></p>
      </footer>
    </div>
  );
}