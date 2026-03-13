import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * ProtectedRoute
 * Calls backend /verify with the httpOnly cookie.
 * - Verified   → render children (dashboard)
 * - Not verified → redirect to frontend login on :3000
 * - Loading    → show a minimal spinner so there's no flash
 */
function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState('loading'); // 'loading' | 'ok' | 'fail'

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.post(
          'http://localhost:3002/verify',
          {},
          { withCredentials: true }  // sends the cookie cross-origin to :3002
        );

        if (data.status) {
          setAuthState('ok');
        } else {
          setAuthState('fail');
        }
      } catch (error) {
        setAuthState('fail');
      }
    };

    verify();
  }, []);

  // Redirect to frontend login if not authenticated
  if (authState === 'fail') {
    window.location.href = 'http://localhost:3000/login';
    return null;
  }

  // Minimal loading screen while verifying
  if (authState === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#07090A', flexDirection: 'column', gap: '1rem',
      }}>
        <div style={{
          width: '36px', height: '36px',
          border: '3px solid rgba(107,175,122,0.15)',
          borderTopColor: '#6BAF7A',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <span style={{
          fontFamily: 'sans-serif', fontSize: '0.8rem',
          color: '#5E7062', letterSpacing: '0.06em',
        }}>
          Verifying session...
        </span>
      </div>
    );
  }

  // Auth verified — render dashboard
  return children;
}

export default ProtectedRoute;