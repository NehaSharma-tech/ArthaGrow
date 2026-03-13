import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import { DoughnutChart } from "./DoughnutChart";

/* ── Chart colors matching light design system ── */
const CHART_COLORS = [
  { bg: "rgba(45,106,79,0.6)",   border: "rgba(45,106,79,1)"   },
  { bg: "rgba(82,183,136,0.6)",  border: "rgba(82,183,136,1)"  },
  { bg: "rgba(183,121,31,0.6)",  border: "rgba(183,121,31,1)"  },
  { bg: "rgba(43,108,176,0.6)",  border: "rgba(43,108,176,1)"  },
  { bg: "rgba(192,57,43,0.6)",   border: "rgba(192,57,43,1)"   },
  { bg: "rgba(100,150,120,0.6)", border: "rgba(100,150,120,1)" },
];

const WatchList = ({ open = false, onClose }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch]       = useState("");
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:3002", { withCredentials: true });

    socket.on("watchlistUpdate", (data) => {
      setWatchlist(data);
    });

    return () => {
      socket.off("watchlistUpdate");
      socket.disconnect();
    };
  }, []);

  const filtered = watchlist.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = {
    labels: watchlist.map((s) => s.name),
    datasets: [{
      label: "Price (₹)",
      data:  watchlist.map((s) => s.price),
      backgroundColor: watchlist.map((_, i) => CHART_COLORS[i % CHART_COLORS.length].bg),
      borderColor:     watchlist.map((_, i) => CHART_COLORS[i % CHART_COLORS.length].border),
      borderWidth: 1,
    }],
  };

  return (
    <div className={`ag-watchlist${open ? " open" : ""}`}>

      {/* ── Header ── */}
      <div style={{
        padding: "0.875rem 1rem 0.5rem",
        borderBottom: "1px solid var(--border)",
        flexShrink: 0,
      }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: "0.625rem",
        }}>
          {/* Left: back button (mobile) + title */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {onClose && (
              <button onClick={onClose} className="ag-watchlist-back-btn"
                style={{ background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-primary)", fontSize: "1.2rem",
                  padding: "0 2px", lineHeight: 1,
                }}
              >
                ←
              </button>
            )}
            <span style={{
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.07em", textTransform: "uppercase",
              color: "var(--text-muted)",
            }}>
              Watchlist
            </span>
          </div>

          {/* Right: count + chart toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>
              {watchlist.length}/50
            </span>
            <button onClick={() => setShowChart((v) => !v)} style={{
              background: showChart ? "var(--green-pale)" : "transparent",
              border: "1px solid var(--border)", borderRadius: "4px",
              padding: "2px 6px", cursor: "pointer", fontSize: "0.65rem",
              color: showChart ? "var(--green-primary)" : "var(--text-muted)",
              transition: "all 0.15s",
            }}>
              Chart
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          background: "var(--bg-app)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)", padding: "0.35rem 0.65rem",
        }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-faint)" }}>🔍</span>
          <input type="text" placeholder="Search e.g. INFY, TCS..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", background: "none", outline: "none",
              fontFamily: "var(--font-ui)", fontSize: "0.78rem",
              color: "var(--text-primary)", width: "100%",
            }}
          />
        </div>
      </div>

      {/* ── Scrollable area: list + chart below ── */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>

        <ul style={{ listStyle: "none" }}>
          {filtered.length === 0 && (
            <li style={{ padding: "2rem", textAlign: "center", color: "var(--text-faint)", fontSize: "0.8rem" }}>
              {watchlist.length === 0 ? "Connecting to market…" : "No results"}
            </li>
          )}
          {filtered.map((stock, index) => (
            <WatchListItem stock={stock} key={index} />
          ))}
        </ul>

        {/* ── Chart below list — visible on scroll ── */}
        {showChart && watchlist.length > 0 && (
          <div style={{
            padding: "0.75rem", borderTop: "1px solid var(--border)",
            background: "var(--bg-elevated)",
          }}>
            <div style={{
              fontSize: "0.65rem", fontWeight: 600,
              letterSpacing: "0.07em", textTransform: "uppercase",
              color: "var(--text-muted)", marginBottom: "0.5rem",
            }}>
              Price Distribution
            </div>
            <DoughnutChart data={chartData} />
          </div>
        )}

      </div>

      {/* ── Live indicator ── */}
      <div style={{
        padding: "0.5rem 1rem", borderTop: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: "0.4rem",
        background: "var(--bg-elevated)", flexShrink: 0,
      }}>
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: watchlist.length > 0 ? "var(--green-primary)" : "var(--text-faint)",
          animation: watchlist.length > 0 ? "pulse 2s infinite" : "none",
          display: "inline-block",
        }} />
        <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
          {watchlist.length > 0 ? "Live · updates every 5s" : "Connecting..."}
        </span>
      </div>
    </div>
  );
};

export default WatchList;


/* ═══════════════════════════════════
   WATCHLIST ITEM
═══════════════════════════════════ */
const WatchListItem = ({ stock }) => {
  const [hover, setHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderBottom: "1px solid var(--border)",
        position: "relative",
        background: hover ? "var(--bg-hover)" : "transparent",
        transition: "background 0.15s",
        cursor: "pointer",
      }}
    >
      {/* Stock info row */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: "0.6rem 1rem",
        gap: "0.5rem",
        opacity: hover ? 0 : 1,
        transition: "opacity 0.15s",
      }}>
        {/* Symbol */}
        <span style={{
          flex: 1, fontWeight: 600, fontSize: "0.8rem",
          color: "var(--text-primary)", fontFamily: "var(--font-mono)",
        }}>
          {stock.name}
        </span>

        {/* Change % */}
        <span style={{
          fontSize: "0.7rem", fontFamily: "var(--font-mono)", fontWeight: 500,
          color: stock.isDown ? "var(--red-primary)" : "var(--green-primary)",
          display: "flex", alignItems: "center", gap: "1px",
        }}>
          {stock.isDown
            ? <KeyboardArrowDown style={{ fontSize: "0.9rem" }} />
            : <KeyboardArrowUp  style={{ fontSize: "0.9rem" }} />
          }
          {stock.percent}
        </span>

        {/* Price */}
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.8rem",
          fontWeight: 600, color: "var(--text-primary)",
          minWidth: "60px", textAlign: "right",
        }}>
          ₹{typeof stock.price === "number"
            ? stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : stock.price}
        </span>
      </div>

      {/* Hover actions overlay */}
      {hover && <WatchListActions uid={stock.name} />}
    </li>
  );
};


/* ═══════════════════════════════════
   WATCHLIST ACTIONS (hover overlay)
═══════════════════════════════════ */
const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const [showMore, setShowMore] = useState(false);

  const handleBuyClick  = () => generalContext.openBuyWindow(uid);
  const handleSellClick = () => generalContext.openSellWindow(uid);

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center",
      padding: "0 0.75rem",
      gap: "0.3rem",
      background: "var(--bg-hover)",
      zIndex: 10,
    }}>
      {/* Symbol label */}
      <span style={{
        flex: 1, fontSize: "0.75rem", fontWeight: 700,
        color: "var(--text-primary)", fontFamily: "var(--font-mono)",
      }}>
        {uid}
      </span>

      {/* Buy */}
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button
          onClick={handleBuyClick}
          style={{
            background: "var(--green-primary)", color: "#fff",
            border: "none", borderRadius: "4px",
            padding: "0.25rem 0.6rem", fontSize: "0.72rem",
            fontWeight: 600, cursor: "pointer",
            fontFamily: "var(--font-ui)",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#245a40"}
          onMouseLeave={(e) => e.currentTarget.style.background = "var(--green-primary)"}
        >
          B
        </button>
      </Tooltip>

      {/* Sell */}
      <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
        <button
          onClick={handleSellClick}
          style={{
            background: "var(--red-primary)", color: "#fff",
            border: "none", borderRadius: "4px",
            padding: "0.25rem 0.6rem", fontSize: "0.72rem",
            fontWeight: 600, cursor: "pointer",
            fontFamily: "var(--font-ui)",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#a93226"}
          onMouseLeave={(e) => e.currentTarget.style.background = "var(--red-primary)"}
        >
          S
        </button>
      </Tooltip>

      {/* Analytics */}
      <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
        <button
          onClick={() => alert(`Analytics for ${uid} — coming soon`)}
          style={{
            background: "var(--bg-surface)", color: "var(--text-secondary)",
            border: "1px solid var(--border)", borderRadius: "4px",
            padding: "0.25rem 0.4rem", fontSize: "0.7rem",
            cursor: "pointer", display: "flex", alignItems: "center",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--blue-pale)"; e.currentTarget.style.color = "var(--blue)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
        >
          <BarChartOutlined style={{ fontSize: "0.9rem" }} />
        </button>
      </Tooltip>

      {/* More */}
      <Tooltip title="More options" placement="top" arrow TransitionComponent={Grow}>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowMore((v) => !v)}
            style={{
              background: "var(--bg-surface)", color: "var(--text-secondary)",
              border: "1px solid var(--border)", borderRadius: "4px",
              padding: "0.25rem 0.4rem", fontSize: "0.7rem",
              cursor: "pointer", display: "flex", alignItems: "center",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; }}
          >
            <MoreHoriz style={{ fontSize: "0.9rem" }} />
          </button>

          {/* More dropdown */}
          {showMore && (
            <div style={{
              position: "absolute", right: 0, bottom: "calc(100% + 6px)",
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-md)",
              overflow: "hidden", zIndex: 200,
              minWidth: "160px",
              animation: "cardFadeUp 0.15s ease both",
            }}>
              {[
                { icon: "📌", label: "Add alert" },
                { icon: "📰", label: "View news" },
                { icon: "📈", label: "View chart" },
                { icon: "🗑️", label: "Remove from watchlist" },
              ].map((item, i) => (
                <button key={i} onClick={() => { setShowMore(false); alert(`${item.label} for ${uid} — coming soon`); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    width: "100%", padding: "0.55rem 0.875rem",
                    background: "none", border: "none",
                    fontSize: "0.78rem", color: "var(--text-secondary)",
                    cursor: "pointer", textAlign: "left",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </Tooltip>
    </div>
  );
};