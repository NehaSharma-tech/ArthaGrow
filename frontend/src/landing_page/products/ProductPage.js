import HeroProduct from './HeroProduct';
import PlatformSection from './PlatformSection';
import Universe from './Universe';
import OpenAccount from '../OpenAccount';

// Check if user is logged in via cookie
const isLoggedIn = () => document.cookie.split(';').some(c => c.trim().startsWith('token='));

const handleDashboardCTA = () => {
  if (isLoggedIn()) {
    window.location.href = 'http://localhost:3001';
  } else {
    window.location.href = '/login';
  }
};

const PLATFORMS = [
  {
    flip: false,
    tag: 'Trading Dashboard',
    name: 'Artha Dashboard',
    tagline: 'Web · Real-time · All-in-one',
    description: [
      'A powerful, clean trading dashboard built for serious investors. Real-time portfolio tracking, live order management, watchlists with streaming prices, and deep P&L insights — all in one place.',
      'Co-located at NSE for ultra-fast order execution. Everything you need, nothing you don\'t.',
    ],
    features: ['Live Watchlist', 'Real-time P&L', 'One-click Orders', 'Holdings & Positions', 'Fund Management'],
    image: 'media/images/artha_dashboard.png',
    imageAlt: 'Artha trading dashboard',
    primaryCTA: { label: 'Open Dashboard' },
    primaryCTAAction: handleDashboardCTA,
    appLinks: false,
    badge: 'Flagship',
  },
  {
    flip: true,
    tag: 'Portfolio Dashboard',
    name: 'ArthaConsole',
    tagline: 'Complete Portfolio Intelligence',
    description: [
      'The central dashboard for your ArthaGrow account — your financial mission control. Deep P&L insights, tax reports, visualisations, and everything you need to understand your portfolio at a glance.',
    ],
    features: ['P&L Reports', 'Tax Harvesting', 'Holdings Analysis', 'Fund Statements', 'TradeBook Export'],
    image: 'media/images/artha_console.png',
    imageAlt: 'ArthaConsole dashboard',
    primaryCTA: { label: 'Explore Console', href: '#' },
    appLinks: false,
  },
  {
    flip: false,
    tag: 'Mutual Funds',
    name: 'ArthaFolio',
    tagline: 'Zero-commission Direct Funds',
    description: [
      'Invest in direct mutual funds online, completely commission-free. All units delivered directly to your Demat account — no paperwork, no intermediary cuts.',
    ],
    features: ['Direct Funds Only', 'SIP & Lumpsum', 'Demat Delivery', 'Fund Comparison', 'Goal-based Investing'],
    image: 'media/images/arthafolio.png',
    imageAlt: 'ArthaFolio mutual funds',
    primaryCTA: { label: 'Start Investing', href: '/signup' },
    secondaryCTA: { label: 'Compare Funds', href: '#' },
    appLinks: true,
  },
  {
    flip: true,
    tag: 'Developer Platform',
    name: 'ArthaConnect API',
    tagline: 'Build on India\'s Largest Broker',
    description: [
      'Power your trading app or fintech startup with our clean HTTP/JSON APIs. Real-time data, order management, portfolio APIs — all with a single auth token.',
      'Used by 500+ developers and fintech startups building the next generation of investing tools.',
    ],
    features: ['REST & WebSocket', 'Historical Data', 'Order Management', 'Portfolio APIs', 'Sandbox Mode'],
    image: 'media/images/arthaconnect.png',
    imageAlt: 'ArthaConnect API',
    primaryCTA: { label: 'View API Docs', href: '#' },
    secondaryCTA: { label: 'Get API Access', href: '#' },
    appLinks: false,
    badge: 'For Developers',
  },
  {
    flip: false,
    tag: 'Financial Education',
    name: 'ArthaVidya',
    tagline: 'Free · Open · Comprehensive',
    description: [
      'The largest free stock market education library in India. From "what is a stock" to advanced options Greeks — broken into bite-sized modules you can learn at your own pace.',
    ],
    features: ['200+ Modules', 'Bite-size Cards', 'Audio Lessons', 'Quizzes & Tests', 'Certificate Tracks'],
    image: 'media/images/artha_vidya.png',
    imageAlt: 'ArthaVidya education',
    primaryCTA: { label: 'Start Learning Free', href: '#' },
    appLinks: true,
  },
];

function ProductPage() {
  return (
    <>
      <HeroProduct />

      <div id="platforms">
        {PLATFORMS.map((platform, i) => (
          <PlatformSection key={i} {...platform} />
        ))}
      </div>

      <Universe />
      <OpenAccount />
    </>
  );
}

export default ProductPage;