import { useEffect, useRef } from 'react';

const PRICING_CARDS = [
  {
    icon: '📦',
    title: 'Equity Delivery',
    price: '₹0',
    sub: 'Zero brokerage',
    desc: 'All equity delivery investments on NSE & BSE are absolutely free. No brokerage, no hidden charges — ever.',
    color: '#6BAF7A',
    badge: 'Free',
  },
  {
    icon: '⚡',
    title: 'Intraday & F&O',
    price: '₹20',
    sub: 'or 0.03% — whichever is lower',
    desc: 'Flat ₹20 per executed order across equity intraday, futures, options, currency, and commodity trades.',
    color: '#C9A84C',
    badge: 'Flat fee',
    featured: true,
  },
  {
    icon: '🌱',
    title: 'Direct Mutual Funds',
    price: '₹0',
    sub: 'Zero commission',
    desc: 'All direct mutual fund investments with zero commissions and zero DP charges. No entry or exit loads from us.',
    color: '#6BAF7A',
    badge: 'Free',
  },
];

const COMPARISONS = [
  { category: 'Equity Delivery',        arthaGrow: '₹0',   typical: '₹200–500' },
  { category: 'Equity Intraday',         arthaGrow: '₹20',  typical: '₹200–500' },
  { category: 'F&O Trades',             arthaGrow: '₹20',  typical: '₹200–500' },
  { category: 'Direct Mutual Funds',    arthaGrow: '₹0',   typical: '1–2% AUM' },
  { category: 'Currency Derivatives',   arthaGrow: '₹20',  typical: '₹150–300' },
  { category: 'Commodity Derivatives',  arthaGrow: '₹20',  typical: '₹150–300' },
];

function HeroPricing() {
  const ref = useRef(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.reveal') || [];
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    items.forEach(i => observer.observe(i));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>

      {/* ── HERO ── */}
      <section style={{
        padding: 'calc(var(--nav-h) + 5rem) 5% 5rem',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid rgba(107,175,122,0.07)',
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(107,175,122,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(107,175,122,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 40%, black 10%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,107,71,0.12) 0%, transparent 65%)',
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Headline */}
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem' }}>
            <div className="ag-section__label reveal" style={{ justifyContent: 'center', marginBottom: '1.25rem' }}>
              Pricing
            </div>
            <h1 className="reveal reveal-delay-1" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 800, lineHeight: 1.08,
              letterSpacing: '-0.035em', marginBottom: '1.25rem',
            }}>
              Honest pricing.{' '}
              <span style={{
                background: 'var(--grad-text)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>No surprises.</span>
            </h1>
            <p className="reveal reveal-delay-2" style={{
              fontFamily: 'var(--font-serif)', fontSize: '1.15rem',
              fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.75,
            }}>
              We pioneered transparent, flat-fee broking in India. Every rupee
              you save on brokerage is a rupee that stays invested and keeps growing.
            </p>
          </div>

          {/* Three pricing cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {PRICING_CARDS.map((card, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
                background: card.featured
                  ? 'linear-gradient(145deg, #1C2F1F, #162018)'
                  : 'var(--bg-card)',
                border: `1px solid ${card.featured ? 'rgba(107,175,122,0.3)' : 'rgba(107,175,122,0.1)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '2.25rem 2rem',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.35s var(--ease)',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
                  e.currentTarget.style.borderColor = `${card.color}55`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = card.featured ? 'rgba(107,175,122,0.3)' : 'rgba(107,175,122,0.1)';
                }}
              >
                {/* Top accent */}
                {card.featured && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                    background: 'var(--grad-green)',
                  }} />
                )}

                {/* Glow */}
                <div style={{
                  position: 'absolute', width: '200px', height: '200px',
                  borderRadius: '50%', filter: 'blur(70px)',
                  background: `${card.color}18`,
                  top: '-60px', right: '-40px', pointerEvents: 'none',
                }} />

                {/* Badge */}
                <div style={{
                  display: 'inline-block', marginBottom: '1.25rem',
                  fontSize: '0.62rem', fontWeight: 700,
                  padding: '0.22rem 0.6rem', borderRadius: '100px',
                  background: `${card.color}15`,
                  border: `1px solid ${card.color}35`,
                  color: card.color,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  {card.badge}
                </div>

                {/* Icon + Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: `${card.color}12`,
                    border: `1px solid ${card.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem',
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '1rem',
                    fontWeight: 700, color: 'var(--text-primary)', margin: 0,
                  }}>
                    {card.title}
                  </h3>
                </div>

                {/* Price */}
                <div style={{ marginBottom: '0.35rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '3rem',
                    fontWeight: 800, lineHeight: 1,
                    color: card.color,
                  }}>
                    {card.price}
                  </span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  color: 'var(--text-muted)', letterSpacing: '0.04em',
                  marginBottom: '1.25rem',
                }}>
                  {card.sub}
                </div>

                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: '0.92rem',
                  fontWeight: 300, color: 'var(--text-secondary)',
                  lineHeight: 1.7, margin: 0,
                }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="ag-section ag-section--alt">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="ag-section__label reveal">How we compare</div>
          <h2 className="ag-section__heading reveal reveal-delay-1">
            See the difference{' '}
            <span style={{
              background: 'var(--grad-text)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>clearly.</span>
          </h2>
          <p className="ag-section__sub reveal reveal-delay-2" style={{ marginBottom: '2.5rem' }}>
            Traditional brokers charge a percentage of your trade value.
            On a ₹1 lakh trade, that's ₹200–500 gone every single time.
            We charge ₹20. Flat.
          </p>

          {/* Table — horizontally scrollable on mobile */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div className="reveal reveal-delay-2" style={{
            background: 'var(--bg-card)',
            border: '1px solid rgba(107,175,122,0.1)',
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            minWidth: '380px',
          }}>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid rgba(107,175,122,0.1)',
              background: 'rgba(107,175,122,0.04)',
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Segment
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--green-sage)', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center' }}>
                ArthaGrow
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'right' }}>
                Typical Broker
              </span>
            </div>

            {COMPARISONS.map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                padding: '1rem 1.5rem',
                borderBottom: i < COMPARISONS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(107,175,122,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {row.category}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
                  fontWeight: 700, color: '#6BAF7A', textAlign: 'center',
                }}>
                  {row.arthaGrow}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.875rem',
                  color: 'var(--text-faint)', textAlign: 'right',
                  textDecoration: 'line-through',
                }}>
                  {row.typical}
                </span>
              </div>
            ))}
          </div>
          </div>{/* end scroll wrapper */}
          <div className="reveal" style={{
            marginTop: '1.5rem',
            padding: '1.25rem 1.5rem',
            background: 'rgba(107,175,122,0.06)',
            border: '1px solid rgba(107,175,122,0.15)',
            borderRadius: 'var(--radius)',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <span style={{ fontSize: '1.4rem' }}>💡</span>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              On 100 intraday trades per month, you save up to{' '}
              <span style={{ color: 'var(--green-sage)', fontWeight: 700 }}>₹48,000/year</span>{' '}
              compared to a 0.5% brokerage broker. That's real money staying invested.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HeroPricing;