import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const NAV_ITEMS = [
  { to: "/",          label: "Dashboard",  icon: "⊞" },
  { to: "/orders",    label: "Orders",     icon: "📋" },
  { to: "/holdings",  label: "Holdings",   icon: "📦" },
  { to: "/positions", label: "Positions",  icon: "📊" },
  { to: "/funds",     label: "Funds",      icon: "💰" },
  { to: "/apps",      label: "Apps",       icon: "⚙️"  },
];

const Menu = ({ open = false, onClose }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ── Fetch logged-in user from backend via cookie ──
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3002/verify",
          {},
          { withCredentials: true }
        );
        if (data.status) setUser(data.user);
      } catch (e) {
        // ProtectedRoute already handles redirect, safe to ignore here
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3002/logout", { withCredentials: true });
    } catch (e) { /* ignore */ }
    window.location.href = "http://localhost:3000/login";
  };

  // Get initials from username
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Determine active route (exact match for /, prefix for others)
  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <aside className={`ag-sidebar${open ? " open" : ""}`}>

      {/* Logo */}
      <a className="ag-sidebar__logo" href="http://localhost:3000">
        <img src="/logo1.png" alt="ArthaGrow" />
        <span className="ag-sidebar__logo-text">ArthaGrow</span>
      </a>

      {/* Nav */}
      <nav className="ag-sidebar__nav">
        <span className="ag-sidebar__section-label">Main Menu</span>

        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={isActive(item.to) ? "active" : ""}
            style={{ textDecoration: "none" }}
          >
            <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User profile footer */}
      <div className="ag-sidebar__footer">

        {/* Logout shortcut */}
        <button
          className="ag-sidebar__nav-item"
          onClick={handleLogout}
          style={{ color: "#C0392B", marginBottom: "0.5rem" }}
        >
          <span style={{ fontSize: "0.9rem" }}>↩</span>
          Logout
        </button>

        {/* Profile card */}
        <div
          onClick={() => setIsProfileOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            padding: "0.65rem 0.75rem",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer",
            transition: "background 0.2s",
            position: "relative",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
        >
          {/* Avatar */}
          <div style={{
            width: "32px", height: "32px",
            borderRadius: "50%",
            background: "var(--green-pale)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.7rem", fontWeight: 700,
            color: "var(--green-primary)",
            flexShrink: 0,
          }}>
            {getInitials(user?.username)}
          </div>

          {/* Name + email */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: "0.8rem", fontWeight: 600,
              color: "var(--text-inverse)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {user?.username || "Loading..."}
            </div>
            <div style={{
              fontSize: "0.68rem",
              color: "var(--text-sidebar-muted)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {user?.email || ""}
            </div>
          </div>

          <span style={{ fontSize: "0.65rem", color: "var(--text-sidebar-muted)" }}>
            {isProfileOpen ? "▲" : "▼"}
          </span>

          {/* Profile dropdown */}
          {isProfileOpen && (
            <div style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: 0, right: 0,
              background: "#243029",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              animation: "cardFadeUp 0.2s ease both",
              zIndex: 200,
            }}>
              {/* User info header */}
              <div style={{
                padding: "0.875rem 1rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div style={{
                  fontSize: "0.75rem", fontWeight: 600,
                  color: "var(--text-inverse)", marginBottom: "0.2rem",
                }}>
                  {user?.username}
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-sidebar-muted)" }}>
                  {user?.email}
                </div>
                <div style={{
                  marginTop: "0.5rem",
                  display: "inline-flex", alignItems: "center", gap: "0.3rem",
                  padding: "0.18rem 0.5rem",
                  borderRadius: "99px",
                  background: "rgba(82,183,136,0.15)",
                  fontSize: "0.62rem", fontWeight: 600,
                  color: "#52B788", letterSpacing: "0.04em",
                }}>
                  ● Active
                </div>
              </div>

              {/* Dropdown actions */}
              {[
                { icon: "👤", label: "My Profile" },
                { icon: "⚙️", label: "Account Settings" },
                { icon: "🔒", label: "Security" },
              ].map((item, i) => (
                <button key={i} style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  width: "100%", padding: "0.6rem 1rem",
                  background: "none", border: "none",
                  fontSize: "0.78rem", color: "var(--text-sidebar-muted)",
                  cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--text-sidebar-muted)"; }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}

              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0.25rem 0" }} />

              <button onClick={handleLogout} style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                width: "100%", padding: "0.6rem 1rem",
                background: "none", border: "none",
                fontSize: "0.78rem", color: "#e57373",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.15s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(192,57,43,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
              >
                <span>↩</span> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Menu;