import { BACKEND_URL } from "../config";
import { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const ORDER_TYPES  = ["Market", "Limit", "SL", "SL-M"];
const PRODUCT_TYPES = ["Intraday (MIS)", "Delivery (CNC)", "Normal (NRML)"];
const VALIDITY     = ["Day", "IOC"];

const BuyActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext); // ✅ fixed — was calling on object directly

  const [orderType,   setOrderType]   = useState("Limit");
  const [productType, setProductType] = useState("Intraday (MIS)");
  const [validity,    setValidity]    = useState("Day");
  const [qty,         setQty]         = useState(1);
  const [price,       setPrice]       = useState("");
  const [triggerPrice,setTriggerPrice]= useState("");
  const [loading,     setLoading]     = useState(false);
  const [status,      setStatus]      = useState(null); // 'success' | 'error'

  const isMarket   = orderType === "Market";
  const isSL       = orderType === "SL" || orderType === "SL-M";
  const marginReq  = qty && price ? (qty * parseFloat(price || 0) * 0.2).toFixed(2) : "—";

  const handleBuy = useCallback(async () => {
    if (!qty || qty <= 0) return;
    if (!isMarket && !price) return;

    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/newOrder`, {
        name:  uid,
        qty:   Number(qty),
        price: isMarket ? 0 : Number(price),
        mode:  "BUY",
      }, { withCredentials: true });

      setStatus("success");
      setTimeout(() => generalContext.closeBuyWindow(), 1200);
    } catch (e) {
      setStatus("error");
      setTimeout(() => setStatus(null), 2500);
    } finally {
      setLoading(false);
    }
  }, [qty, price, isMarket, uid, generalContext]);

  // ── Keyboard shortcut: Escape to close ──
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") generalContext.closeBuyWindow();
    if (e.key === "Enter" && !loading) handleBuy();
  }, [loading, generalContext, handleBuy]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => generalContext.closeBuyWindow()}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15,31,26,0.25)",
          backdropFilter: "blur(2px)",
          zIndex: 999,
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Window */}
      <div className="ag-action-window" style={{
        position: "fixed",
        bottom: "2rem", left: "50%",
        transform: "translateX(-50%)",
        width: "360px",
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-xl)",
        zIndex: 1000,
        overflow: "hidden",
        animation: "cardFadeUp 0.25s var(--ease) both",
      }}>

        {/* Header */}
        <div style={{
          padding: "0.875rem 1.25rem",
          background: "var(--green-pale)",
          borderBottom: "1px solid rgba(45,106,79,0.15)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <span style={{
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--green-primary)",
            }}>
              BUY
            </span>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.95rem",
              fontWeight: 700, color: "var(--text-primary)",
              marginLeft: "0.5rem",
            }}>
              {uid}
            </span>
          </div>
          <button onClick={() => generalContext.closeBuyWindow()} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1,
          }}>✕</button>
        </div>

        <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>

          {/* Order type pills */}
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.4rem" }}>Order Type</div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {ORDER_TYPES.map((t) => (
                <button key={t} onClick={() => setOrderType(t)} style={{
                  padding: "0.25rem 0.65rem", borderRadius: "99px",
                  fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
                  border: "1px solid",
                  borderColor: orderType === t ? "var(--green-primary)" : "var(--border)",
                  background: orderType === t ? "var(--green-pale)" : "transparent",
                  color: orderType === t ? "var(--green-primary)" : "var(--text-muted)",
                  transition: "all 0.15s",
                }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Product type */}
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.4rem" }}>Product</div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {PRODUCT_TYPES.map((t) => (
                <button key={t} onClick={() => setProductType(t)} style={{
                  padding: "0.25rem 0.65rem", borderRadius: "99px",
                  fontSize: "0.68rem", fontWeight: 600, cursor: "pointer",
                  border: "1px solid",
                  borderColor: productType === t ? "var(--green-primary)" : "var(--border)",
                  background: productType === t ? "var(--green-pale)" : "transparent",
                  color: productType === t ? "var(--green-primary)" : "var(--text-muted)",
                  transition: "all 0.15s",
                }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Price row */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.4rem" }}>Quantity</div>
              <input
                type="number" min="1" value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="ag-input"
                style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                Price {isMarket && <span style={{ color: "var(--text-faint)", fontWeight: 400 }}>(auto)</span>}
              </div>
              <input
                type="number" step="0.05" value={price}
                disabled={isMarket}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={isMarket ? "Market price" : "0.00"}
                className="ag-input"
                style={{ fontFamily: "var(--font-mono)", opacity: isMarket ? 0.5 : 1 }}
              />
            </div>
          </div>

          {/* SL trigger price */}
          {isSL && (
            <div>
              <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.4rem" }}>Trigger Price</div>
              <input
                type="number" step="0.05" value={triggerPrice}
                onChange={(e) => setTriggerPrice(e.target.value)}
                placeholder="0.00"
                className="ag-input"
                style={{ fontFamily: "var(--font-mono)" }}
              />
            </div>
          )}

          {/* Validity */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>Validity</div>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {VALIDITY.map((v) => (
                <button key={v} onClick={() => setValidity(v)} style={{
                  padding: "0.2rem 0.55rem", borderRadius: "99px",
                  fontSize: "0.68rem", fontWeight: 600, cursor: "pointer",
                  border: "1px solid",
                  borderColor: validity === v ? "var(--green-primary)" : "var(--border)",
                  background: validity === v ? "var(--green-pale)" : "transparent",
                  color: validity === v ? "var(--green-primary)" : "var(--text-muted)",
                  transition: "all 0.15s",
                }}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Status feedback */}
          {status && (
            <div style={{
              padding: "0.5rem 0.875rem",
              borderRadius: "var(--radius-md)",
              background: status === "success" ? "var(--green-pale)" : "var(--red-pale)",
              color: status === "success" ? "var(--green-primary)" : "var(--red-primary)",
              fontSize: "0.78rem", fontWeight: 600, textAlign: "center",
            }}>
              {status === "success" ? "✓ Order placed successfully" : "✗ Failed to place order. Try again."}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "0.875rem 1.25rem",
          borderTop: "1px solid var(--border)",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg-elevated)",
        }}>
          <div>
            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Est. Margin</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>
              ₹{marginReq}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={() => generalContext.closeBuyWindow()} className="ag-btn ag-btn--ghost ag-btn--sm">
              Cancel
            </button>
            <button
              onClick={handleBuy}
              disabled={loading || status === "success"}
              style={{
                background: loading ? "rgba(45,106,79,0.7)" : "var(--green-primary)",
                color: "#fff", border: "none",
                borderRadius: "var(--radius-md)",
                padding: "0.4rem 1.25rem", fontSize: "0.8rem",
                fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "var(--font-ui)",
                display: "flex", alignItems: "center", gap: "0.4rem",
                transition: "all 0.15s",
              }}
            >
              {loading ? (
                <><span style={{ width: "12px", height: "12px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} /> Placing...</>
              ) : "Buy"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyActionWindow;