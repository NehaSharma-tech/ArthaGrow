import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Menu from "./Menu";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";
import Apps from "./Apps";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

// Map routes to page titles shown in topbar
const PAGE_TITLES = {
  "/":           { title: "Dashboard",  subtitle: "Portfolio overview"         },
  "/orders":     { title: "Orders",     subtitle: "Your order history"          },
  "/holdings":   { title: "Holdings",   subtitle: "Long-term investments"       },
  "/positions":  { title: "Positions",  subtitle: "Open intraday positions"     },
  "/funds":      { title: "Funds",      subtitle: "Available margin & balance"  },
  "/apps":       { title: "Apps",       subtitle: "Connected tools & services"  },
};

const Home = () => {
  const location = useLocation();
  const pageInfo = PAGE_TITLES[location.pathname] || { title: "ArthaGrow", subtitle: "" };
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);

  // Close sidebar on route change (mobile nav tap)
  const prevPath = React.useRef(location.pathname);
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      setSidebarOpen(false);
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <GeneralContextProvider>
      <div className="ag-dashboard">

        {/* ── Fixed sidebar ── */}
        <Menu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* ── Sidebar backdrop (mobile) ── */}
        {sidebarOpen && (
          <div className="ag-watchlist-backdrop"
            style={{ zIndex: 89, display: "block" }}
            onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Main area ── */}
        <div className="ag-main has-watchlist">
          <TopBar
            title={pageInfo.title}
            subtitle={pageInfo.subtitle}
            onMenuClick={() => setSidebarOpen(prev => !prev)}
          />
          <main className="ag-content">
            <Routes>
              <Route path="/"           element={<Dashboard />} />
              <Route path="/orders"     element={<Orders />}    />
              <Route path="/holdings"   element={<Holdings />}  />
              <Route path="/positions"  element={<Positions />} />
              <Route path="/funds"      element={<Funds />}     />
              <Route path="/apps"       element={<Apps />}      />
            </Routes>
          </main>
        </div>

        {/* ── Watchlist — fixed right panel / mobile drawer ── */}
        <WatchList open={watchlistOpen} onClose={() => setWatchlistOpen(false)} />

        {/* ── Watchlist backdrop (mobile) ── */}
        {watchlistOpen && (
          <div className="ag-watchlist-backdrop"
            style={{ zIndex: 79, display: "block" }}
            onClick={() => setWatchlistOpen(false)} />
        )}

        {/* ── Mobile FAB toggle for watchlist ── */}
        <button
          className="ag-watchlist-toggle"
          onClick={() => setWatchlistOpen(prev => !prev)}
          title="Watchlist"
        >
          {watchlistOpen ? "✕" : "Watchlist"}
        </button>

      </div>
    </GeneralContextProvider>
  );
};

export default Home;