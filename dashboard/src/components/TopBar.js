import { BACKEND_URL } from "../config";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const TopBar = ({ title = "Dashboard", subtitle = "", onMenuClick }) => {
  const [indices, setIndices] = useState({
    nifty:  { value: "--", change: "--", isDown: false },
    sensex: { value: "--", change: "--", isDown: false },
  });
  const [user,      setUser]      = useState(null);
  const [searchVal, setSearchVal] = useState("");

  // ── Fetch user for avatar ──
  useEffect(() => {
    axios
      .post(`${BACKEND_URL}/verify`, {}, { withCredentials: true })
      .then(({ data }) => { if (data.status) setUser(data.user); })
      .catch(() => {});
  }, []);

  // ── Socket: live index prices ──
  useEffect(() => {
    const socket = io(BACKEND_URL, { withCredentials: true });

    socket.on("indicesUpdate", ({ nifty, sensex }) => {
      const fmt = (val, chg) => ({
        value:  Number(val).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change: `${chg >= 0 ? "+" : ""}${Number(chg).toFixed(2)}%`,
        isDown: chg < 0,
      });
      setIndices({
        nifty:  fmt(nifty.value,  nifty.change),
        sensex: fmt(sensex.value, sensex.change),
      });
    });

    return () => { socket.off("indicesUpdate"); socket.disconnect(); };
  }, []);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <header className="ag-topbar">

      {/* Hamburger — only visible on mobile */}
      <button className="ag-topbar__hamburger" onClick={onMenuClick}>
        <span /><span /><span />
      </button>

      {/* Page title */}
      <div style={{ flex: 1 }}>
        <div className="ag-topbar__title">{title}</div>
        {subtitle && <div className="ag-topbar__subtitle">{subtitle}</div>}
      </div>

      {/* Indices */}
      <div className="ag-topbar__indices" style={{
        display: "flex", alignItems: "center", gap: "1.25rem",
        padding: "0 1.25rem",
        borderLeft: "1px solid var(--border)",
        borderRight: "1px solid var(--border)",
      }}>
        {[
          { label: "NIFTY 50",   key: "nifty"  },
          { label: "NIFTY BANK", key: "sensex" },
        ].map((idx) => (
          <div key={idx.key} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "0.62rem", fontWeight: 600,
              letterSpacing: "0.07em", textTransform: "uppercase",
              color: "var(--text-muted)", marginBottom: "1px",
            }}>
              {idx.label}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                fontWeight: 600, color: "var(--text-primary)",
              }}>
                {indices[idx.key].value}
              </span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.68rem",
                color: indices[idx.key].isDown ? "var(--red-primary)" : "var(--green-primary)",
              }}>
                {indices[idx.key].change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="ag-topbar__search">
        <span style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>🔍</span>
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      {/* Avatar */}
      <div className="ag-topbar__avatar" title={user?.username}>
        {getInitials(user?.username)}
      </div>

    </header>
  );
};

export default TopBar;