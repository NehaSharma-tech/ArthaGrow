import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function OpenAccount() {
  const ref = useRef(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.reveal') || [];
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.2 }
    );
    items.forEach(i => observer.observe(i));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ag-cta ag-section--dark" ref={ref}>
      <div className="ag-cta__bg" />

      {/* Decorative ring */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px',
        border: '1px solid rgba(107,175,122,0.07)',
        borderRadius: '50%', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        border: '1px solid rgba(107,175,122,0.1)',
        borderRadius: '50%', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)', pointerEvents: 'none'
      }} />

      <div className="ag-cta__inner">
        <div className="ag-section__label reveal" style={{ justifyContent: 'center', marginBottom: '1.25rem' }}>
          Get Started
        </div>

        <h2 className="ag-cta__title reveal reveal-delay-1">
          Your wealth journey<br />
          <span style={{
            background: 'var(--grad-text)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            starts today.
          </span>
        </h2>

        <p className="ag-cta__sub reveal reveal-delay-2">
          Open your ArthaGrow account in under 10 minutes.
          Zero account opening fee. Zero maintenance fee.
          Just pure growth.
        </p>

        <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/signup" className="ag-btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            Open Free Account →
          </Link>
          <Link to="/product" className="ag-btn-ghost" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            Explore Platform
          </Link>
        </div>

        <p className="ag-cta__note reveal reveal-delay-3">
          ✓ No account fee &nbsp;·&nbsp; ✓ SEBI regulated &nbsp;·&nbsp; ✓ Funds secured with CDSL
        </p>

        {/* Social proof row */}
        <div className="reveal reveal-delay-3" style={{
          display: 'flex', justifyContent: 'center', gap: '2.5rem',
          marginTop: '3rem', flexWrap: 'wrap'
        }}>
          {[
            { val: '1.2 Cr+', label: 'Happy traders' },
            { val: '4.6 ★',   label: 'App store rating' },
            { val: '< 10ms',  label: 'Order execution' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '1.3rem',
                fontWeight: 700, color: 'var(--green-sage)'
              }}>
                {item.val}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OpenAccount;