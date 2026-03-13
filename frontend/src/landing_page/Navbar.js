import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const navigate   = useNavigate();
  const location   = useLocation();

  useEffect(() => {
    const hasCookie = document.cookie
      .split(';')
      .some(c => c.trim().startsWith('token='));
    setIsLoggedIn(hasCookie);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = async() => {
    try {
      await axios.get('http://localhost:3002/logout', { withCredentials: true });
    } catch (e) {
      // Even if request fails, proceed with local cleanup
      console.log(e);
    }
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <nav className={`ag-navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <Link className="ag-navbar__logo" to="/">
          <img src="/media/images/logo1.png" alt="ArthaGrow" />
        </Link>

        {/* Desktop Links */}
        <ul className="ag-navbar__links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/product">Platform</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/support">Support</Link></li>

          {!isLoggedIn ? (
            <>
              <li>
                <Link className="ag-btn-nav ag-btn-nav--outline" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="ag-btn-nav ag-btn-nav--fill" to="/signup">
                  Open Account
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                {/* Dashboard is a separate app on :3001 */}
                <a className="ag-btn-nav ag-btn-nav--outline" href="http://localhost:3001">
                  Dashboard
                </a>
              </li>
              <li>
                <button className="ag-btn-nav ag-btn-nav--fill" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger */}
        <button
          className="ag-navbar__hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
        </button>
      </nav>

      {/* Mobile Menu */}
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
            <a href="http://localhost:3001" style={{ color: 'var(--green-sage)' }}>Dashboard →</a>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;