import { useEffect, useRef } from 'react';

const EXTENDED_TEAM = [
  { name: 'Rohan Mehta',    role: 'Co-founder & CTO',          initial: 'R', color: '#4E8C5F' },
  { name: 'Priya Iyer',     role: 'Chief Product Officer',     initial: 'P', color: '#C9A84C' },
  { name: 'Amit Bose',      role: 'Head of Risk & Compliance', initial: 'A', color: '#6BAF7A' },
  { name: 'Kavya Nair',     role: 'Head of Design',            initial: 'K', color: '#9DD4A8' },
  { name: 'Siddharth Rao',  role: 'VP Engineering',            initial: 'S', color: '#3A6B47' },
  { name: 'Divya Sharma',   role: 'Head of Education',         initial: 'D', color: '#C9A84C' },
];

function Team() {
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
    <div ref={ref}>

      {/* ── FOUNDER SPOTLIGHT ── */}
      <section className="ag-section ag-section--alt">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="ag-section__label reveal">Leadership</div>
          <h2 className="ag-section__heading reveal reveal-delay-1">
            The people behind{' '}
            <span style={{
              background: 'var(--grad-text)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>ArthaGrow.</span>
          </h2>

          {/* Founder card */}
          <div className="ag-founder-card reveal reveal-delay-2" style={{
            marginTop: '3.5rem',
            background: 'var(--bg-card)',
            border: '1px solid rgba(107,175,122,0.12)',
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Top accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
              background: 'var(--grad-green)',
            }} />

            {/* Photo side */}
            <div style={{
              background: 'linear-gradient(145deg, var(--bg-elevated), var(--bg-surface))',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '3rem 2.5rem', gap: '1.25rem',
              minHeight: '360px',
            }}>
              <div style={{ position: 'relative' }}>
                {/* Glow ring behind photo */}
                <div style={{
                  position: 'absolute', inset: '-8px', borderRadius: '50%',
                  background: 'var(--grad-green)', opacity: 0.25, filter: 'blur(12px)',
                }} />
                <img
                  src="media/images/photo1.JPG"
                  alt="Neha Sharma"
                  style={{
                    width: '160px', height: '160px',
                    borderRadius: '50%', objectFit: 'cover',
                    border: '3px solid rgba(107,175,122,0.35)',
                    position: 'relative', zIndex: 1,
                  }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                  fontWeight: 700, color: 'var(--text-primary)',
                  marginBottom: '0.3rem',
                }}>Neha Sharma</h3>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  color: 'var(--green-sage)', letterSpacing: '0.08em',
                  textTransform: 'uppercase', fontWeight: 600,
                }}>Founder & CEO</p>
              </div>

              {/* Social links */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Website', 'TradeTalk', 'Twitter', 'LinkedIn'].map((s, i) => (
                  <a key={i} href="/" style={{
                    fontSize: '0.68rem', fontWeight: 600,
                    padding: '0.25rem 0.6rem', borderRadius: '100px',
                    border: '1px solid rgba(107,175,122,0.22)',
                    background: 'rgba(107,175,122,0.06)',
                    color: 'var(--green-sage)', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(107,175,122,0.14)';
                      e.currentTarget.style.borderColor = 'rgba(107,175,122,0.4)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(107,175,122,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(107,175,122,0.22)';
                    }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Bio side */}
            <div style={{ padding: '3rem 3rem 3rem 0' }}>
              {/* Pull quote */}
              <div style={{
                borderLeft: '3px solid var(--green-forest)',
                paddingLeft: '1.25rem', marginBottom: '2rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: '1.35rem',
                  fontStyle: 'italic', fontWeight: 300,
                  color: 'var(--text-primary)', lineHeight: 1.6,
                }}>
                  "I started ArthaGrow because I was tired of paying fees that
                  didn't make me a better trader. We built the platform I always
                  needed — and gave it to everyone."
                </p>
              </div>

              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '1rem',
                fontWeight: 300, color: 'var(--text-secondary)',
                lineHeight: 1.8, marginBottom: '1rem',
              }}>
                Neha Sharma bootstrapped ArthaGrow after a decade-long career as
                an active trader. Having experienced every friction point the Indian
                broking industry offered — high commissions, poor UX, opaque pricing —
                she set out to dismantle every single one of them.
              </p>

              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '1rem',
                fontWeight: 300, color: 'var(--text-secondary)',
                lineHeight: 1.8, marginBottom: '1.5rem',
              }}>
                Under her leadership, ArthaGrow became India's largest stock broker
                by active clients. She is a member of the SEBI Secondary Market
                Advisory Committee (SMAC) and the Market Data Advisory Committee
                (MDAC), contributing directly to shaping India's capital markets policy.
              </p>

              {/* Achievement chips */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  '🏆 ET Entrepreneur of the Year',
                  '🎖️ SEBI SMAC Member',
                  '📊 SEBI MDAC Member',
                ].map((tag, i) => (
                  <span key={i} style={{
                    fontSize: '0.72rem', fontWeight: 600,
                    padding: '0.3rem 0.75rem', borderRadius: '100px',
                    background: 'rgba(201,168,76,0.08)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    color: 'var(--gold-soft)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXTENDED TEAM ── */}
      <section className="ag-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="ag-section__label reveal">The team</div>
          <h2 className="ag-section__heading reveal reveal-delay-1">
            Built by traders,<br />for traders.
          </h2>
          <p className="ag-section__sub reveal reveal-delay-2">
            Our 500+ member team is spread across technology, design, risk,
            and operations — united by one goal: making investing simpler for every Indian.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.25rem', marginTop: '3rem',
          }}>
            {EXTENDED_TEAM.map((member, i) => (
              <div key={i} className={`ag-feature-card reveal reveal-delay-${(i % 3) + 1}`}
                style={{ padding: '1.5rem', textAlign: 'center', cursor: 'default' }}>
                <div className="ag-feature-card__glow" />
                {/* Avatar with initial */}
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: `${member.color}22`,
                  border: `2px solid ${member.color}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontFamily: 'var(--font-display)', fontSize: '1.3rem',
                  fontWeight: 700, color: member.color,
                }}>
                  {member.initial}
                </div>
                <div style={{
                  fontWeight: 700, fontSize: '0.9rem',
                  color: 'var(--text-primary)', marginBottom: '0.3rem',
                }}>
                  {member.name}
                </div>
                <div style={{
                  fontSize: '0.72rem', color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.03em',
                }}>
                  {member.role}
                </div>
              </div>
            ))}
          </div>

          {/* Careers nudge */}
          <div className="reveal" style={{
            marginTop: '3rem', padding: '2rem',
            background: 'linear-gradient(135deg, rgba(58,107,71,0.1), rgba(107,175,122,0.05))',
            border: '1px solid rgba(107,175,122,0.15)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem',
          }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                Want to join us?
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                We're always looking for passionate people who care about
                democratising finance in India.
              </p>
            </div>
            <a href="/" className="ag-btn-primary" style={{ fontSize: '0.875rem', textDecoration: 'none' }}>
              See open roles →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Team;