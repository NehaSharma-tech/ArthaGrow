import { BACKEND_URL } from "../config";
import { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [user, setUser] = useState(null);
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch user + holdings + funds in parallel
        const [verifyRes, holdingsRes, fundsRes] = await Promise.all([
          axios.post(`${BACKEND_URL}/verify`, {}, { withCredentials: true }),
          axios.get(`${BACKEND_URL}/holdings`, { withCredentials: true }),
          axios.get(`${BACKEND_URL}/funds`, { withCredentials: true }),
        ]);

        if (verifyRes.data.status) setUser(verifyRes.data.user);
        setHoldings(holdingsRes.data);
        if (fundsRes.data.success) setFunds(fundsRes.data.funds);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ── Computed holdings stats ──
  const totalInvestment = holdings.reduce((acc, s) => acc + s.avg * s.qty, 0);
  const totalCurrValue = holdings.reduce((acc, s) => acc + s.price * s.qty, 0);
  const totalPnL = totalCurrValue - totalInvestment;
  const totalPnLPct =
    totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  const fmt = (n) => {
    const abs = Math.abs(n);
    if (abs >= 100000) return `${(n / 100000).toFixed(2)}L`;
    if (abs >= 1000) return `${(n / 1000).toFixed(2)}k`;
    return Number(n).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const isPnLProfit = totalPnL >= 0;

  if (loading)
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[200, 160, 200, 160].map((w, i) => (
          <div
            key={i}
            className="ag-skeleton"
            style={{ height: "18px", width: w, borderRadius: "6px" }}
          />
        ))}
      </div>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* ── Greeting ── */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Hi, {user?.username || "Trader"}
        </h2>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            marginTop: "0.2rem",
          }}
        >
          Here's your portfolio snapshot for today.
        </p>
      </div>

      {/* ── Equity / Margins section ── */}
      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {/* Section header */}
        <div
          style={{
            padding: "0.875rem 1.25rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Equity
          </span>
          <span
            className="ag-badge ag-badge--green"
            style={{ fontSize: "0.6rem" }}
          >
            Live
          </span>
        </div>

        <div
          style={{
            padding: "1.25rem",
            display: "flex",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
        >
          {/* Main figure */}
          <div style={{ flex: "0 0 auto" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--green-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              ₹{fmt(funds?.available_margin || 0)}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                marginTop: "0.35rem",
              }}
            >
              Margin available
            </div>
          </div>

          {/* Divider */}
          <div
            style={{ width: "1px", background: "var(--border)", flexShrink: 0 }}
          />

          {/* Secondary info */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Margins used
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                ₹{fmt(funds?.used_margin || 0)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Opening balance
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                ₹{fmt(funds?.opening_balance || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Holdings section ── */}
      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {/* Section header */}
        <div
          style={{
            padding: "0.875rem 1.25rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              Holdings
            </span>
            <span
              className="ag-badge ag-badge--neutral"
              style={{ fontSize: "0.6rem" }}
            >
              {holdings.length}
            </span>
          </div>
        </div>

        {holdings.length === 0 ? (
          <div className="ag-empty" style={{ padding: "2rem" }}>
            <div style={{ fontSize: "1.5rem", opacity: 0.3 }}>📦</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              No holdings yet
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "1.25rem",
              display: "flex",
              gap: "1.5rem",
              alignItems: "stretch",
            }}
          >
            {/* P&L figure */}
            <div style={{ flex: "0 0 auto" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    color: isPnLProfit
                      ? "var(--green-primary)"
                      : "var(--red-primary)",
                  }}
                >
                  {isPnLProfit ? "+" : "-"}₹{fmt(Math.abs(totalPnL))}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    padding: "0.15rem 0.4rem",
                    borderRadius: "4px",
                    background: isPnLProfit
                      ? "var(--green-pale)"
                      : "var(--red-pale)",
                    color: isPnLProfit
                      ? "var(--green-primary)"
                      : "var(--red-primary)",
                  }}
                >
                  {isPnLProfit ? "+" : ""}
                  {totalPnLPct.toFixed(2)}%
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  marginTop: "0.35rem",
                }}
              >
                P&amp;L
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                width: "1px",
                background: "var(--border)",
                flexShrink: 0,
              }}
            />

            {/* Secondary info */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}
                >
                  Current value
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  ₹{fmt(totalCurrValue)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}
                >
                  Investment
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  ₹{fmt(totalInvestment)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Quick nav cards ── */}
      <div className="ag-grid-2">
        {[
          {
            label: "Orders",
            sub: "View order history",
            to: "/orders",
            icon: "📋",
            badge: null,
          },
          {
            label: "Positions",
            sub: "Open intraday trades",
            to: "/positions",
            icon: "📊",
            badge: null,
          },
          {
            label: "Holdings",
            sub: `${holdings.length} stocks`,
            to: "/holdings",
            icon: "📦",
            badge: holdings.length,
          },
          {
            label: "Funds",
            sub: "Manage balance",
            to: "/funds",
            icon: "💰",
            badge: null,
          },
        ].map((item) => (
          <a
            key={item.to}
            href={item.to}
            style={{ textDecoration: "none" }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = item.to;
            }}
          >
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                cursor: "pointer",
                transition: "all 0.18s",
                boxShadow: "var(--shadow-xs)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--green-light)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "0.825rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}
                >
                  {item.sub}
                </div>
              </div>
              {item.badge !== null && (
                <span
                  className="ag-badge ag-badge--neutral"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.badge}
                </span>
              )}
              <span style={{ color: "var(--text-faint)", fontSize: "0.8rem" }}>
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Summary;
