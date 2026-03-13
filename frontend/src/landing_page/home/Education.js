import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const RESOURCES = [
  {
    icon: '📚',
    title: 'ArthaVidya',
    desc: 'The largest free stock market education library in India. From basics to advanced F&O strategies.',
    href: '/learn',
    tag: '200+ modules',
  },
  {
    icon: '💬',
    title: 'TradeTalk Community',
    desc: 'India\'s most active trading Q&A forum. Ask, discuss, and learn from 5 lakh+ fellow investors.',
    href: '/community',
    tag: '5L+ members',
  },
  {
    icon: '🎯',
    title: 'ArthaGrow Simulator',
    desc: 'Practice trading with virtual ₹10 lakhs on live market data. Zero risk. Real learning.',
    href: '/simulator',
    tag: 'Free forever',
  },
];

function Education() {
  const ref = useRef(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.reveal') || [];
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    items.forEach(i => observer.observe(i));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ag-section" ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="ag-education">

          {/* Left: resources list */}
          <div>
            <div className="ag-section__label reveal">Learn & Grow</div>
            <h2 className="ag-section__heading reveal reveal-delay-1">
              Free education.<br />
              <span style={{
                background: 'var(--grad-text)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Real returns.
              </span>
            </h2>
            <p className="ag-section__sub reveal reveal-delay-2" style={{ marginBottom: '2rem' }}>
              We believe informed investors make better decisions.
              That's why everything we build for education is free — forever.
            </p>

            {RESOURCES.map((r, i) => (
              <Link
                key={i}
                to={r.href}
                className={`ag-resource reveal reveal-delay-${i + 1}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="ag-resource__icon">{r.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="ag-resource__title">{r.title}</span>
                    <span style={{
                      fontSize: '0.62rem', fontWeight: 700, padding: '0.15rem 0.4rem',
                      borderRadius: '100px', background: 'rgba(107,175,122,0.1)',
                      border: '1px solid rgba(107,175,122,0.2)', color: 'var(--green-sage)',
                      letterSpacing: '0.06em'
                    }}>
                      {r.tag}
                    </span>
                  </div>
                  <div className="ag-resource__desc">{r.desc}</div>
                </div>
                <span className="ag-resource__arrow">→</span>
              </Link>
            ))}
          </div>

          {/* Right: decorative mockup */}
          <div className="ag-education__visual reveal reveal-delay-2">
            <div className="ag-education__mockup">
              <div className="ag-education__mockup-bar">
                <div className="ag-education__mockup-dot" style={{ background: '#CC5F5F' }} />
                <div className="ag-education__mockup-dot" style={{ background: '#C9A84C' }} />
                <div className="ag-education__mockup-dot" style={{ background: '#6BAF7A' }} />
              </div>

              {/* Fake lesson cards */}
              {[
                { title: 'Candlestick Patterns', progress: 78, color: 'var(--green-sage)' },
                { title: 'Options Greeks',       progress: 45, color: 'var(--gold)' },
                { title: 'Portfolio Hedging',    progress: 22, color: 'var(--green-mint)' },
                { title: 'Intraday Strategies',  progress: 91, color: 'var(--green-sage)' },
              ].map((lesson, i) => (
                <div key={i} style={{
                  background: 'var(--bg-elevated)',
                  borderRadius: '8px', padding: '0.875rem 1rem',
                  marginBottom: '0.6rem',
                  border: '1px solid rgba(107,175,122,0.07)'
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {lesson.title}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: lesson.color, fontFamily: 'var(--font-mono)' }}>
                      {lesson.progress}%
                    </span>
                  </div>
                  <div style={{
                    height: '4px', borderRadius: '2px',
                    background: 'var(--bg-void)', overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%', borderRadius: '2px',
                      width: `${lesson.progress}%`,
                      background: lesson.color,
                      transition: 'width 1s var(--ease)'
                    }} />
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: '1rem', padding: '0.75rem',
                background: 'rgba(107,175,122,0.06)',
                borderRadius: '8px', border: '1px solid rgba(107,175,122,0.12)',
                fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center'
              }}>
                🎓 &nbsp;4.2 lakh learners active this month
              </div>
            </div>

            {/* Floating badge */}
            <div style={{
              position: 'absolute', bottom: '-20px', right: '-16px',
              background: 'var(--bg-card)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '12px', padding: '0.75rem 1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: '0 12px 30px rgba(0,0,0,0.4)'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🏆</span>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold)' }}>
                  Best Edu Platform
                </div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                  Fintech India 2025
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Education;