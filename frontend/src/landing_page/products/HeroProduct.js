import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const TECH_STATS = [
  { val: '<10ms',  label: 'Order latency' },
  { val: '99.9%',  label: 'Uptime SLA' },
  { val: '150+',   label: 'Chart indicators' },
  { val: '5 Cr+',  label: 'Orders/day' },
];

function HeroProduct() {
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
    <section ref={ref} style={{
      padding: 'calc(var(--nav-h) + 5rem) 5% 5rem',
      position: 'relative', overflow: 'hidden',
      borderBottom: '1px solid rgba(107,175,122,0.07)',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(107,175,122,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(107,175,122,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 10%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(58,107,71,0.12) 0%, transparent 65%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <div className="ag-section__label reveal" style={{ justifyContent: 'center' }}>
            The Platform
          </div>

          <h1 className="reveal reveal-delay-1" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 800, lineHeight: 1.08,
            letterSpacing: '-0.035em', marginBottom: '1.25rem',
          }}>
            Technology built for{' '}
            <span style={{
              background: 'var(--grad-text)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>serious traders.</span>
          </h1>

          <p className="reveal reveal-delay-2" style={{
            fontFamily: 'var(--font-serif)', fontSize: '1.15rem',
            fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.75,
            marginBottom: '2rem',
          }}>
            Sleek, modern, and blindingly fast. Every product in the ArthaGrow
            suite is engineered from the ground up for the Indian market —
            no compromises, no bloat.
          </p>

          <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <Link to="/signup" className="ag-btn-primary">Open Free Account →</Link>
            <Link to="#platforms" className="ag-btn-ghost">Explore Platforms</Link>
          </div>
        </div>

        {/* Tech stats bar */}
        <div className="reveal reveal-delay-3" style={{
          display: 'flex', justifyContent: 'center',
          gap: '0', flexWrap: 'wrap',
          background: 'var(--bg-card)',
          border: '1px solid rgba(107,175,122,0.1)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden', maxWidth: '700px', margin: '0 auto',
        }}>
          {TECH_STATS.map((s, i) => (
            <div key={i} style={{
              flex: '1', minWidth: '140px',
              padding: '1.25rem 1rem', textAlign: 'center',
              borderRight: i < TECH_STATS.length - 1 ? '1px solid rgba(107,175,122,0.08)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '1.4rem',
                fontWeight: 700, color: 'var(--green-sage)',
              }}>{s.val}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', letterSpacing: '0.04em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroProduct;