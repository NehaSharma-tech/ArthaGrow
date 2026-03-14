import { useEffect, useRef } from 'react';

const PRESS = [
  { outlet: 'Economic Times',  headline: 'ArthaGrow disrupts the broking industry with zero-fee model', year: '2023' },
  { outlet: 'Business Standard', headline: 'How ArthaGrow became India\'s largest broker in under a decade', year: '2023' },
  { outlet: 'Forbes India',    headline: 'ArthaGrow founder Neha Sharma on building for the next billion', year: '2024' },
  { outlet: 'Mint',            headline: 'ArthaGrow processes 15% of India\'s retail trades — what\'s the secret?', year: '2024' },
  { outlet: 'TechCrunch',      headline: 'Rainmatter\'s $50M fintech fund is quietly building India\'s capital market stack', year: '2024' },
  { outlet: 'The Hindu',       headline: 'ArthaVidya reaches 10 lakh learners — financial literacy goes mainstream', year: '2025' },
];

function Press() {
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

  return (
    <section className="ag-section ag-section--alt" ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="ag-section__label reveal">In the news</div>
        <h2 className="ag-section__heading reveal reveal-delay-1">
          Press & media.
        </h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem', marginTop: '3rem',
        }}>
          {PRESS.map((item, i) => (
            <a key={i} href="/" style={{ textDecoration: 'none' }}
              className={`reveal reveal-delay-${(i % 3) + 1}`}>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(107,175,122,0.08)',
                borderRadius: 'var(--radius)',
                padding: '1.5rem',
                height: '100%',
                transition: 'all 0.3s var(--ease)',
                cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(107,175,122,0.25)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(107,175,122,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                    fontWeight: 700, color: 'var(--green-sage)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>
                    {item.outlet}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    color: 'var(--text-faint)',
                  }}>
                    {item.year}
                  </span>
                </div>

                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: '0.98rem',
                  fontWeight: 400, color: 'var(--text-secondary)',
                  lineHeight: 1.65, margin: 0,
                }}>
                  "{item.headline}"
                </p>

                <div style={{
                  marginTop: '1rem', fontSize: '0.75rem',
                  color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem',
                }}>
                  Read article →
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Media contact */}
        <div className="reveal" style={{
          marginTop: '3rem', textAlign: 'center',
          padding: '1.5rem',
          borderTop: '1px solid rgba(107,175,122,0.07)',
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            For press enquiries:
          </p>
          <a href="mailto:media@arthagrow.com" style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
            color: 'var(--green-sage)', textDecoration: 'none',
            fontWeight: 600, letterSpacing: '0.02em',
          }}>
            media@arthagrow.com →
          </a>
        </div>
      </div>
    </section>
  );
}

export default Press;