import { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  // ── BACKEND: fetch holdings (unchanged) ──
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [sortKey, setSortKey]         = useState(null);   // column to sort by
  const [sortDir, setSortDir]         = useState("asc");  // asc | desc
  const [showGraph, setShowGraph]     = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3002/holdings", { withCredentials: true })
      .then((res) => {
        console.log(res.data);           // ── BACKEND: kept as-is
        setAllHoldings(res.data);
      })
      .catch((err) => console.log("AXIOS ERROR:", err))  // ── BACKEND: kept as-is
      .finally(() => setLoading(false));
  }, []);

  // ── Chart data: P&L per stock (much more readable than raw price) ──
  const labels = allHoldings.map((s) => s["name"]);
  const chartData = {
    labels,
    datasets: [{
      label: "P&L",
      data: allHoldings.map((s) => parseFloat(((s.price - s.avg) * s.qty).toFixed(2))),
      backgroundColor: "rgba(45,106,79,0.6)",  // overridden per-bar in VerticalGraph
      borderColor: "rgba(45,106,79,1)",
      borderWidth: 1,
      borderRadius: 4,
    }],
  };

  // ── Dynamic totals (were hardcoded before — now computed) ──
  const totalInvestment = allHoldings.reduce((acc, s) => acc + s.avg   * s.qty, 0);
  const totalCurrValue  = allHoldings.reduce((acc, s) => acc + s.price * s.qty, 0);
  const totalPnL        = totalCurrValue - totalInvestment;
  const totalPnLPct     = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  const fmt    = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtPct = (n) => `${n >= 0 ? "+" : ""}${Number(n).toFixed(2)}%`;

  // ── Sorting ──
  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const sorted = [...allHoldings].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = typeof a[sortKey] === "string" ? a[sortKey] : Number(a[sortKey]);
    const valB = typeof b[sortKey] === "string" ? b[sortKey] : Number(b[sortKey]);
    if (valA < valB) return sortDir === "asc" ? -1 :  1;
    if (valA > valB) return sortDir === "asc" ?  1 : -1;
    return 0;
  });

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <span style={{ opacity: 0.2, marginLeft: "3px" }}>↕</span>;
    return <span style={{ marginLeft: "3px", color: "var(--green-primary)" }}>{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  const thStyle = (col) => ({
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    transition: "color 0.15s",
    color: sortKey === col ? "var(--green-primary)" : undefined,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ── Page header ── */}
      <div className="ag-section-header">
        <div>
          <div className="ag-section-title">Holdings</div>
          <div className="ag-section-sub">
            {loading ? "Loading..." : `${allHoldings.length} stock${allHoldings.length !== 1 ? "s" : ""} in portfolio`}
          </div>
        </div>
        {allHoldings.length > 0 && (
          <button
            onClick={() => setShowGraph((v) => !v)}
            className={`ag-chip${showGraph ? " active" : ""}`}
          >
            {showGraph ? "Hide" : "Show"} Chart
          </button>
        )}
      </div>

      {/* ── Summary stat cards ── */}
      {!loading && allHoldings.length > 0 && (
        <div className="ag-grid-3">
          <div className="ag-stat-card">
            <div className="ag-stat-card__label">Total Investment</div>
            <div className="ag-stat-card__value">₹{fmt(totalInvestment)}</div>
            <div className="ag-stat-card__sub">
              <span className="ag-badge ag-badge--neutral">{allHoldings.length} holdings</span>
            </div>
          </div>

          <div className="ag-stat-card">
            <div className="ag-stat-card__label">Current Value</div>
            <div className={`ag-stat-card__value ${totalCurrValue >= totalInvestment ? "ag-up" : "ag-down"}`}>
              ₹{fmt(totalCurrValue)}
            </div>
            <div className="ag-stat-card__sub">
              <span className={`ag-badge ${totalCurrValue >= totalInvestment ? "ag-badge--green" : "ag-badge--red"}`}>
                {fmtPct(totalPnLPct)}
              </span>
            </div>
          </div>

          <div className="ag-stat-card">
            <div className="ag-stat-card__label">Total P&amp;L</div>
            <div className={`ag-stat-card__value ${totalPnL >= 0 ? "ag-up" : "ag-down"}`}>
              {totalPnL >= 0 ? "+" : ""}₹{fmt(totalPnL)}
            </div>
            <div className="ag-stat-card__sub">
              <span className={`ag-badge ${totalPnL >= 0 ? "ag-badge--green" : "ag-badge--red"}`}>
                {totalPnL >= 0 ? "Profit" : "Loss"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="ag-table-wrap">
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              padding: "0.875rem 1rem", borderBottom: "1px solid var(--border)",
              display: "flex", gap: "1rem",
            }}>
              {[100, 50, 70, 70, 80, 70, 70, 70].map((w, j) => (
                <div key={j} className="ag-skeleton" style={{ height: "14px", width: w, borderRadius: "4px" }} />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && allHoldings.length === 0 && (
        <div className="ag-table-wrap">
          <div className="ag-empty" style={{ padding: "4rem 1rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem", opacity: 0.35 }}>📦</div>
            <div style={{ fontSize: "0.925rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              No holdings yet
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", maxWidth: "260px", textAlign: "center" }}>
              Holdings appear here after you place and execute buy orders.
            </div>
          </div>
        </div>
      )}

      {/* ── Holdings table ── */}
      {!loading && allHoldings.length > 0 && (
        <div className="ag-table-wrap">
          <div className="ag-table-header">
            <span className="ag-table-header__title">
              Portfolio Holdings
              <span style={{ marginLeft: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-faint)" }}>
                ({allHoldings.length})
              </span>
            </span>
            <span style={{ fontSize: "0.68rem", color: "var(--text-faint)" }}>
              Click column headers to sort
            </span>
          </div>

          <div className="ag-table-scroll" style={{ overflowX: "auto" }}>
            <table className="ag-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("name")}   style={thStyle("name")}>Instrument <SortIcon col="name" /></th>
                  <th onClick={() => handleSort("qty")}    style={{ ...thStyle("qty"),   textAlign: "right" }}>Qty <SortIcon col="qty" /></th>
                  <th onClick={() => handleSort("avg")}    style={{ ...thStyle("avg"),   textAlign: "right" }}>Avg. Cost <SortIcon col="avg" /></th>
                  <th onClick={() => handleSort("price")}  style={{ ...thStyle("price"), textAlign: "right" }}>LTP <SortIcon col="price" /></th>
                  <th style={{ textAlign: "right" }}>Cur. Value</th>
                  <th onClick={() => handleSort("net")}    style={{ ...thStyle("net"),   textAlign: "right" }}>P&amp;L <SortIcon col="net" /></th>
                  <th style={{ textAlign: "right" }}>Net Chg.</th>
                  <th style={{ textAlign: "right" }}>Day Chg.</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((stock, index) => {
                  // ── BACKEND: same calculations as original ──
                  const currValue = stock.price * stock.qty;
                  const isProfit  = currValue - stock.avg * stock.qty >= 0;
                  const dayClass  = stock.isLoss ? "ag-down" : "ag-up";

                  return (
                    <tr key={index} style={{ animation: `cardFadeUp 0.3s ease ${index * 0.04}s both` }}>

                      {/* Instrument */}
                      <td>
                        <span style={{
                          fontFamily: "var(--font-mono)", fontWeight: 700,
                          fontSize: "0.825rem", color: "var(--text-primary)",
                        }}>
                          {stock.name}
                        </span>
                      </td>

                      {/* Qty */}
                      <td style={{ textAlign: "right" }}>
                        <span className="mono">{stock.qty}</span>
                      </td>

                      {/* Avg cost */}
                      <td style={{ textAlign: "right" }}>
                        <span className="mono">₹{fmt(stock.avg)}</span>
                      </td>

                      {/* LTP */}
                      <td style={{ textAlign: "right" }}>
                        <span className="mono" style={{ fontWeight: 600 }}>₹{fmt(stock.price)}</span>
                      </td>

                      {/* Current value */}
                      <td style={{ textAlign: "right" }}>
                        <span className="mono">₹{fmt(currValue)}</span>
                      </td>

                      {/* P&L */}
                      <td style={{ textAlign: "right" }}>
                        <span className={`mono ${isProfit ? "ag-up" : "ag-down"}`} style={{ fontWeight: 600 }}>
                          {isProfit ? "+" : ""}₹{fmt(currValue - stock.avg * stock.qty)}
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

      {/* ── Vertical bar chart (toggleable) ── */}
      {!loading && allHoldings.length > 0 && showGraph && (
        <div className="ag-table-wrap" style={{ padding: "1.25rem" }}>
          <div style={{
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.07em", textTransform: "uppercase",
            color: "var(--text-muted)", marginBottom: "1rem",
          }}>
            P&L per Stock
          </div>
          <VerticalGraph data={chartData} />
        </div>
      )}

    </div>
  );
};

export default Holdings;