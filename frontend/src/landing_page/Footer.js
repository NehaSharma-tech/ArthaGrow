import { Link } from 'react-router-dom';

const LINKS = {
  Company: [
    { label: 'About',               to: '/about' },
    { label: 'Platform',            to: '/product' },
    { label: 'Pricing',             to: '/pricing' },
    { label: 'Careers',             to: '/careers' },
    { label: 'Press & Media',       to: '/press' },
    { label: 'ArthaGrow Cares',     to: '/csr' },
    { label: 'Referral Programme',  to: '/referral' },
  ],
  Support: [
    { label: 'Contact Us',          to: '/support' },
    { label: 'Support Portal',      to: '/support' },
    { label: 'List of Charges',     to: '/charges' },
    { label: 'Downloads',           to: '/downloads' },
    { label: 'Blog',                to: '/blog' },
  ],
  Account: [
    { label: 'Open an Account',     to: '/signup' },
    { label: 'Fund Transfer',       to: '/funds' },
    { label: 'Platform Demo',       to: '/demo' },
    { label: '60-Day Challenge',    to: '/challenge' },
  ],
};

const SOCIAL = [
  { icon: '𝕏',  label: 'Twitter',   href: '#' },
  { icon: 'in', label: 'LinkedIn',  href: '#' },
  { icon: '▶',  label: 'YouTube',   href: '#' },
  { icon: '📷', label: 'Instagram', href: '#' },
];

const BOTTOM_LINKS = [
  { label: 'NSE',                 href: 'https://nseindia.com' },
  { label: 'BSE',                 href: 'https://bseindia.com' },
  { label: 'MCX',                 href: 'https://mcxindia.com' },
  { label: 'Terms & Conditions',  href: '#' },
  { label: 'Privacy Policy',      href: '#' },
  { label: 'Policies & Procedures', href: '#' },
  { label: 'Disclosure',          href: '#' },
];

function Footer() {
  return (
    <footer className="ag-footer">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Top grid */}
        <div className="ag-footer__grid">
          {/* Brand column */}
          <div>
            <div className="ag-footer__logo">
              <img src="/media/images/logo1.png" alt="ArthaGrow" />
            </div>
            <p className="ag-footer__tagline">
              India's intelligent trading platform — built for growth,
              engineered for trust. Invest in everything that matters.
            </p>
            <div className="ag-footer__social">
              {SOCIAL.map((s, i) => (
                <a key={i} href={s.href} className="ag-footer__social-btn" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <div className="ag-footer__col-title">{title}</div>
              <ul className="ag-footer__links">
                {links.map((l, i) => (
                  <li key={i}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="ag-footer__legal">
          <p>
            <strong style={{ color: 'var(--text-muted)' }}>ArthaGrow Broking Ltd.</strong> — Member of NSE & BSE.
            SEBI Registration No.: _________ | CDSL Depository services through ArthaGrow Securities Pvt. Ltd.
            SEBI Reg. No.: _________ | Commodity Trading: MCX _________ | Registered Address: ArthaGrow Broking Ltd., India.
          </p>
          <p>
            For complaints pertaining to securities broking write to complaints@arthagrow.com;
            for DP related queries: dp@arthagrow.com. Please read the Risk Disclosure Document as prescribed by SEBI.
          </p>
          <p>
            Investments in securities market are subject to market risks; read all the related documents
            carefully before investing. Prevent unauthorised transactions — update your mobile/email with your broker.
            KYC is a one-time exercise across all SEBI-registered intermediaries.
          </p>
          <p>
            Procedure to file a complaint on SEBI SCORES: Register → provide Name, PAN, Address, Mobile, Email.
            As a business we don't give stock tips and have not authorised anyone to trade on behalf of others.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="ag-footer__bottom">
          <span className="ag-footer__copy">
            © 2026 ArthaGrow Broking Ltd. All rights reserved.
          </span>
          <div className="ag-footer__bottom-links">
            {BOTTOM_LINKS.map((l, i) => (
              <a key={i} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;