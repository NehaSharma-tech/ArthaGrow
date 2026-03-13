import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const ECOSYSTEM = [
  {
    name: 'ArthaSuite',
    category: 'Thematic Investing',
    desc: 'Invest in curated stock baskets around themes you believe in — EV, AI, pharma, and more.',
    icon: '🎯',
    color: '#6BAF7A',
    tag: 'Equity',
  },
  {
    name: 'QuantEdge',
    category: 'Algo & Strategy',
    desc: 'Build, backtest, and deploy algorithmic trading strategies — no coding required.',
    icon: '⚙️',
    color: '#C9A84C',
    tag: 'Automation',
  },
  {
    name: 'OptionsDesk',
    category: 'Options Trading',
    desc: 'Visual options chain, payoff graphs, strategy builder, and Greeks — all in one place.',
    icon: '📐',
    color: '#9DD4A8',
    tag: 'Derivatives',
  },
  {
    name: 'ArthaFund',
    category: 'Asset Management',
    desc: 'Professionally managed fund portfolios tailored to your risk appetite and time horizon.',
    icon: '🏦',
    color: '#6BAF7A',
    tag: 'Funds',
  },
  {
    name: 'BondBazaar',
    category: 'Bonds & Fixed Income',
    desc: 'Discover, compare and invest in government bonds, PSU bonds, and NCDs with ease.',
    icon: '📜',
    color: '#C9A84C',
    tag: 'Fixed Income',
  },
  {
    name: 'ShieldPlan',
    category: 'Insurance',
    desc: 'Unbiased insurance advice and transparent policy comparisons — no pushy agents.',
    icon: '🛡️',
    color: '#4E8C5F',
    tag: 'Protection',
  },
];

function Universe() {
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
    <section className="ag-section ag-section--alt" ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
          <div className="ag-section__label reveal" style={{ justifyContent: 'center' }}>
            Ecosystem
          </div>
          <h2 className="ag-section__heading reveal reveal-delay-1" style={{ textAlign: 'center' }}>
            The ArthaGrow{' '}
            <span style={{
              background: 'var(--grad-text)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Universe.</span>
          </h2>
          <p className="ag-section__sub reveal reveal-delay-2" style={{ margin: '0 auto' }}>
            Our partner platforms extend your investing experience far beyond
            a single screen. Every tool, every asset class — unified.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {ECOSYSTEM.map((item, i) => (
            <div key={i} className={`ag-feature-card reveal reveal-delay-${(i % 3) + 1}`}
              style={{ cursor: 'pointer' }}>
              <div className="ag-feature-card__glow" />

              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div className="ag-feature-card__icon" style={{ marginBottom: 0 }}>
                  {item.icon}
                </div>
                <span style={{
                  fontSize: '0.62rem', fontWeight: 700,
                  padding: '0.2rem 0.5rem', borderRadius: '100px',
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}35`,
                  color: item.color,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  {item.tag}
                </span>
              </div>

              <div style={{ marginBottom: '0.3rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: 'var(--text-muted)', letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {item.category}
                </span>
              </div>
              <div className="ag-feature-card__title">{item.name}</div>
              <div className="ag-feature-card__body">{item.desc}</div>

              <div style={{
                marginTop: '1.25rem', fontSize: '0.78rem',
                color: item.color, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                transition: 'gap 0.2s',
              }}>
                Explore →
              </div>
            </div>
          ))}
        </div>

        {/* Tech blog nudge */}
        <div className="reveal" style={{
          marginTop: '3.5rem', padding: '1.75rem 2rem',
          background: 'linear-gradient(135deg, rgba(58,107,71,0.08), rgba(107,175,122,0.04))',
          border: '1px solid rgba(107,175,122,0.12)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: 'var(--green-sage)', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem',
            }}>
              Under the hood
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
              Curious about our tech stack?
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              We write openly about our architecture, scaling challenges, and open-source contributions.
            </p>
          </div>
          <a href="#" className="ag-btn-ghost" style={{ textDecoration: 'none', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
            Read ArthaGrow.tech →
          </a>
        </div>

        {/* Final CTA */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Ready to experience the full ArthaGrow ecosystem?
          </p>
          <Link to="/signup" className="ag-btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
            Open Free Account →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Universe;