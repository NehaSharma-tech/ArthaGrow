import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   PlatformSection
   Props:
     flip        – boolean, reverses image/text order
     tag         – e.g. "Trading Platform"
     name        – product name
     tagline     – short bold line under name
     description – body paragraph(s) — string or array of strings
     features    – array of short feature strings (shown as chips)
     image       – img src path
     imageAlt    – img alt text
     primaryCTA  – { label, href }
     secondaryCTA– { label, href }  (optional)
     appLinks    – boolean (show App Store / Play Store badges)
     badge       – optional corner badge text e.g. "New"
───────────────────────────────────────────────────────────────*/

function PlatformSection({
  flip = false,
  tag,
  name,
  tagline,
  description,
  features = [],
  image,
  imageAlt,
  primaryCTA,
  primaryCTAAction, // optional onClick handler (overrides href)
  secondaryCTA,
  appLinks = false,
  badge,
}) {
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

  const descriptions = Array.isArray(description) ? description : [description];

  const TextBlock = () => (
    <div className="reveal ag-platform-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {tag && <div className="ag-section__label" style={{ marginBottom: '1rem' }}>{tag}</div>}

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
        fontWeight: 800, letterSpacing: '-0.03em',
        lineHeight: 1.1, marginBottom: '0.5rem',
        color: 'var(--text-primary)',
      }}>
        {name}
      </h2>

      {tagline && (
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
          fontWeight: 600, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--green-sage)',
          marginBottom: '1.25rem',
        }}>
          {tagline}
        </p>
      )}

      {descriptions.map((d, i) => (
        <p key={i} style={{
          fontFamily: 'var(--font-serif)', fontSize: '1.05rem',
          fontWeight: 300, color: 'var(--text-secondary)',
          lineHeight: 1.8, marginBottom: '0.75rem',
        }}>{d}</p>
      ))}

      {/* Feature chips */}
      {features.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1.25rem 0' }}>
          {features.map((f, i) => (
            <span key={i} style={{
              fontSize: '0.72rem', fontWeight: 600,
              padding: '0.28rem 0.7rem', borderRadius: '100px',
              background: 'rgba(107,175,122,0.07)',
              border: '1px solid rgba(107,175,122,0.18)',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
            }}>
              {f}
            </span>
          ))}
        </div>
      )}

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        {primaryCTA && (
          primaryCTAAction ? (
            <button onClick={primaryCTAAction} className="ag-btn-primary"
              style={{ fontSize: '0.875rem', cursor: 'pointer', border: 'none' }}>
              {primaryCTA.label} →
            </button>
          ) : (
            <a href={primaryCTA.href || '#'} className="ag-btn-primary"
              style={{ fontSize: '0.875rem', textDecoration: 'none' }}>
              {primaryCTA.label} →
            </a>
          )
        )}
        {secondaryCTA && (
          <a href={secondaryCTA.href || '#'} className="ag-btn-ghost"
            style={{ fontSize: '0.875rem', textDecoration: 'none' }}>
            {secondaryCTA.label}
          </a>
        )}
      </div>

      {/* App badges */}
      {appLinks && (
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1rem', borderRadius: '8px',
            background: 'var(--bg-card)',
            border: '1px solid rgba(107,175,122,0.15)',
            textDecoration: 'none', transition: 'all 0.25s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(107,175,122,0.35)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(107,175,122,0.15)'}
          >
            <span style={{ fontSize: '1.2rem' }}>▶</span>
            <div>
              <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Get it on</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>Google Play</div>
            </div>
          </a>
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1rem', borderRadius: '8px',
            background: 'var(--bg-card)',
            border: '1px solid rgba(107,175,122,0.15)',
            textDecoration: 'none', transition: 'all 0.25s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(107,175,122,0.35)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(107,175,122,0.15)'}
          >
            <span style={{ fontSize: '1.2rem' }}>🍎</span>
            <div>
              <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Download on the</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>App Store</div>
            </div>
          </a>
        </div>
      )}
    </div>
  );

  const ImageBlock = () => (
    <div className="reveal reveal-delay-2 ag-platform-image" style={{ position: 'relative' }}>
      {/* Card wrapper */}
      <div style={{
        background: 'linear-gradient(145deg, var(--bg-elevated), var(--bg-surface))',
        border: '1px solid rgba(107,175,122,0.1)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%', filter: 'blur(80px)',
          background: 'rgba(58,107,71,0.15)',
          top: '-60px', right: '-60px', pointerEvents: 'none',
        }} />

        {/* Badge */}
        {badge && (
          <div style={{
            position: 'absolute', top: '1rem', right: '1rem',
            fontSize: '0.65rem', fontWeight: 700,
            padding: '0.25rem 0.6rem', borderRadius: '100px',
            background: 'rgba(201,168,76,0.12)',
            border: '1px solid rgba(201,168,76,0.3)',
            color: 'var(--gold-soft)', letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            {badge}
          </div>
        )}

        {/* Fake browser chrome */}
        <div style={{
          display: 'flex', gap: '0.35rem', alignItems: 'center',
          marginBottom: '1rem', paddingBottom: '0.75rem',
          borderBottom: '1px solid rgba(107,175,122,0.08)',
        }}>
          {['#CC5F5F','#C9A84C','#6BAF7A'].map((c, i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
          <div style={{
            marginLeft: '0.5rem', flex: 1, height: '20px', borderRadius: '4px',
            background: 'var(--bg-void)', maxWidth: '200px',
          }} />
        </div>

        {/* Product image */}
        <img
          src={image}
          alt={imageAlt}
          style={{
            width: '100%', height: 'auto',
            borderRadius: '8px', display: 'block',
            objectFit: 'cover',
          }}
          onError={e => {
            // Fallback: show a placeholder mockup if image missing
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextSibling.style.display = 'flex';
          }}
        />
        {/* Placeholder shown if image fails */}
        <div style={{
          display: 'none', height: '220px',
          alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-void)', borderRadius: '8px',
          flexDirection: 'column', gap: '0.5rem',
        }}>
          <span style={{ fontSize: '2.5rem', opacity: 0.3 }}>🖥️</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>{name} screenshot</span>
        </div>
      </div>

      {/* Floating stat badge */}
      <div style={{
        position: 'absolute', bottom: '-16px',
        [flip ? 'left' : 'right']: '-16px',
        background: 'var(--bg-card)',
        border: '1px solid rgba(107,175,122,0.2)',
        borderRadius: '10px', padding: '0.65rem 1rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        zIndex: 2,
      }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: 'var(--green-sage)',
          boxShadow: '0 0 6px var(--green-sage)',
          animation: 'blink 2s ease-in-out infinite',
          flexShrink: 0,
        }} />
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
            Live on exchanges
          </div>
          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            NSE · BSE · MCX
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="ag-section" ref={ref}
      style={{ borderBottom: '1px solid rgba(107,175,122,0.05)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="ag-grid-2col">
          {flip ? (
            <> <ImageBlock /> <TextBlock /> </>
          ) : (
            <> <TextBlock /> <ImageBlock /> </>
          )}
        </div>
      </div>
    </section>
  );
}

export default PlatformSection;