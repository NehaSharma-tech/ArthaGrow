import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const PLANS = [
  {
    badge: 'Equity Delivery',
    price: '0',
    unit: '',
    desc: 'Zero brokerage on delivery trades and all direct mutual fund investments.',
    features: ['Stocks & IPOs', 'Direct Mutual Funds', 'Govt Bonds & SGBs'],
    featured: false,
    cta: 'Get started free',
  },
  {
    badge: 'Intraday & F&O',
    price: '20',
    unit: '/ order',
    desc: 'Flat fee. No percentage cuts. No hidden charges. Ever.',
    features: ['Intraday Stocks', 'Futures & Options', 'Currency & Commodity'],
    featured: true,
    cta: 'Open free account',
  },
];

function Pricing() {
  const ref = useRef(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll('.reveal') || [];
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    cards.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ag-section ag-section--alt" ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="ag-grid-2col">

          {/* Left copy */}
          <div>
            <div className="ag-section__label reveal">Pricing</div>
            <h2 className="ag-section__heading reveal reveal-delay-1">
              Unbeatable pricing.<br />
              <span style={{
                background: 'var(--grad-text)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                No surprises.
              </span>
            </h2>
            <p className="ag-section__sub reveal reveal-delay-2">
              We pioneered transparent pricing in Indian broking.
              Flat fees, zero hidden charges, and free investing —
              because your returns belong to you.
            </p>
            <Link
              to="/pricing"
              className="ag-btn-ghost reveal reveal-delay-3"
              style={{ display: 'inline-flex', marginTop: '2rem' }}
            >
              View full pricing →
            </Link>
          </div>

          {/* Right: cards */}
          <div className="ag-pricing">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`ag-pricing-card reveal reveal-delay-${i + 1}${plan.featured ? ' ag-pricing-card--featured' : ''}`}
              >
                <div className="ag-pricing-card__badge">{plan.badge}</div>
                <div className="ag-pricing-card__price">
                  <span style={{ color: 'var(--green-sage)', fontSize: '1.6rem' }}>₹</span>
                  {plan.price}
                </div>
                {plan.unit && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {plan.unit}
                  </div>
                )}
                <div className="ag-pricing-card__desc">{plan.desc}</div>
                <ul style={{
                  listStyle: 'none', marginTop: '1.25rem', marginBottom: '1.5rem',
                  display: 'flex', flexDirection: 'column', gap: '0.5rem'
                }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      fontSize: '0.8rem', color: 'var(--text-secondary)'
                    }}>
                      <span style={{ color: 'var(--green-sage)', fontSize: '0.7rem' }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className={plan.featured ? 'ag-btn-primary' : 'ag-btn-ghost'}
                  style={{ fontSize: '0.85rem', justifyContent: 'center', width: '100%' }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Pricing;