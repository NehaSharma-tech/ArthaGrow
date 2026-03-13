import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [inputValue, setInputValue] = useState({ email: "", password: "", username: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  // ── BACKEND: toast handlers (unchanged) ──
  const handleError   = (err) => toast.error(err,   { position: "bottom-left"  });
  const handleSuccess = (msg) => toast.success(msg, { position: "bottom-right" });

  // ── BACKEND: submit handler (unchanged logic) ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      handleError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:3002/signup",
        { ...inputValue },
        { withCredentials: true }
      );

      const { success, message, token } = data;

      if (success) {
        handleSuccess(message);
        // Cookie is set by backend automatically — no localStorage needed
        setTimeout(() => { window.location.href = 'http://localhost:3001'; }, 1200);
      } else {
        handleError(message);
      }

    } catch (error) {
      handleError(error?.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }

    setInputValue({ email: "", password: "", username: "" });
  };

  /* ── password strength ── */
  const strength = (() => {
    if (!password) return null;
    if (password.length < 6) return { label: 'Weak', color: '#CC5F5F', width: '30%' };
    if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password))
      return { label: 'Fair', color: '#C9A84C', width: '60%' };
    return { label: 'Strong', color: '#6BAF7A', width: '100%' };
  })();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'calc(var(--nav-h) + 2rem) 5% 4rem',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'linear-gradient(rgba(107,175,122,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(107,175,122,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(58,107,71,0.12) 0%, transparent 65%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Card */}
      <div className="ag-auth-card" style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '460px',
        background: 'var(--bg-card)',
        border: '1px solid rgba(107,175,122,0.14)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
        animation: 'fadeUp 0.6s var(--ease) both',
      }}>

        {/* Top accent bar */}
        <div style={{ height: '3px', background: 'var(--grad-green)' }} />

        <div className="ag-auth-inner" style={{ padding: '2.5rem' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/">
              <img src="/media/images/logo1.png" alt="ArthaGrow"
                style={{
                  height: '40px', marginBottom: '1.5rem',
                  filter: 'invert(1) sepia(1) saturate(2.5) hue-rotate(90deg) brightness(1.15)',
                }} />
            </Link>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.5rem',
              fontWeight: 800, letterSpacing: '-0.025em',
              color: 'var(--text-primary)', marginBottom: '0.4rem',
            }}>
              Create your account
            </h2>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: '0.95rem',
              color: 'var(--text-muted)', fontWeight: 300,
            }}>
              Start your investment journey today — free forever.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

            {/* Email */}
            <div>
              <label style={{
                display: 'block', fontSize: '0.72rem', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: '0.45rem',
              }}>
                Email address
              </label>
              <input
                type="email" name="email" value={email}
                placeholder="you@example.com"
                onChange={handleOnChange}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(107,175,122,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(107,175,122,0.15)'}
              />
            </div>

            {/* Username */}
            <div>
              <label style={{
                display: 'block', fontSize: '0.72rem', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: '0.45rem',
              }}>
                Username
              </label>
              <input
                type="text" name="username" value={username}
                placeholder="Choose a username"
                onChange={handleOnChange}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(107,175,122,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(107,175,122,0.15)'}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block', fontSize: '0.72rem', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: '0.45rem',
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password" value={password}
                  placeholder="Min 8 characters"
                  onChange={handleOnChange}
                  style={{ ...inputStyle, paddingRight: '3rem' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(107,175,122,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(107,175,122,0.15)'}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} style={{
                  position: 'absolute', right: '0.85rem', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', fontSize: '0.9rem', padding: '2px',
                  lineHeight: 1,
                }}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              {/* Strength bar */}
              {strength && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{
                    height: '3px', borderRadius: '2px',
                    background: 'var(--bg-elevated)', overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', borderRadius: '2px',
                      width: strength.width, background: strength.color,
                      transition: 'width 0.4s var(--ease), background 0.4s',
                    }} />
                  </div>
                  <div style={{
                    fontSize: '0.65rem', fontWeight: 600,
                    color: strength.color, marginTop: '0.25rem',
                    textAlign: 'right', letterSpacing: '0.04em',
                  }}>
                    {strength.label} password
                  </div>
                </div>
              )}
            </div>

            {/* T&C note */}
            <p style={{ fontSize: '0.7rem', color: 'var(--text-faint)', lineHeight: 1.6, margin: '0.25rem 0' }}>
              By creating an account, you agree to our{' '}
              <a href="#" style={{ color: 'var(--green-sage)', textDecoration: 'none' }}>Terms of Service</a>
              {' '}and{' '}
              <a href="#" style={{ color: 'var(--green-sage)', textDecoration: 'none' }}>Privacy Policy</a>.
            </p>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.9rem',
                background: loading ? 'var(--green-forest)' : 'var(--grad-green)',
                border: 'none', borderRadius: '8px',
                fontFamily: 'var(--font-display)', fontSize: '0.95rem',
                fontWeight: 700, color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s var(--ease)',
                boxShadow: loading ? 'none' : '0 0 24px rgba(107,175,122,0.28)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                opacity: loading ? 0.8 : 1,
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 4px 30px rgba(107,175,122,0.48)'; }}
              onMouseLeave={e => e.currentTarget.style.boxShadow = loading ? 'none' : '0 0 24px rgba(107,175,122,0.28)'}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', borderRadius: '50%',
                    animation: 'rotateSlow 0.7s linear infinite', display: 'inline-block',
                  }} />
                  Creating Account...
                </>
              ) : (
                'Create Free Account →'
              )}
            </button>

          </form>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            margin: '1.5rem 0',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--text-faint)' }} />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)', letterSpacing: '0.04em' }}>
              Already have an account?
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--text-faint)' }} />
          </div>

          {/* Login link */}
          <Link to="/login" style={{
            display: 'block', width: '100%', padding: '0.8rem',
            textAlign: 'center', borderRadius: '8px', textDecoration: 'none',
            border: '1px solid rgba(107,175,122,0.2)',
            background: 'transparent',
            fontFamily: 'var(--font-display)', fontSize: '0.88rem',
            fontWeight: 600, color: 'var(--green-sage)',
            transition: 'all 0.25s var(--ease)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(107,175,122,0.06)'; e.currentTarget.style.borderColor = 'rgba(107,175,122,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(107,175,122,0.2)'; }}
          >
            Log in to your account
          </Link>

        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 2.5rem',
          borderTop: '1px solid rgba(107,175,122,0.07)',
          display: 'flex', justifyContent: 'center', gap: '1.25rem',
          flexWrap: 'wrap',
        }}>
          {['SEBI Regulated', 'CDSL Secured', '₹0 Account Fee'].map((t, i) => (
            <span key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              fontSize: '0.65rem', fontWeight: 600,
              color: 'var(--text-faint)', letterSpacing: '0.04em',
            }}>
              <span style={{ color: 'var(--green-sage)', fontSize: '0.6rem' }}>✓</span>
              {t}
            </span>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

/* Shared input style */
const inputStyle = {
  width: '100%', padding: '0.8rem 1rem',
  background: 'var(--bg-elevated)',
  border: '1px solid rgba(107,175,122,0.15)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-display)', fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.25s, box-shadow 0.25s',
};

export default Signup;