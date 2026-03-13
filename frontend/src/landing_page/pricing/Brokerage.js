import { useEffect, useRef, useState } from 'react';

/* ── BROKERAGE CALCULATOR ── */
function BrokerageCalculator() {
  const [segment, setSegment] = useState('intraday');
  const [tradeValue, setTradeValue] = useState(100000);

  const SEGMENTS = [
    { id: 'delivery',  label: 'Equity Delivery', brokerage: 0,    stt: 0.001, exchange: 0.00003450 },
    { id: 'intraday',  label: 'Equity Intraday',  brokerage: 20,   stt: 0.00025, exchange: 0.00003450 },
    { id: 'futures',   label: 'Futures',           brokerage: 20,   stt: 0.0001,  exchange: 0.000019 },
    { id: 'options',   label: 'Options',           brokerage: 20,   stt: 0.0005,  exchange: 0.000053 },
  ];

  const seg = SEGMENTS.find(s => s.id === segment);
  const brokerage = seg.id === 'delivery' ? 0 : Math.min(seg.brokerage, tradeValue * 0.0003);
  const stt       = tradeValue * seg.stt;
  const exchange  = tradeValue * seg.exchange;
  const gst       = (brokerage + exchange) * 0.18;
  const sebi      = tradeValue * 0.000001;
  const stamp     = tradeValue * 0.00003;
  const total     = brokerage + stt + exchange + gst + sebi + stamp;

  const fmt = n => '₹' + n.toFixed(2);

  const BREAKDOWN = [
    { label: 'Brokerage',       val: brokerage, highlight: true },
    { label: 'STT',             val: stt },
    { label: 'Exchange charges',val: exchange },
    { label: 'GST (18%)',       val: gst },
    { label: 'SEBI charges',    val: sebi },
    { label: 'Stamp duty',      val: stamp },
  ];

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid rgba(107,175,122,0.12)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Top accent */}
      <div style={{ height: '3px', background: 'var(--grad-green)' }} />

      <div style={{ padding: '2rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: '1rem',
          fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem',
        }}>
          Brokerage Calculator
        </h3>

        {/* Segment selector */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {SEGMENTS.map(s => (
            <button key={s.id} onClick={() => setSegment(s.id)} style={{
              padding: '0.35rem 0.85rem', borderRadius: '100px',
              fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              background: segment === s.id ? 'var(--grad-green)' : 'transparent',
              border: segment === s.id ? 'none' : '1px solid rgba(107,175,122,0.2)',
              color: segment === s.id ? '#fff' : 'var(--text-muted)',
              transition: 'all 0.2s',
            }}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Trade value slider */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Trade Value
            </label>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--green-sage)' }}>
              ₹{(tradeValue).toLocaleString('en-IN')}
            </span>
          </div>
          <input type="range" min="10000" max="1000000" step="10000"
            value={tradeValue} onChange={e => setTradeValue(+e.target.value)}
            style={{
              width: '100%', height: '4px', borderRadius: '2px',
              background: `linear-gradient(to right, var(--green-forest) 0%, var(--green-sage) ${(tradeValue - 10000) / 9900}%, var(--bg-elevated) ${(tradeValue - 10000) / 9900}%)`,
              outline: 'none', border: 'none', cursor: 'pointer',
              WebkitAppearance: 'none', appearance: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-faint)' }}>₹10K</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-faint)' }}>₹10L</span>
          </div>
        </div>

        {/* Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {BREAKDOWN.map((row, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '0.5rem 0.75rem', borderRadius: '6px',
              background: row.highlight ? 'rgba(107,175,122,0.07)' : 'transparent',
              border: row.highlight ? '1px solid rgba(107,175,122,0.15)' : '1px solid transparent',
            }}>
              <span style={{ fontSize: '0.8rem', color: row.highlight ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                {row.label}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
                fontWeight: row.highlight ? 700 : 400,
                color: row.highlight ? 'var(--green-sage)' : 'var(--text-muted)',
              }}>
                {fmt(row.val)}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1rem 0.75rem',
          borderTop: '1px solid rgba(107,175,122,0.1)',
        }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Total charges
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '1.2rem',
            fontWeight: 800, color: 'var(--text-primary)',
          }}>
            {fmt(total)}
          </span>
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', marginTop: '0.5rem' }}>
          * Indicative estimate. Actual charges may vary slightly.
        </div>
      </div>
    </div>
  );
}

/* ── CHARGES LIST ── */
const CHARGE_GROUPS = [
  {
    title: 'Account & Order Charges',
    items: [
      { label: 'Account opening',              value: '₹0',             note: 'Completely free' },
      { label: 'Annual maintenance (1st year)', value: '₹0',            note: 'Free for first year' },
      { label: 'Annual maintenance (subsequent)',value: '₹300/year',    note: 'Demat AMC' },
      { label: 'Call & Trade',                 value: '₹50 + GST',      note: 'Per order, if placed via phone' },
      { label: 'RMS auto-squareoff',           value: '₹50 + GST',      note: 'Per order squared off by RMS' },
      { label: 'Debit balance orders',         value: '₹40/order',      note: 'Instead of ₹20 when in debit' },
    ],
  },
  {
    title: 'NRI Accounts',
    items: [
      { label: 'NRI Non-PIS equity',           value: '0.5% or ₹100',   note: 'Whichever is lower per order' },
      { label: 'NRI PIS equity',               value: '0.5% or ₹200',   note: 'Whichever is lower per order' },
    ],
  },
  {
    title: 'Contract Notes & Documents',
    items: [
      { label: 'Digital contract notes',       value: '₹0',             note: 'Sent via email, always free' },
      { label: 'Physical contract notes',      value: '₹20/note',       note: 'Plus courier charges if requested' },
    ],
  },
];

function Brokerage() {
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
    <section className="ag-section" ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="ag-section__label reveal">Charges & Calculator</div>
        <h2 className="ag-section__heading reveal reveal-delay-1">
          Every charge,{' '}
          <span style={{
            background: 'var(--grad-text)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>explained.</span>
        </h2>
        <p className="ag-section__sub reveal reveal-delay-2" style={{ marginBottom: '3rem' }}>
          No fine print. No surprises. Here is every charge you'll ever encounter
          on ArthaGrow — and a calculator so you know exactly what you'll pay before you trade.
        </p>

        <div className="ag-brokerage-grid">

          {/* Left: Charge groups */}
          <div>
            {CHARGE_GROUPS.map((group, gi) => (
              <div key={gi} className={`reveal reveal-delay-${gi + 1}`} style={{ marginBottom: '2rem' }}>
                <h4 style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--green-sage)',
                  marginBottom: '0.75rem',
                }}>
                  {group.title}
                </h4>

                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(107,175,122,0.08)',
                  borderRadius: 'var(--radius)', overflow: 'hidden',
                }}>
                  {group.items.map((item, ii) => (
                    <div key={ii} style={{
                      display: 'grid', gridTemplateColumns: '1fr auto',
                      gap: '1rem', alignItems: 'start',
                      padding: '0.875rem 1.25rem',
                      borderBottom: ii < group.items.length - 1 ? '1px solid rgba(255,255,255,0.025)' : 'none',
                      transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(107,175,122,0.03)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: '0.15rem' }}>
                          {item.note}
                        </div>
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
                        fontWeight: 700,
                        color: item.value === '₹0' ? 'var(--green-sage)' : 'var(--text-primary)',
                        textAlign: 'right', whiteSpace: 'nowrap',
                      }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Disclaimer */}
            <div className="reveal" style={{
              padding: '1rem 1.25rem',
              background: 'rgba(201,168,76,0.05)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: 'var(--radius)',
              fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.7,
            }}>
              <span style={{ color: 'var(--gold-soft)', fontWeight: 700 }}>Note: </span>
              Statutory charges (STT, exchange fees, GST, SEBI charges, stamp duty) are
              levied by the government and exchanges — they apply at every broker and
              are not controlled by ArthaGrow.
            </div>
          </div>

          {/* Right: Calculator */}
          <div className="reveal reveal-delay-2">
            <BrokerageCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Brokerage;