import { useEffect, useRef } from 'react';

const MILESTONES = [
  { year: '2015', event: 'ArthaGrow founded with a single mission — remove every barrier between Indians and their financial growth.' },
  { year: '2017', event: 'Crossed 1 lakh clients. Launched Kite, our flagship trading platform, redefining UX for Indian traders.' },
  { year: '2019', event: 'Became India\'s largest stock broker by active clients. Zero-commission investing launched.' },
  { year: '2021', event: 'Crossed 1 crore clients. ArthaVidya education platform reaches 10 lakh learners.' },
  { year: '2023', event: 'Rainmatter Fund invested in 30+ fintech startups. ArthaGrow processes 15%+ of India\'s retail order volume.' },
  { year: '2025', event: '1.6 crore clients. ₹2.8 lakh crore in equity assets. Building the next generation of the platform.' },
];

function HeroAbout() {
  const ref = useRef(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.reveal') || [];
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    items.forEach(i => observer.observe(i));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>

      {/* ── HERO MANIFESTO ── */}
      <section style={{
        minHeight: '80vh',
        display: 'flex', alignItems: 'center',
        padding: 'calc(var(--nav-h) + 5rem) 5% 6rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', width: '700px', height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,107,71,0.13) 0%, transparent 65%)',
          top: '50%', left: '30%', transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(107,175,122,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(107,175,122,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 40% 50%, black 20%, transparent 100%)',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="ag-section__label reveal" style={{ marginBottom: '1.5rem' }}>Our Story</div>

          <h1 className="reveal reveal-delay-1" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
            fontWeight: 800, lineHeight: 1.06,
            letterSpacing: '-0.035em',
            color: 'var(--text-primary)',
            maxWidth: '820px', marginBottom: '3rem',
          }}>
            We didn't improve the system.{' '}
            <span style={{
              background: 'var(--grad-text)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              We replaced it.
            </span>
          </h1>

          {/* Two-column body */}
          <div className="ag-about-body-grid" style={{ maxWidth: '900px' }}>
            <div className="reveal reveal-delay-2">
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '1.15rem',
                fontWeight: 300, color: 'var(--text-secondary)',
                lineHeight: 1.8, marginBottom: '1.25rem',
              }}>
                ArthaGrow was born from frustration — the frustration of a trader
                who watched fees, complexity, and broken technology erode returns
                year after year. So we built the platform we always wished existed.
              </p>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '1.15rem',
                fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.8,
              }}>
                We pioneered discount broking in India, making institutional-grade
                tools and zero-cost investing available to every Indian —
                not just the privileged few.
              </p>
            </div>
            <div className="reveal reveal-delay-3">
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '1.15rem',
                fontWeight: 300, color: 'var(--text-secondary)',
                lineHeight: 1.8, marginBottom: '1.25rem',
              }}>
                Today, 1.6+ crore clients place billions of orders through our
                ecosystem every year — contributing over 15% of all Indian retail
                trading volumes. But we're far from done.
              </p>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '1.15rem',
                fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.8,
              }}>
                Through <span style={{ color: 'var(--green-sage)', fontStyle: 'italic' }}>Rainmatter</span>,
                our fintech fund, we've invested in 30+ startups working to grow
                India's capital markets. And we run free education initiatives
                that have reached over 10 lakh learners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="ag-section ag-section--alt">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="ag-section__label reveal">Journey</div>
          <h2 className="ag-section__heading reveal reveal-delay-1">
            A decade of{' '}
            <span style={{
              background: 'var(--grad-text)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>firsts.</span>
          </h2>

          <div style={{ marginTop: '3.5rem', position: 'relative' }}>
            {/* Vertical line */}
            <div className="ag-timeline-line" style={{
              position: 'absolute', left: '90px', top: 0, bottom: 0,
              width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(107,175,122,0.3) 10%, rgba(107,175,122,0.3) 90%, transparent)',
            }} />

            {MILESTONES.map((m, i) => (
              <div key={i} className={`ag-timeline-row reveal reveal-delay-${(i % 3) + 1}`} style={{
                marginBottom: '2.5rem', position: 'relative',
              }}>
                {/* Year */}
                <div className="ag-timeline-year" style={{
                  flex: '0 0 90px', textAlign: 'right',
                  fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
                  fontWeight: 700, color: 'var(--green-sage)',
                  paddingTop: '0.25rem', letterSpacing: '0.04em',
                }}>
                  {m.year}
                </div>

                {/* Dot */}
                <div className="ag-timeline-dot" style={{
                  position: 'absolute', left: '82px', top: '6px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: 'var(--bg-void)',
                  border: '2px solid var(--green-forest)',
                  boxShadow: '0 0 10px rgba(107,175,122,0.3)',
                  flexShrink: 0,
                }} />

                {/* Event */}
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(107,175,122,0.09)',
                  borderRadius: 'var(--radius)', padding: '1.1rem 1.4rem',
                  flex: 1, marginLeft: '1rem',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(107,175,122,0.25)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(107,175,122,0.09)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1rem',
                    fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY PILLARS ── */}
      <section className="ag-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="ag-section__label reveal">What we believe</div>
          <h2 className="ag-section__heading reveal reveal-delay-1">
            Our philosophy.
          </h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem', marginTop: '3rem',
          }}>
            {[
              { icon: '🚫', title: 'No gimmicks', body: 'No gamification, no spam, no pushy notifications. We respect your intelligence and your time.' },
              { icon: '💰', title: 'Customer first, always', body: 'Every product decision is weighed against one question: is this good for our client?' },
              { icon: '🔓', title: 'Radical transparency', body: 'All our charges are flat, published, and unchanged since day one. No hidden costs, ever.' },
              { icon: '🌱', title: 'Long-term thinking', body: 'We invest in education, open-source, and fintech because a growing market benefits everyone.' },
            ].map((p, i) => (
              <div key={i} className={`ag-feature-card reveal reveal-delay-${i + 1}`}>
                <div className="ag-feature-card__glow" />
                <div className="ag-feature-card__icon">{p.icon}</div>
                <div className="ag-feature-card__title">{p.title}</div>
                <div className="ag-feature-card__body">{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default HeroAbout;