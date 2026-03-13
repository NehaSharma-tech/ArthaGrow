import { useEffect, useRef } from 'react';

const STATS = [
  { val: 1.2,  suffix: 'Cr+',   label: 'Registered clients',    prefix: '' },
  { val: 15,   suffix: '%',      label: 'of NSE/BSE retail volume', prefix: '' },
  { val: 2.8,  suffix: 'L Cr',  label: 'Equity assets',          prefix: '₹' },
  { val: 99.9, suffix: '%',      label: 'Platform uptime SLA',   prefix: '' },
  { val: 30,   suffix: '+',      label: 'Fintech investments',    prefix: '' },
  { val: 10,   suffix: 'ms',     label: 'Avg. order latency',    prefix: '<' },
];

const INSTRUMENTS = [
  { icon: '📈', name: 'Stocks & IPOs' },
  { icon: '🔄', name: 'F&O' },
  { icon: '🌍', name: 'Currency' },
  { icon: '🛢️',  name: 'Commodity' },
  { icon: '💼', name: 'Mutual Funds' },
  { icon: '🏛️', name: 'Govt Bonds' },
  { icon: '📊', name: 'ETFs' },
  { icon: '🏦', name: 'Debt Funds' },
];

function Stats() {
  const ref = useRef(null);

  useEffect(() => {
    const targets = ref.current?.querySelectorAll('[data-count]') || [];
    const reveals  = ref.current?.querySelectorAll('.reveal') || [];

    const revealObs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    reveals.forEach(r => revealObs.observe(r));

    const countObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end    = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 1800, step = 16;
        const inc = end / (duration / step);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + inc, end);
          el.textContent = prefix + (Number.isInteger(end)
            ? Math.floor(cur).toLocaleString('en-IN')
            : cur.toFixed(1)) + suffix;
          if (cur >= end) clearInterval(t);
        }, step);
        countObs.unobserve(el);
      });
    }, { threshold: 0.3 });
    targets.forEach(t => countObs.observe(t));

    return () => { revealObs.disconnect(); countObs.disconnect(); };
  }, []);

  return (
    <section className="ag-section" ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Numbers */}
        <div className="ag-section__label reveal">By the numbers</div>
        <h2 className="ag-section__heading reveal reveal-delay-1">
          The scale of trust.
        </h2>

        <div className="ag-stats">
          {STATS.map((s, i) => (
            <div key={i} className={`ag-stat-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="ag-stat-card__val">
                <span
                  data-count={s.val}
                  data-suffix={s.suffix}
                  data-prefix={s.prefix}
                >0</span>
              </div>
              <div className="ag-stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Instruments */}
        <div style={{ marginTop: '5rem' }}>
          <div className="ag-section__label reveal">What you can trade</div>
          <h2 className="ag-section__heading reveal reveal-delay-1">
            Every instrument.<br />One platform.
          </h2>

          <div className="ag-instruments">
            {INSTRUMENTS.map((item, i) => (
              <div key={i} className={`ag-instrument reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="ag-instrument__icon">{item.icon}</div>
                <div className="ag-instrument__name">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Stats;