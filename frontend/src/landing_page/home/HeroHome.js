import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

/* ---------- live-ish ticker data ---------- */
const STOCKS = [
  { sym: 'RELIANCE', name: 'Reliance Industries', price: 2847.55, change: +1.24 },
  { sym: 'TCS',      name: 'Tata Consultancy',    price: 3921.10, change: -0.38 },
  { sym: 'HDFCBANK', name: 'HDFC Bank',            price: 1654.80, change: +0.91 },
  { sym: 'INFY',     name: 'Infosys Ltd',          price: 1478.30, change: +2.15 },
  { sym: 'WIPRO',    name: 'Wipro Ltd',             price:  462.45, change: -0.72 },
  { sym: 'NIFTY 50', name: 'Index',                 price: 22485.6, change: +0.58 },
];

/* Sparkline bars (random-ish per stock) */
const SPARKS = [
  [4,6,5,8,7,9,8,10],
  [9,7,8,6,7,5,6,4],
  [5,6,7,6,8,9,8,10],
  [3,5,6,8,7,9,10,12],
  [10,9,8,7,8,6,7,5],
  [6,7,8,9,8,10,9,11],
];

function TickerCard() {
  const [stocks, setStocks] = useState(STOCKS);

  // Simulate tiny live fluctuations
  useEffect(() => {
    const id = setInterval(() => {
      setStocks(prev =>
        prev.map(s => ({
          ...s,
          price: +(s.price + (Math.random() - 0.5) * 2).toFixed(2),
          change: +(s.change + (Math.random() - 0.5) * 0.08).toFixed(2),
        }))
      );
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="ag-ticker-card">
      <div className="ag-ticker-card__header">
        <span className="ag-ticker-card__title">Market Pulse</span>
        <span className="ag-live-badge">LIVE</span>
      </div>

      {stocks.map((s, i) => (
        <div key={s.sym} className="ag-ticker-row">
          <div className="ag-ticker-info">
            <span className="ag-ticker-symbol">{s.sym}</span>
            <span className="ag-ticker-name">{s.name}</span>
          </div>

          {/* Mini sparkline */}
          <div className="ag-spark">
            {SPARKS[i].map((h, j) => (
              <div
                key={j}
                className={`ag-spark-bar ${s.change >= 0 ? 'up' : 'down'}`}
                style={{ height: `${h * 2.2}px` }}
              />
            ))}
          </div>

          <span className="ag-ticker-price">₹{s.price.toLocaleString('en-IN')}</span>
          <span className={`ag-ticker-change ${s.change >= 0 ? 'up' : 'down'}`}>
            {s.change >= 0 ? '▲' : '▼'} {Math.abs(s.change).toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- HERO ---------- */
function HeroHome() {
  const trustRef = useRef(null);

  // Animate counters when in view
  useEffect(() => {
    const targets = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const end = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          const duration = 1600;
          const step = 16;
          const increment = end / (duration / step);
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, end);
            el.textContent = prefix + (Number.isInteger(end)
              ? Math.floor(current).toLocaleString('en-IN')
              : current.toFixed(1)) + suffix;
            if (current >= end) clearInterval(timer);
          }, step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ag-hero">
      {/* Background effects */}
      <div className="ag-hero__grid" />
      <div className="ag-hero__glow" />
      <div className="ag-hero__orb ag-hero__orb--1" />
      <div className="ag-hero__orb ag-hero__orb--2" />
      <div className="ag-hero__orb ag-hero__orb--3" />

      <div className="ag-hero__inner">
        {/* Left content */}
        <div className="ag-hero__content">
          <div className="ag-hero__eyebrow">
            <span className="ag-hero__eyebrow-dot" />
            India's smartest trading platform
          </div>

          <h1 className="ag-hero__title">
            <span className="ag-hero__title-line">Grow your</span>
            <span className="ag-hero__title-accent">Wealth with</span>
            <span className="ag-hero__title-line">Clarity.</span>
          </h1>

          <p className="ag-hero__sub">
            ArthaGrow puts institutional-grade tools in your hands —
            invest in stocks, F&O, mutual funds, and more with zero
            noise and full confidence.
          </p>

          <div className="ag-hero__actions">
            <Link to="/signup" className="ag-btn-primary">
              Start for Free →
            </Link>
            <Link to="/product" className="ag-btn-ghost">
              See the Platform
            </Link>
          </div>

          {/* Trust strip */}
          <div className="ag-hero__trust" ref={trustRef}>
            <div className="ag-hero__trust-item">
              <span
                className="ag-hero__trust-val"
                data-count="1.2" data-suffix="Cr+"
              >0</span>
              <span className="ag-hero__trust-label">Active traders</span>
            </div>
            <div className="ag-hero__trust-divider" />
            <div className="ag-hero__trust-item">
              <span
                className="ag-hero__trust-val"
                data-count="2.8" data-prefix="₹" data-suffix="L Cr"
              >0</span>
              <span className="ag-hero__trust-label">Assets managed</span>
            </div>
            <div className="ag-hero__trust-divider" />
            <div className="ag-hero__trust-item">
              <span
                className="ag-hero__trust-val"
                data-count="99.9" data-suffix="% uptime"
              >0</span>
              <span className="ag-hero__trust-label">Platform uptime</span>
            </div>
          </div>
        </div>

        {/* Right: live ticker card */}
        <div className="ag-hero__visual">
          <TickerCard />
        </div>
      </div>
    </section>
  );
}

export default HeroHome;