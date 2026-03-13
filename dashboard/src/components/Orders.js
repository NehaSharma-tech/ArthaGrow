import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  // ── BACKEND: fetch all orders (unchanged) ──
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState("ALL"); // ALL | BUY | SELL

  useEffect(() => {
    axios
      .get("http://localhost:3002/orders", { withCredentials: true })
      .then((res) => setAllOrders(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // ── BACKEND: calculate totals (unchanged logic) ──
  const totalBuy  = allOrders.filter((o) => o.mode === "BUY") .reduce((acc, o) => acc + o.qty * o.price, 0);
  const totalSell = allOrders.filter((o) => o.mode === "SELL").reduce((acc, o) => acc + o.qty * o.price, 0);
  const netInvestment = totalBuy - totalSell;

  // Filter for display
  const filtered = filter === "ALL" ? allOrders : allOrders.filter((o) => o.mode === filter);

  const fmt = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ── Page header ── */}
      <div className="ag-section-header">
        <div>
          <div className="ag-section-title">Orders</div>
          <div className="ag-section-sub">
            {loading ? "Loading..." : `${allOrders.length} order${allOrders.length !== 1 ? "s" : ""} placed`}
          </div>
        </div>

        {/* Filter chips */}
        {allOrders.length > 0 && (
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {["ALL", "BUY", "SELL"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`ag-chip${filter === f ? " active" : ""}`}
                style={{
                  background: filter === f
                    ? f === "BUY"  ? "var(--green-pale)"
                    : f === "SELL" ? "var(--red-pale)"
                    : "var(--green-pale)"
                    : undefined,
                  color: filter === f
                    ? f === "BUY"  ? "var(--green-primary)"
                    : f === "SELL" ? "var(--red-primary)"
                    : "var(--green-primary)"
                    : undefined,
                  borderColor: filter === f
                    ? f === "BUY"  ? "rgba(45,106,79,0.2)"
                    : f === "SELL" ? "rgba(192,57,43,0.2)"
                    : "rgba(45,106,79,0.2)"
                    : undefined,
                }}
              >
                {f}
                {f !== "ALL" && (
                  <span style={{
                    marginLeft: "0.3rem",
                    fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                    opacity: 0.7,
                  }}>
                    {allOrders.filter((o) => o.mode === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="ag-table-wrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              padding: "0.875rem 1rem",
              borderBottom: "1px solid var(--border)",
              display: "flex", gap: "1rem",
            }}>
              {[120, 60, 80, 60, 90].map((w, j) => (
                <div key={j} className="ag-skeleton" style={{ height: "14px", width: w, borderRadius: "4px" }} />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && allOrders.length === 0 && (
        <div className="ag-table-wrap">
          <div className="ag-empty" style={{ padding: "4rem 1rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem", opacity: 0.35 }}>📋</div>
            <div style={{
              fontSize: "0.925rem", fontWeight: 600,
              color: "var(--text-secondary)", marginBottom: "0.4rem",
            }}>
              No orders yet
            </div>
            <div style={{
              fontSize: "0.8rem", color: "var(--text-muted)",
              marginBottom: "1.25rem", maxWidth: "260px", textAlign: "center",
            }}>
              You haven't placed any orders today. Go to your watchlist to get started.
            </div>
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              padding: "0.5rem 1.1rem",
              background: "var(--green-primary)", color: "#fff",
              borderRadius: "var(--radius-md)",
              textDecoration: "none", fontSize: "0.8rem", fontWeight: 600,
              transition: "background 0.15s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#245a40"}
              onMouseLeave={(e) => e.currentTarget.style.background = "var(--green-primary)"}
            >
              ← Go to Dashboard
            </Link>
          </div>
        </div>
      )}

      {/* ── Orders table ── */}
      {!loading && allOrders.length > 0 && (
        <>
          <div className="ag-table-wrap">
            <div className="ag-table-header">
              <span className="ag-table-header__title">
                {filter === "ALL" ? "All Orders" : `${filter} Orders`}
                <span style={{
                  marginLeft: "0.5rem",
                  fontFamily: "var(--font-mono)", fontSize: "0.72rem",
                  color: "var(--text-faint)",
                }}>
                  ({filtered.length})
                </span>
              </span>
            </div>

            <div className="ag-table-scroll" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table className="ag-table">
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th style={{ textAlign: "right" }}>Qty</th>
                  <th style={{ textAlign: "right" }}>Price</th>
                  <th style={{ textAlign: "center" }}>Mode</th>
                  <th style={{ textAlign: "right" }}>Total Value</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, index) => {
                  const total     = order.qty * order.price; // ── BACKEND: same calculation
                  const isBuy     = order.mode === "BUY";

                  return (
                    <tr key={index} style={{ animation: `cardFadeUp 0.3s ease ${index * 0.04}s both` }}>

                      {/* Instrument */}
                      <td>
                        <span style={{
                          fontFamily: "var(--font-mono)", fontWeight: 700,
                          fontSize: "0.825rem", color: "var(--text-primary)",
                        }}>
                          {order.name}
                        </span>
                      </td>

                      {/* Qty */}
                      <td style={{ textAlign: "right" }}>
                        <span className="mono" style={{ color: "var(--text-secondary)" }}>
                          {order.qty}
                        </span>
                      </td>

                      {/* Price */}
                      <td style={{ textAlign: "right" }}>
                        <span className="mono">₹{fmt(order.price)}</span>
                      </td>

                      {/* Mode badge */}
                      <td style={{ textAlign: "center" }}>
                        <span className={`ag-badge ${isBuy ? "ag-badge--green" : "ag-badge--red"}`}>
                          {order.mode}
                        </span>
                      </td>

                      {/* Total */}
                      <td style={{ textAlign: "right" }}>
                        <span className={`mono ${isBuy ? "ag-up" : "ag-down"}`}
                          style={{ fontWeight: 600 }}>
                          ₹{fmt(total)}
                        </span>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>

          {/* ── Summary stats row ── */}
          <div className="ag-grid-3" style={{ marginTop: "0.25rem" }}>

            <div className="ag-stat-card">
              <div className="ag-stat-card__label">Total Buy Value</div>
              <div className="ag-stat-card__value ag-up">₹{fmt(totalBuy)}</div>
              <div className="ag-stat-card__sub">
                <span className="ag-badge ag-badge--green">
                  {allOrders.filter((o) => o.mode === "BUY").length} orders
                </span>
              </div>
            </div>

            <div className="ag-stat-card">
              <div className="ag-stat-card__label">Total Sell Value</div>
              <div className="ag-stat-card__value ag-down">₹{fmt(totalSell)}</div>
              <div className="ag-stat-card__sub">
                <span className="ag-badge ag-badge--red">
                  {allOrders.filter((o) => o.mode === "SELL").length} orders
                </span>
              </div>
            </div>

            <div className="ag-stat-card">
              <div className="ag-stat-card__label">Net Investment</div>
              <div className={`ag-stat-card__value ${netInvestment >= 0 ? "ag-up" : "ag-down"}`}>
                {netInvestment >= 0 ? "+" : ""}₹{fmt(netInvestment)}
              </div>
              <div className="ag-stat-card__sub">
                <span className={`ag-badge ${netInvestment >= 0 ? "ag-badge--green" : "ag-badge--red"}`}>
                  {netInvestment >= 0 ? "Net Buy" : "Net Sell"}
                </span>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default Orders;