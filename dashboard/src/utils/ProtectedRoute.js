import { BACKEND_URL, FRONTEND_URL } from "../config";
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState('loading'); // 'loading' | 'ok' | 'fail'

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.post(
          `${BACKEND_URL}/verify`,
          {},
          { withCredentials: true }
        );
        // data.status is true if token is valid
        setAuthState(data.status ? 'ok' : 'fail');
      } catch (error) {
        console.error('ProtectedRoute verify error:', error.message);
        setAuthState('fail');
      }
    };

    verify();
  }, []);

  // ── Loading: show spinner while /verify is in flight ──
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

  // ── Fail: only redirect AFTER verify completes, never during loading ──
  if (authState === 'fail') {
    const loginUrl = `${FRONTEND_URL}/login`.replace(/([^:]\/)\/+/g, '$1');
    window.location.href = loginUrl;
    return null;
  }

  // ── OK: render the dashboard ──
  return children;
}

export default ProtectedRoute;