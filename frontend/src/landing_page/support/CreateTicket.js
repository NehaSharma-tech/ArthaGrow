import { useState, useEffect, useRef } from 'react';

const TOPICS = [
  {
    icon: '🚀',
    title: 'Account Opening',
    color: '#6BAF7A',
    links: [
      'Online Account Opening',
      'Offline Account Opening',
      'Company, Partnership & HUF Account',
      'NRI Account Opening',
      'Charges at ArthaGrow',
      'ArthaGrow 3-in-1 Account',
      'Getting Started',
    ],
  },
  {
    icon: '👤',
    title: 'Your Account',
    color: '#C9A84C',
    links: [
      'Login Credentials',
      'Account Modification & Segment Addition',
      'DP ID & Bank Details',
      'Your Profile',
      'Transfer & Conversion of Shares',
    ],
  },
  {
    icon: '📊',
    title: 'Trading & Platform',
    color: '#9DD4A8',
    links: [
      'Margin, Leverage & Product Types',
      'ArthaKite Web & Mobile',
      'Trading FAQs',
      'Corporate Actions',
      'Smart Alerts (Sentinel)',
      'ArthaConnect API',
      'GTT Orders',
      'Stock Reports+',
    ],
  },
  {
    icon: '💳',
    title: 'Funds',
    color: '#6BAF7A',
    links: [
      'Adding Funds',
      'Fund Withdrawal',
      'eMandates & Auto-pay',
      'Adding Bank Accounts',
    ],
  },
  {
    icon: '🖥️',
    title: 'ArthaConsole',
    color: '#C9A84C',
    links: [
      'Reports & Analytics',
      'Ledger',
      'Portfolio Overview',
      '60-Day Challenge',
      'IPO Applications',
      'Referral Programme',
    ],
  },
  {
    icon: '🌱',
    title: 'Mutual Funds',
    color: '#4E8C5F',
    links: [
      'Understanding Mutual Funds',
      'About ArthaFolio',
      'Buying & Selling Funds',
      'Starting an SIP',
      'Managing your Portfolio',
      'ArthaFolio Mobile App',
      'Moving to Direct Funds',
      'Government Securities',
    ],
  },
];

function TopicCard({ topic, index }) {
  const [expanded, setExpanded] = useState(false);
  const PREVIEW = 4;

  return (
    <div className={`reveal reveal-delay-${(index % 3) + 1}`} style={{
      background: 'var(--bg-card)',
      border: '1px solid rgba(107,175,122,0.08)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      transition: 'all 0.3s var(--ease)',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${topic.color}30`}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(107,175,122,0.08)'}
    >
      {/* Card header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid rgba(107,175,122,0.07)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        background: `${topic.color}06`,
      }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px',
          background: `${topic.color}14`,
          border: `1px solid ${topic.color}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', flexShrink: 0,
        }}>
          {topic.icon}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: '0.9rem',
          fontWeight: 700, color: 'var(--text-primary)', margin: 0,
        }}>
          {topic.title}
        </h3>
        <div style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          color: 'var(--text-faint)',
        }}>
          {topic.links.length} topics
        </div>
      </div>

      {/* Links */}
      <div style={{ padding: '0.5rem 0' }}>
        {(expanded ? topic.links : topic.links.slice(0, PREVIEW)).map((link, i) => (
          <a key={i} href="/" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.6rem 1.5rem',
            color: 'var(--text-muted)', textDecoration: 'none',
            fontSize: '0.82rem', transition: 'all 0.18s',
            borderLeft: '2px solid transparent',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.color = topic.color;
              e.currentTarget.style.borderLeftColor = topic.color;
              e.currentTarget.style.background = `${topic.color}06`;
              e.currentTarget.style.paddingLeft = '1.75rem';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderLeftColor = 'transparent';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.paddingLeft = '1.5rem';
            }}
          >
            {link}
            <span style={{ fontSize: '0.7rem', opacity: 0.4 }}>→</span>
          </a>
        ))}

        {/* Show more / less */}
        {topic.links.length > PREVIEW && (
          <button onClick={() => setExpanded(v => !v)} style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.6rem 1.5rem',
            color: topic.color, fontSize: '0.75rem', fontWeight: 600,
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-display)', letterSpacing: '0.02em',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {expanded
              ? `↑ Show less`
              : `↓ Show ${topic.links.length - PREVIEW} more`}
          </button>
        )}
      </div>
    </div>
  );
}

function CreateTicket() {
  const ref = useRef(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.reveal') || [];
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06 }
    );
    items.forEach(i => observer.observe(i));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ag-section" ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="ag-section__label reveal">Create a Ticket</div>
          <h2 className="ag-section__heading reveal reveal-delay-1">
            Select a topic to{' '}
            <span style={{
              background: 'var(--grad-text)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>get started.</span>
          </h2>
          <p className="ag-section__sub reveal reveal-delay-2">
            Can't find what you need? Our support team typically responds within 4–6 hours on working days.
          </p>
        </div>

        {/* 3-column topic grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {TOPICS.map((topic, i) => (
            <TopicCard key={i} topic={topic} index={i} />
          ))}
        </div>

        {/* Still need help? */}
        <div className="reveal" style={{
          marginTop: '3.5rem',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {[
            { icon: '🎫', title: 'Raise a Ticket', desc: 'Didn\'t find your answer? Open a new support ticket.', cta: 'Open Ticket', href: '#', primary: true },
            { icon: '📞', title: 'Callback Request', desc: 'Request a callback from our support team during working hours.', cta: 'Request Callback', href: '#' },
            { icon: '📚', title: 'ArthaVidya', desc: 'Browse our free knowledge base for in-depth trading guides.', cta: 'Go to ArthaVidya', href: '#' },
          ].map((c, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              border: `1px solid ${c.primary ? 'rgba(107,175,122,0.25)' : 'rgba(107,175,122,0.08)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              transition: 'all 0.3s var(--ease)',
              position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {c.primary && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--grad-green)' }} />
              )}
              <div style={{ fontSize: '1.8rem', marginBottom: '0.875rem' }}>{c.icon}</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {c.title}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {c.desc}
              </p>
              <a href={c.href} className={c.primary ? 'ag-btn-primary' : 'ag-btn-ghost'}
                style={{ fontSize: '0.8rem', textDecoration: 'none' }}>
                {c.cta} →
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CreateTicket;