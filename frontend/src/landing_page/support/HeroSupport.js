import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SUGGESTIONS = [
  'How do I add funds to my account?',
  'Why is my order getting rejected?',
  'How do I activate F&O segment?',
  'How to withdraw funds?',
  'How do I track my IPO application?',
  'What are the margin requirements?',
];

const QUICK_LINKS = [
  { label: 'Track account opening', href: '#' },
  { label: 'Track segment activation', href: '#' },
  { label: 'Intraday margins', href: '#' },
  { label: 'Platform user manual', href: '#' },
];

const FEATURED = [
  { label: 'Current Takeovers & Delistings — March 2026', tag: 'Corporate Actions', href: '#' },
  { label: 'Latest Intraday leverages — MIS & CO limits', tag: 'Trading', href: '#' },
  { label: 'New SEBI margin rules effective April 2026',  tag: 'Regulatory', href: '#' },
  { label: 'ArthaKite 4.0 — What\'s new & how to use it', tag: 'Platform Update', href: '#' },
];

const STATUS = [
  { service: 'Trading Platform',    status: 'operational' },
  { service: 'Order Execution',     status: 'operational' },
  { service: 'Fund Transfer',       status: 'degraded'    },
  { service: 'Mobile App',          status: 'operational' },
];

function HeroSupport() {
  const [query, setQuery]         = useState('');
  const [focused, setFocused]     = useState(false);
  const [filtered, setFiltered]   = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (query.length > 1) {
      setFiltered(SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFiltered([]);
    }
  }, [query]);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.reveal') || [];
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    items.forEach(i => observer.observe(i));
    return () => observer.disconnect();
  }, []);

  const statusColor = s => s === 'operational' ? '#6BAF7A' : s === 'degraded' ? '#C9A84C' : '#CC5F5F';
  const statusLabel = s => s === 'operational' ? 'Operational' : s === 'degraded' ? 'Degraded' : 'Down';

  return (
    <div ref={ref}>
      {/* ── HERO ── */}
      <section style={{
        padding: 'calc(var(--nav-h) + 4rem) 5% 5rem',
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, #0C1A0E 0%, var(--bg-void) 60%)',
        borderBottom: '1px solid rgba(107,175,122,0.07)',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(107,175,122,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(107,175,122,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 30%, black 10%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,107,71,0.14) 0%, transparent 65%)',
          top: '40%', left: '30%', transform: 'translate(-50%,-50%)', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Top bar */}
          <div className="reveal" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem',
          }}>
            <div>
              <div className="ag-section__label" style={{ marginBottom: '0.5rem' }}>Support Portal</div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
              }}>
                How can we{' '}
                <span style={{
                  background: 'var(--grad-text)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  help you?
                </span>
              </h1>
            </div>
            <Link to="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.25rem', borderRadius: '8px',
              border: '1px solid rgba(107,175,122,0.25)',
              background: 'rgba(107,175,122,0.06)',
              color: 'var(--green-sage)', textDecoration: 'none',
              fontSize: '0.82rem', fontWeight: 600,
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(107,175,122,0.12)'; e.currentTarget.style.borderColor = 'rgba(107,175,122,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(107,175,122,0.06)'; e.currentTarget.style.borderColor = 'rgba(107,175,122,0.25)'; }}
            >
              🎫 Track my tickets
            </Link>
          </div>

          {/* Two-col: Search + Featured */}
          <div className="ag-support-grid">

            {/* Left: Search */}
            <div className="reveal reveal-delay-1">
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '1.05rem',
                fontWeight: 300, color: 'var(--text-secondary)',
                lineHeight: 1.7, marginBottom: '1.25rem',
              }}>
                Search for an answer or browse help topics below to create a support ticket.
              </p>

              {/* Search box */}
              <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <div style={{
                  position: 'absolute', left: '1rem', top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '1rem', color: 'var(--text-muted)', pointerEvents: 'none',
                }}>
                  🔍
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 200)}
                  placeholder="e.g. why is my order getting rejected..."
                  style={{
                    width: '100%', padding: '1rem 1rem 1rem 2.75rem',
                    background: 'var(--bg-card)',
                    border: `1px solid ${focused ? 'rgba(107,175,122,0.4)' : 'rgba(107,175,122,0.15)'}`,
                    borderRadius: 'var(--radius)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-display)', fontSize: '0.9rem',
                    outline: 'none', transition: 'border-color 0.25s',
                    boxShadow: focused ? '0 0 0 3px rgba(107,175,122,0.08)' : 'none',
                  }}
                />

                {/* Autocomplete */}
                {focused && filtered.length > 0 && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(107,175,122,0.2)',
                    borderRadius: 'var(--radius)', overflow: 'hidden',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.4)', zIndex: 10,
                  }}>
                    {filtered.map((s, i) => (
                      <div key={i} onClick={() => setQuery(s)} style={{
                        padding: '0.75rem 1rem',
                        borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                        color: 'var(--text-secondary)', fontSize: '0.85rem',
                        cursor: 'pointer', transition: 'background 0.15s',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(107,175,122,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>🔍</span>
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick links */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {QUICK_LINKS.map((l, i) => (
                  <a key={i} href={l.href} style={{
                    fontSize: '0.75rem', fontWeight: 500,
                    padding: '0.35rem 0.75rem', borderRadius: '100px',
                    border: '1px solid rgba(107,175,122,0.15)',
                    background: 'rgba(107,175,122,0.04)',
                    color: 'var(--text-muted)', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--green-sage)'; e.currentTarget.style.borderColor = 'rgba(107,175,122,0.35)'; e.currentTarget.style.background = 'rgba(107,175,122,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(107,175,122,0.15)'; e.currentTarget.style.background = 'rgba(107,175,122,0.04)'; }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>

              {/* System status */}
              <div style={{
                marginTop: '2rem',
                background: 'var(--bg-card)',
                border: '1px solid rgba(107,175,122,0.08)',
                borderRadius: 'var(--radius)', padding: '1.25rem',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: '0.875rem',
                }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    System Status
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--green-sage)', fontWeight: 600 }}>
                    ● All systems operational
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {STATUS.map((s, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{s.service}</span>
                      <span style={{
                        display: 'flex', alignItems: 'center', gap: '0.3rem',
                        fontSize: '0.7rem', fontWeight: 600, color: statusColor(s.status),
                      }}>
                        <span style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: statusColor(s.status),
                          boxShadow: `0 0 5px ${statusColor(s.status)}`,
                        }} />
                        {statusLabel(s.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Featured */}
            <div className="reveal reveal-delay-2">
              <h3 style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--green-sage)', marginBottom: '1rem',
              }}>
                Featured Articles
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {FEATURED.map((item, i) => (
                  <a key={i} href={item.href} style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '1rem 1.25rem',
                      background: 'var(--bg-card)',
                      border: '1px solid rgba(107,175,122,0.08)',
                      borderRadius: 'var(--radius)',
                      transition: 'all 0.25s',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(107,175,122,0.25)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(107,175,122,0.08)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                    >
                      <div>
                        <div style={{
                          fontSize: '0.6rem', fontWeight: 700, color: 'var(--green-sage)',
                          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem',
                        }}>
                          {item.tag}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {item.label}
                        </div>
                      </div>
                      <span style={{ color: 'var(--text-faint)', fontSize: '0.9rem', flexShrink: 0 }}>→</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Contact options */}
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { icon: '📧', label: 'Email Support', sub: 'Response in 4–6 hours', href: 'mailto:support@arthagrow.com' },
                  { icon: '💬', label: 'Live Chat', sub: 'Available 9am – 6pm IST', href: '#' },
                ].map((c, i) => (
                  <a key={i} href={c.href} style={{
                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                    padding: '0.875rem 1.25rem',
                    background: 'rgba(107,175,122,0.04)',
                    border: '1px solid rgba(107,175,122,0.1)',
                    borderRadius: 'var(--radius)', textDecoration: 'none',
                    transition: 'all 0.25s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(107,175,122,0.08)'; e.currentTarget.style.borderColor = 'rgba(107,175,122,0.25)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(107,175,122,0.04)'; e.currentTarget.style.borderColor = 'rgba(107,175,122,0.1)'; }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.label}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.sub}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--text-faint)', fontSize: '0.85rem' }}>→</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSupport;