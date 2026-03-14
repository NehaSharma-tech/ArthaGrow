import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL   = (process.env.REACT_APP_BACKEND_URL   || 'http://localhost:3002').trim().replace(/\/$/, '');
const DASHBOARD_URL = (process.env.REACT_APP_DASHBOARD_URL || 'http://localhost:3001').trim().replace(/\/$/, '');

// Force-delete cookie in browser across all path/domain combos
function clearClientCookie(name) {
  const exp = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
  const host = window.location.hostname;
  [['/', host], ['/', `.${host}`], ['/', ''], ['', host], ['', '']].forEach(([path, domain]) => {
    const base = `${name}=; ${exp}; path=${path}`;
    document.cookie = domain ? `${base}; domain=${domain}; SameSite=None; Secure` : `${base}; SameSite=None; Secure`;
    document.cookie = domain ? `${base}; domain=${domain}; SameSite=Lax`         : `${base}; SameSite=Lax`;
    document.cookie = domain ? `${base}; domain=${domain}`                        : base;
  });
}

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const hasCookie = document.cookie.split(';').some(c => c.trim().startsWith('token='));
    setIsLoggedIn(hasCookie);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await axios.get(`${BACKEND_URL}/logout`, { withCredentials: true, timeout: 5000 });
    } catch (e) {
      console.warn('Logout server call failed — clearing cookie client-side:', e.message);
    }
    // Always clear client-side — guarantees logout even if server call fails
    clearClientCookie('token');
    setIsLoggedIn(false);
    setLoggingOut(false);
    navigate('/');
  };

  return (
    <>
      <nav className={`ag-navbar${scrolled ? ' scrolled' : ''}`}>
        <Link className="ag-navbar__logo" to="/">
          <img src="/media/images/logo1.png" alt="ArthaGrow"
            style={{height: '42px', width: 'auto'}}
          />
        </Link>

        <ul className="ag-navbar__links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/product">Platform</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/support">Support</Link></li>
          {!isLoggedIn ? (
            <>
              <li><Link className="ag-btn-nav ag-btn-nav--outline" to="/login">Login</Link></li>
              <li><Link className="ag-btn-nav ag-btn-nav--fill"    to="/signup">Open Account</Link></li>
            </>
          ) : (
            <>
              <li><a className="ag-btn-nav ag-btn-nav--outline" href={DASHBOARD_URL}>Dashboard</a></li>
              <li>
                <button className="ag-btn-nav ag-btn-nav--fill" onClick={handleLogout}
                  disabled={loggingOut}
                  style={{ opacity: loggingOut ? 0.7 : 1, cursor: loggingOut ? 'wait' : 'pointer' }}>
                  {loggingOut ? 'Logging out…' : 'Logout'}
                </button>
              </li>
            </>
          )}
        </ul>

        <button className="ag-navbar__hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
        </button>
      </nav>

      <div className={`ag-mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link to="/about">About</Link>
        <Link to="/product">Platform</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/support">Support</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" style={{ color: 'var(--green-sage)' }}>Open Account →</Link>
          </>
        ) : (
          <>
            <a href={DASHBOARD_URL} style={{ color: 'var(--green-sage)' }}>Dashboard →</a>
            <button onClick={handleLogout} disabled={loggingOut}>{loggingOut ? 'Logging out…' : 'Logout'}</button>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;