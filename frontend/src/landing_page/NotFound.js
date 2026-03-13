import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TICKER_MSGS = [
  'PAGE_NOT_FOUND',
  'ERROR_404',
  'ROUTE_UNDEFINED',
  'NULL_POINTER',
  'LOST_IN_MARKET',
  'POSITION_UNKNOWN',
];

function NotFound() {
  const navigate  = useNavigate();
  const [tick, setTick]       = useState(0);
  const [counter, setCounter] = useState(10);

  /* rotating ticker message */
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % TICKER_MSGS.length), 1400);
    return () => clearInterval(id);
  }, []);

  /* auto-redirect countdown */
  useEffect(() => {
    if (counter === 0) { navigate('/'); return; }
    const id = setTimeout(() => setCounter(c => c - 1), 1000);
    return () => clearTimeout(id);
  }, [counter, navigate]);

  /* circumference for svg ring */
  const R  = 28;
  const C  = 2 * Math.PI * R;
  const pct = counter / 10;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'calc(var(--nav-h) + 2rem) 5% 4rem',
      position: 'relative', overflow: 'hidden',
      textAlign: 'center',
    }}>

      {/* ── BACKGROUND ── */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'linear-gradient(rgba(107,175,122,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(107,175,122,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'gridDrift 24s linear infinite',
      }} />
      <div style={{
        position: 'fixed', width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(204,95,95,0.08) 0%, transparent 65%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'glowPulse 6s ease-in-out infinite',
      }} />
      <div style={{
        position: 'fixed', width: '400px', height: '400px', borderRadius: '50%',
        background: 'rgba(58,107,71,0.08)', filter: 'blur(90px)',
        top: '5%', right: '-5%', pointerEvents: 'none', zIndex: 0,
        animation: 'orbFloat 14s ease-in-out infinite',
      }} />

      {/* ── CARD ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '560px', width: '100%',
        animation: 'fadeUp 0.7s var(--ease) both',
      }}>

        {/* Terminal window chrome */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(204,95,95,0.18)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(204,95,95,0.06)',
        }}>
          {/* Title bar */}
          <div style={{
            padding: '0.75rem 1.25rem',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            background: 'var(--bg-elevated)',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#CC5F5F', opacity: 0.8 }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C9A84C', opacity: 0.8 }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6BAF7A', opacity: 0.8 }} />
            <span style={{
              marginLeft: '0.75rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: 'var(--text-faint)', letterSpacing: '0.05em',
            }}>
              arthagrow://router — bash
            </span>
            {/* Rotating ticker in corner */}
            <span style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              color: '#CC5F5F', letterSpacing: '0.08em',
              animation: 'fadeIn 0.3s var(--ease)',
              key: tick,
            }}>
              {TICKER_MSGS[tick]}
            </span>
          </div>

          <div style={{ padding: '3rem 2.5rem 2.5rem' }}>

            {/* Big 404 */}
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 'clamp(5rem, 16vw, 9rem)',
                fontWeight: 800, lineHeight: 1,
                background: 'linear-gradient(135deg, #CC5F5F 0%, #E08080 40%, #3A6B47 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.04em',
                userSelect: 'none',
              }}>
                404
              </div>
              {/* Glitch line */}
              <div style={{
                position: 'absolute', top: '50%', left: '-2.5rem', right: '-2.5rem',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(204,95,95,0.3), transparent)',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Subtitle */}
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.25rem',
              fontWeight: 700, letterSpacing: '-0.02em',
              color: 'var(--text-primary)', marginBottom: '0.75rem',
            }}>
              This page doesn't exist.
            </h2>

            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: '1rem',
              fontWeight: 300, color: 'var(--text-muted)',
              lineHeight: 1.7, marginBottom: '2rem',
              maxWidth: '380px', margin: '0 auto 2rem',
            }}>
              The route you're looking for isn't in our order book.
              It may have moved, been delisted, or never existed.
            </p>

            {/* Mono log line */}
            <div style={{
              background: 'var(--bg-void)',
              border: '1px solid rgba(204,95,95,0.12)',
              borderRadius: '8px', padding: '0.875rem 1rem',
              marginBottom: '2rem', textAlign: 'left',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#CC5F5F' }}>✗ </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                GET {window.location.pathname}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-faint)' }}>
                {' '}→ 404 Not Found
              </span>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Link to="/" className="ag-btn-primary" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                ← Back to Home
              </Link>
              <button onClick={() => navigate(-1)} className="ag-btn-ghost"
                style={{ fontSize: '0.9rem', fontFamily: 'var(--font-display)', cursor: 'pointer' }}>
                Go Back
              </button>
            </div>

            {/* Quick nav */}
            <div style={{
              display: 'flex', gap: '0.5rem', justifyContent: 'center',
              flexWrap: 'wrap', marginBottom: '2rem',
            }}>
              {[
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Pricing',   to: '/pricing'   },
                { label: 'Platform',  to: '/product'   },
                { label: 'Support',   to: '/support'   },
              ].map((l, i) => (
                <Link key={i} to={l.to} style={{
                  fontSize: '0.72rem', fontWeight: 600,
                  padding: '0.28rem 0.7rem', borderRadius: '100px',
                  border: '1px solid rgba(107,175,122,0.15)',
                  background: 'rgba(107,175,122,0.04)',
                  color: 'var(--text-muted)', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--green-sage)'; e.currentTarget.style.borderColor = 'rgba(107,175,122,0.35)'; e.currentTarget.style.background = 'rgba(107,175,122,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(107,175,122,0.15)'; e.currentTarget.style.background = 'rgba(107,175,122,0.04)'; }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Countdown ring */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.75rem', opacity: 0.6,
            }}>
              <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                {/* Track */}
                <circle cx="32" cy="32" r={R} fill="none"
                  stroke="rgba(107,175,122,0.1)" strokeWidth="3" />
                {/* Progress */}
                <circle cx="32" cy="32" r={R} fill="none"
                  stroke="var(--green-sage)" strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - pct)}
                  style={{ transition: 'stroke-dashoffset 0.8s var(--ease)' }}
                />
                {/* Number in centre (un-rotated) */}
                <text x="32" y="37"
                  textAnchor="middle"
                  style={{
                    transform: 'rotate(90deg)', transformOrigin: '32px 32px',
                    fontFamily: 'var(--font-mono)', fontSize: '14px',
                    fontWeight: 700, fill: 'var(--text-secondary)',
                  }}>
                  {counter}
                </text>
              </svg>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: 'var(--text-muted)', letterSpacing: '0.04em',
              }}>
                Redirecting to home in {counter}s
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
