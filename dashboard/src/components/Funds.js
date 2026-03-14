import { BACKEND_URL, FRONTEND_URL } from "../config";
import { useState, useEffect } from "react";
import axios from "axios";

const Funds = () => {
  const [funds,         setFunds]         = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [activeTab,     setActiveTab]     = useState("equity");
  const [showAddFunds,  setShowAddFunds]  = useState(false);
  const [showWithdraw,  setShowWithdraw]  = useState(false);
  const [fundAmount,    setFundAmount]    = useState("");
  const [actionStatus,  setActionStatus]  = useState(null); // { type, message }
  const [actionLoading, setActionLoading] = useState(false);

  // ── BACKEND: fetch per-user funds on mount ──
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/funds`, { withCredentials: true })
      .then((res) => { if (res.data.success) setFunds(res.data.funds); })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (n = 0) =>
    Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const totalCollateral = (funds?.collateral_liquid || 0) + (funds?.collateral_equity || 0);
  const totalMargin     = (funds?.available_margin  || 0) + (funds?.used_margin       || 0);
  const utilisation     = totalMargin > 0
    ? ((funds?.used_margin / totalMargin) * 100).toFixed(1)
    : "0.0";

  // ── BACKEND: add funds ──
  const handleAddFunds = async () => {
    if (!fundAmount || fundAmount <= 0) return;
    setActionLoading(true);
    try {
      const res = await axios.patch(
        `${BACKEND_URL}/funds/add`,
        { amount: Number(fundAmount) },
        { withCredentials: true }
      );
      if (res.data.success) {
        setFunds(res.data.funds);
        setActionStatus({ type: "success", message: res.data.message });
        setFundAmount(""); setShowAddFunds(false);
      } else {
        setActionStatus({ type: "error", message: res.data.message });
      }
    } catch {
      setActionStatus({ type: "error", message: "Failed to add funds. Try again." });
    } finally {
      setActionLoading(false);
      setTimeout(() => setActionStatus(null), 3000);
    }
  };

  // ── BACKEND: withdraw funds ──
  const handleWithdraw = async () => {
    if (!fundAmount || fundAmount <= 0) return;
    setActionLoading(true);
    try {
      const res = await axios.patch(
        `${BACKEND_URL}/funds/withdraw`,
        { amount: Number(fundAmount) },
        { withCredentials: true }
      );
      if (res.data.success) {
        setFunds(res.data.funds);
        setActionStatus({ type: "success", message: res.data.message });
        setFundAmount(""); setShowWithdraw(false);
      } else {
        setActionStatus({ type: "error", message: res.data.message });
      }
    } catch {
      setActionStatus({ type: "error", message: "Failed to withdraw. Try again." });
    } finally {
      setActionLoading(false);
      setTimeout(() => setActionStatus(null), 3000);
    }
  };

  const DataRow = ({ label, value, highlight, muted }) => (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0.55rem 0", borderBottom: "1px solid var(--border)",
    }}>
      <span style={{ fontSize: "0.8rem", color: muted ? "var(--text-faint)" : "var(--text-muted)" }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: "0.85rem",
        fontWeight: highlight ? 700 : 500,
        color: highlight ? "var(--green-primary)" : "var(--text-primary)",
      }}>
        ₹{fmt(value)}
      </span>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ── Page header ── */}
      <div className="ag-section-header">
        <div>
          <div className="ag-section-title">Funds</div>
          <div className="ag-section-sub">Instant, zero-cost transfers with UPI</div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => { setShowAddFunds(true); setShowWithdraw(false); setFundAmount(""); }}
            style={{
              padding: "0.45rem 1rem", background: "var(--green-primary)", color: "#fff",
              border: "none", borderRadius: "var(--radius-md)",
              fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              fontFamily: "var(--font-ui)", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#245a40"}
            onMouseLeave={(e) => e.currentTarget.style.background = "var(--green-primary)"}
          >
            + Add Funds
          </button>
          <button
            onClick={() => { setShowWithdraw(true); setShowAddFunds(false); setFundAmount(""); }}
            className="ag-btn ag-btn--ghost"
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* ── Status toast ── */}
      {actionStatus && (
        <div style={{
          padding: "0.65rem 1rem", borderRadius: "var(--radius-md)",
          background: actionStatus.type === "success" ? "var(--green-pale)" : "var(--red-pale)",
          color: actionStatus.type === "success" ? "var(--green-primary)" : "var(--red-primary)",
          fontSize: "0.82rem", fontWeight: 600,
          border: `1px solid ${actionStatus.type === "success" ? "rgba(45,106,79,0.2)" : "rgba(192,57,43,0.2)"}`,
          animation: "cardFadeUp 0.2s ease both",
        }}>
          {actionStatus.type === "success" ? "✓" : "✗"} {actionStatus.message}
        </div>
      )}

      {/* ── Add / Withdraw panel ── */}
      {(showAddFunds || showWithdraw) && (
        <div className="ag-table-wrap" style={{
          padding: "1.25rem",
          borderLeft: `3px solid ${showAddFunds ? "var(--green-primary)" : "var(--blue)"}`,
          animation: "cardFadeUp 0.2s ease both",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
              {showAddFunds ? "Add Funds via UPI" : "Withdraw Funds"}
            </div>
            <button onClick={() => { setShowAddFunds(false); setShowWithdraw(false); setFundAmount(""); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "1rem" }}>
              ✕
            </button>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                Amount (₹)
              </div>
              <input
                type="number" placeholder="Enter amount"
                value={fundAmount} onChange={(e) => setFundAmount(e.target.value)}
                className="ag-input"
                style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}
              />
            </div>
            <button
              onClick={showAddFunds ? handleAddFunds : handleWithdraw}
              disabled={actionLoading || !fundAmount}
              style={{
                padding: "0.55rem 1.25rem",
                background: actionLoading ? "rgba(45,106,79,0.6)"
                  : showAddFunds ? "var(--green-primary)" : "var(--blue)",
                color: "#fff", border: "none",
                borderRadius: "var(--radius-md)",
                fontSize: "0.8rem", fontWeight: 600,
                cursor: actionLoading ? "not-allowed" : "pointer",
                fontFamily: "var(--font-ui)", whiteSpace: "nowrap",
                display: "flex", alignItems: "center", gap: "0.4rem",
                opacity: !fundAmount ? 0.6 : 1,
              }}
            >
              {actionLoading ? (
                <><span style={{ width: "12px", height: "12px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />Processing...</>
              ) : showAddFunds ? "Add via UPI" : "Withdraw"}
            </button>
          </div>

          {/* Quick chips */}
          <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
            {[1000, 5000, 10000, 25000, 50000].map((amt) => (
              <button key={amt} onClick={() => setFundAmount(amt)}
                className={`ag-chip${Number(fundAmount) === amt ? " active" : ""}`}
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem" }}
              >
                ₹{(amt / 1000).toFixed(0)}K
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab switcher ── */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {["equity", "commodity"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`ag-chip${activeTab === tab ? " active" : ""}`}
            style={{ fontSize: "0.78rem", fontWeight: 600, textTransform: "capitalize" }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="ag-grid-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="ag-stat-card">
              <div className="ag-skeleton" style={{ height: "12px", width: 80, borderRadius: "4px", marginBottom: "0.75rem" }} />
              <div className="ag-skeleton" style={{ height: "24px", width: 120, borderRadius: "4px" }} />
            </div>
          ))}
        </div>
      )}

      {/* ── EQUITY TAB ── */}
      {!loading && activeTab === "equity" && funds && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          <div className="ag-grid-3">
            <div className="ag-stat-card" style={{ borderTop: "3px solid var(--green-primary)" }}>
              <div className="ag-stat-card__label">Available Margin</div>
              <div className="ag-stat-card__value ag-up">₹{fmt(funds.available_margin)}</div>
              <div className="ag-stat-card__sub"><span className="ag-badge ag-badge--green">Ready to trade</span></div>
            </div>
            <div className="ag-stat-card" style={{ borderTop: "3px solid var(--red-primary)" }}>
              <div className="ag-stat-card__label">Used Margin</div>
              <div className="ag-stat-card__value ag-down">₹{fmt(funds.used_margin)}</div>
              <div className="ag-stat-card__sub"><span className="ag-badge ag-badge--red">{utilisation}% utilised</span></div>
            </div>
            <div className="ag-stat-card" style={{ borderTop: "3px solid var(--blue)" }}>
              <div className="ag-stat-card__label">Available Cash</div>
              <div className="ag-stat-card__value" style={{ color: "var(--blue)" }}>₹{fmt(funds.available_cash)}</div>
              <div className="ag-stat-card__sub"><span className="ag-badge ag-badge--blue">Withdrawable</span></div>
            </div>
          </div>

          {/* Utilisation bar */}
          <div className="ag-table-wrap" style={{ padding: "1rem 1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-muted)" }}>Margin Utilisation</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>{utilisation}%</span>
            </div>
            <div style={{ height: "6px", background: "var(--border)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${utilisation}%`,
                background: utilisation > 75 ? "var(--red-primary)" : utilisation > 50 ? "var(--gold)" : "var(--green-primary)",
                borderRadius: "99px", transition: "width 0.6s var(--ease)",
              }} />
            </div>
          </div>

          <div className="ag-grid-2">
            <div className="ag-table-wrap" style={{ padding: "1.25rem" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Balance Breakdown</div>
              <DataRow label="Opening Balance" value={funds.opening_balance} />
              <DataRow label="Live Balance"    value={funds.live_balance}    />
              <DataRow label="Payin"           value={funds.payin}           />
              <DataRow label="SPAN"            value={funds.span}            muted />
              <DataRow label="Delivery Margin" value={funds.delivery_margin} muted />
              <DataRow label="Exposure"        value={funds.exposure}        muted />
              <DataRow label="Options Premium" value={funds.options_premium} muted />
            </div>

            <div className="ag-table-wrap" style={{ padding: "1.25rem" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Collateral</div>
              <DataRow label="Liquid Funds" value={funds.collateral_liquid} />
              <DataRow label="Equity"       value={funds.collateral_equity} />
              <div style={{ height: "1px", background: "var(--border)", margin: "0.5rem 0" }} />
              <DataRow label="Total Collateral" value={totalCollateral} highlight />
              <div style={{ marginTop: "1.25rem", padding: "0.875rem", background: "var(--bg-app)", borderRadius: "var(--radius-md)", border: "1px dashed var(--border-strong)", textAlign: "center" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Pledge holdings to increase margin</div>
                <button onClick={() => alert("Pledge — coming soon")} style={{ padding: "0.35rem 0.875rem", background: "transparent", color: "var(--green-primary)", border: "1px solid var(--green-primary)", borderRadius: "var(--radius-md)", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-ui)" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--green-pale)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  Pledge Holdings →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── COMMODITY TAB ── */}
      {activeTab === "commodity" && (
        <div className="ag-table-wrap">
          <div className="ag-empty" style={{ padding: "4rem 1rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem", opacity: 0.35 }}>🌾</div>
            <div style={{ fontSize: "0.925rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>No commodity account</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", maxWidth: "280px", textAlign: "center", marginBottom: "1.25rem" }}>
              Trade gold, silver, crude oil and agri commodities on MCX.
            </div>
            <a href={`${FRONTEND_URL}/signup`} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.5rem 1.1rem", background: "var(--blue)", color: "#fff", borderRadius: "var(--radius-md)", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600 }}>
              Open Commodity Account →
            </a>
          </div>
        </div>
      )}

    </div>
  );
};

export default Funds;