import { BACKEND_URL } from "../config";
import axios from "axios";
import { useState, useEffect } from "react";

const Positions = () => {
  // ── BACKEND: fetch positions (unchanged) ──
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filter, setFilter]             = useState("ALL"); // ALL | MIS | CNC | NRML

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/positions`, { withCredentials: true })
      .then((res) => {
        console.log(res.data); // ── BACKEND: kept as-is
        setAllPositions(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (n) =>
    Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // ── Dynamic totals ──
  const totalPnL = allPositions.reduce((acc, s) => {
    const currValue = s.price * s.qty;
    return acc + (currValue - s.avg * s.qty);
  }, 0);

  const profitCount = allPositions.filter((s) => s.price * s.qty - s.avg * s.qty >= 0).length;
  const lossCount   = allPositions.length - profitCount;

  // ── Filter by product type ──
  const productTypes = ["ALL", ...new Set(allPositions.map((s) => s.product).filter(Boolean))];
  const filtered     = filter === "ALL" ? allPositions : allPositions.filter((s) => s.product === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ── Page header ── */}
      <div className="ag-section-header">
        <div>
          <div className="ag-section-title">Positions</div>
          <div className="ag-section-sub">
            {loading
              ? "Loading..."
              : `${allPositions.length} open position${allPositions.length !== 1 ? "s" : ""}`}
          </div>
        </div>

        {/* Product filter chips */}
        {allPositions.length > 0 && (
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {productTypes.map((pt) => (
              <button
                key={pt}
                onClick={() => setFilter(pt)}
                className={`ag-chip${filter === pt ? " active" : ""}`}
              >
                {pt}
                {pt !== "ALL" && (
                  <span style={{ marginLeft: "0.3rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", opacity: 0.7 }}>
                    {allPositions.filter((s) => s.product === pt).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Summary cards ── */}
      {!loading && allPositions.length > 0 && (
        <div className="ag-grid-3">
          <div className="ag-stat-card">
            <div className="ag-stat-card__label">Open Positions</div>
            <div className="ag-stat-card__value">{allPositions.length}</div>
            <div className="ag-stat-card__sub">
              <span className="ag-badge ag-badge--green">{profitCount} profit</span>
              <span style={{ marginLeft: "0.4rem" }} className="ag-badge ag-badge--red">{lossCount} loss</span>
            </div>
          </div>

          <div className="ag-stat-card">
            <div className="ag-stat-card__label">Total P&amp;L</div>
            <div className={`ag-stat-card__value ${totalPnL >= 0 ? "ag-up" : "ag-down"}`}>
              {totalPnL >= 0 ? "+" : ""}₹{fmt(totalPnL)}
            </div>
            <div className="ag-stat-card__sub">
              <span className={`ag-badge ${totalPnL >= 0 ? "ag-badge--green" : "ag-badge--red"}`}>
                {totalPnL >= 0 ? "↑ Overall Profit" : "↓ Overall Loss"}
              </span>
            </div>
          </div>

          <div className="ag-stat-card">
            <div className="ag-stat-card__label">Win Rate</div>
            <div className="ag-stat-card__value">
              {allPositions.length > 0
                ? `${((profitCount / allPositions.length) * 100).toFixed(0)}%`
                : "—"}
            </div>
            <div className="ag-stat-card__sub">
              <span className="ag-badge ag-badge--neutral">
                {profitCount}W / {lossCount}L
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="ag-table-wrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ padding: "0.875rem 1rem", borderBottom: "1px solid var(--border)", display: "flex", gap: "1rem" }}>
              {[80, 110, 55, 70, 70, 70, 70].map((w, j) => (
                <div key={j} className="ag-skeleton" style={{ height: "14px", width: w, borderRadius: "4px" }} />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && allPositions.length === 0 && (
        <div className="ag-table-wrap">
          <div className="ag-empty" style={{ padding: "4rem 1rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem", opacity: 0.35 }}>📊</div>
            <div style={{ fontSize: "0.925rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              No open positions
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", maxWidth: "260px", textAlign: "center" }}>
              Intraday positions will appear here once you place MIS orders.
            </div>
          </div>
        </div>
      )}

      {/* ── Positions table ── */}
      {!loading && allPositions.length > 0 && (
        <div className="ag-table-wrap">
          <div className="ag-table-header">
            <span className="ag-table-header__title">
              {filter === "ALL" ? "All Positions" : `${filter} Positions`}
              <span style={{ marginLeft: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-faint)" }}>
                ({filtered.length})
              </span>
            </span>
          </div>

          <div className="ag-table-scroll" style={{ overflowX: "auto" }}>
            <table className="ag-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Instrument</th>
                  <th style={{ textAlign: "right" }}>Qty</th>
                  <th style={{ textAlign: "right" }}>Avg.</th>
                  <th style={{ textAlign: "right" }}>LTP</th>
                  <th style={{ textAlign: "right" }}>P&amp;L</th>
                  <th style={{ textAlign: "right" }}>Net Chg.</th>
                  <th style={{ textAlign: "right" }}>Day Chg.</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((stock, index) => {
                  // ── BACKEND: same calculations as original ──
                  const currValue = stock.price * stock.qty;
                  const isProfit  = currValue - stock.avg * stock.qty >= 0;
                  const pnl       = currValue - stock.avg * stock.qty;
                  const dayClass  = stock.isLoss ? "ag-down" : "ag-up";

                  return (
                    <tr key={index} style={{ animation: `cardFadeUp 0.3s ease ${index * 0.04}s both` }}>

                      {/* Product badge */}
                      <td>
                        <span className={`ag-badge ${
                          stock.product === "MIS"  ? "ag-badge--blue" :
                          stock.product === "CNC"  ? "ag-badge--green" :
                          "ag-badge--gold"
                        }`}>
                          {stock.product}
                        </span>
                      </td>

                      {/* Instrument */}
                      <td>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.825rem", color: "var(--text-primary)" }}>
                          {stock.name}
                        </span>
                      </td>

                      {/* Qty */}
                      <td style={{ textAlign: "right" }}>
                        <span className="mono">{stock.qty}</span>
                      </td>

                      {/* Avg */}
                      <td style={{ textAlign: "right" }}>
                        <span className="mono">₹{fmt(stock.avg)}</span>
                      </td>

                      {/* LTP */}
                      <td style={{ textAlign: "right" }}>
                        <span className="mono" style={{ fontWeight: 600 }}>₹{fmt(stock.price)}</span>
                      </td>

                      {/* P&L */}
                      <td style={{ textAlign: "right" }}>
                        <span className={`mono ${isProfit ? "ag-up" : "ag-down"}`} style={{ fontWeight: 600 }}>
                          {isProfit ? "+" : ""}₹{fmt(pnl)}
                        </span>
                      </td>

                      {/* Net chg */}
                      <td style={{ textAlign: "right" }}>
                        <span className={`mono ${isProfit ? "ag-up" : "ag-down"}`}>{stock.net}</span>
                      </td>

                      {/* Day chg */}
                      <td style={{ textAlign: "right" }}>
                        <span className={`mono ${dayClass}`}>{stock.day}</span>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default Positions;