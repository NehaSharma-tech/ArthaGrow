import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const BACKEND_URL   = (process.env.REACT_APP_BACKEND_URL   || "http://localhost:3002").trim().replace(/\/$/, "");
const DASHBOARD_URL = (process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001").trim().replace(/\/$/, "");

const Login = () => {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError   = (err) => toast.error(err,   { position: "bottom-left" });
  const handleSuccess = (msg) => toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      handleError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${BACKEND_URL}/login`,      
        { ...inputValue },
        { withCredentials: true }
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => { window.location.href = DASHBOARD_URL; }, 1200);
      } else {
        handleError(message);
      }

    } catch (error) {
      handleError(error?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }

    setInputValue({ email: "", password: "" });
  };

  const inputStyle = {
    width: "100%", padding: "0.8rem 1rem",
    background: "var(--bg-elevated)",
    border: "1px solid rgba(107,175,122,0.15)",
    borderRadius: "8px",
    color: "var(--text-primary)",
    fontFamily: "var(--font-display)", fontSize: "0.9rem",
    outline: "none", transition: "border-color 0.25s, box-shadow 0.25s",
  };

  const onFocus = (e) => {
    e.target.style.borderColor = "rgba(107,175,122,0.5)";
    e.target.style.boxShadow   = "0 0 0 3px rgba(107,175,122,0.07)";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "rgba(107,175,122,0.15)";
    e.target.style.boxShadow   = "none";
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "calc(var(--nav-h) + 2rem) 5% 4rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "linear-gradient(rgba(107,175,122,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(107,175,122,0.03) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(58,107,71,0.12) 0%, transparent 65%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", width: "350px", height: "350px", borderRadius: "50%",
        background: "rgba(58,107,71,0.08)", filter: "blur(80px)",
        top: "10%", right: "5%", pointerEvents: "none", zIndex: 0,
        animation: "orbFloat 14s ease-in-out infinite",
      }} />
      <div style={{
        position: "fixed", width: "220px", height: "220px", borderRadius: "50%",
        background: "rgba(201,168,76,0.06)", filter: "blur(70px)",
        bottom: "15%", left: "8%", pointerEvents: "none", zIndex: 0,
        animation: "orbFloat 10s ease-in-out infinite", animationDelay: "-5s",
      }} />

      {/* Card */}
      <div className="ag-auth-card" style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: "440px",
        background: "var(--bg-card)",
        border: "1px solid rgba(107,175,122,0.14)",
        borderRadius: "var(--radius-lg)", overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        animation: "fadeUp 0.6s var(--ease) both",
      }}>
        <div style={{ height: "3px", background: "var(--grad-green)" }} />

        <div className="ag-auth-inner" style={{ padding: "2.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Link to="/">
              <img src="/media/images/logo1.png" alt="ArthaGrow" style={{
                height: "40px", marginBottom: "1.5rem",
              }} />
            </Link>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "1.5rem",
              fontWeight: 800, letterSpacing: "-0.025em",
              color: "var(--text-primary)", marginBottom: "0.4rem",
            }}>Welcome back</h2>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 300 }}>
              Log in to your ArthaGrow account.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.45rem" }}>
                Email address
              </label>
              <input type="email" name="email" value={email} placeholder="you@example.com"
                onChange={handleOnChange} onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
                <label style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  Password
                </label>
                <a href="#!" style={{ fontSize: "0.7rem", color: "var(--green-sage)", textDecoration: "none", fontWeight: 600 }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <input type={showPassword ? "text" : "password"} name="password" value={password}
                  placeholder="Enter your password" onChange={handleOnChange}
                  onFocus={onFocus} onBlur={onBlur}
                  style={{ ...inputStyle, paddingRight: "3rem" }} />
                <button type="button" onClick={() => setShowPassword(v => !v)} style={{
                  position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-muted)", fontSize: "0.9rem", padding: "2px", lineHeight: 1,
                }}>
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "0.9rem", marginTop: "0.25rem",
              background: loading ? "var(--green-forest)" : "var(--grad-green)",
              border: "none", borderRadius: "8px",
              fontFamily: "var(--font-display)", fontSize: "0.95rem",
              fontWeight: 700, color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s var(--ease)",
              boxShadow: loading ? "none" : "0 0 24px rgba(107,175,122,0.28)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              opacity: loading ? 0.8 : 1,
            }}>
              {loading ? (
                <>
                  <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "rotateSlow 0.7s linear infinite", display: "inline-block" }} />
                  Logging in...
                </>
              ) : "Log in to ArthaGrow →"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.5rem 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--text-faint)" }} />
            <span style={{ fontSize: "0.72rem", color: "var(--text-faint)", letterSpacing: "0.04em" }}>New to ArthaGrow?</span>
            <div style={{ flex: 1, height: "1px", background: "var(--text-faint)" }} />
          </div>

          <Link to="/signup" style={{
            display: "block", width: "100%", padding: "0.8rem", textAlign: "center",
            borderRadius: "8px", textDecoration: "none",
            border: "1px solid rgba(107,175,122,0.2)", background: "transparent",
            fontFamily: "var(--font-display)", fontSize: "0.88rem",
            fontWeight: 600, color: "var(--green-sage)", transition: "all 0.25s var(--ease)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(107,175,122,0.06)"; e.currentTarget.style.borderColor = "rgba(107,175,122,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(107,175,122,0.2)"; }}
          >Create a free account</Link>
        </div>

        <div style={{ padding: "1rem 2.5rem", borderTop: "1px solid rgba(107,175,122,0.07)", display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          {["SEBI Regulated", "CDSL Secured", "256-bit Encrypted"].map((t, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.65rem", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "0.04em" }}>
              <span style={{ color: "var(--green-sage)", fontSize: "0.6rem" }}>✓</span>{t}
            </span>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;