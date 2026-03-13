import { useEffect, useRef } from 'react';

const FEATURES = [
  {
    icon: '🛡️',
    title: 'SEBI Regulated & Secure',
    body: 'Your funds and securities are held with NSE, BSE & CDSL — fully regulated under SEBI. We never touch your money.',
  },
  {
    icon: '⚡',
    title: 'Execution in Milliseconds',
    body: 'Co-located servers at exchanges ensure your orders reach the market in under 10ms. Every microsecond matters.',
  },
  {
    icon: '🧠',
    title: 'AI-Powered Insights',
    body: 'ArthaGrow\'s smart engine analyses your portfolio patterns and surfaces actionable nudges — not just data.',
  },
  {
    icon: '📊',
    title: 'Advanced Charting',
    body: '150+ indicators, multi-timeframe analysis, drawing tools, and customisable layouts. Built for serious traders.',
  },
  {
    icon: '🌱',
    title: 'Zero-Cost Investing',
    body: 'Equity delivery and direct mutual funds are completely free. Grow your portfolio without fees eating your returns.',
  },
  {
    icon: '📱',
    title: 'Trade Anywhere',
    body: 'A seamless experience across web, Android, and iOS. Your watchlist, orders, and positions — always in sync.',
  },
];

function Awards() {
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
        <div className="ag-section__label reveal">Why ArthaGrow</div>
        <h2 className="ag-section__heading reveal reveal-delay-1">
          Built different.<br />
          <span style={{
            background: 'var(--grad-text)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Built for you.
          </span>
        </h2>
        <p className="ag-section__sub reveal reveal-delay-2">
          We didn't clone a trading platform — we rethought it from the ground up,
          with the Indian investor at the centre of every decision.
        </p>

        <div className="ag-features">
          {FEATURES.map((f, i) => (
            <div key={i} className={`ag-feature-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="ag-feature-card__glow" />
              <div className="ag-feature-card__icon">{f.icon}</div>
              <div className="ag-feature-card__title">{f.title}</div>
              <div className="ag-feature-card__body">{f.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Awards;