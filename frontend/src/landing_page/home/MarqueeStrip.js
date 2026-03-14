/* ============================================================
   MarqueeStrip.js  — scrolling live prices below the hero
   ============================================================ */
const STRIP_DATA = [
  { sym: 'NIFTY 50',  price: '22,485.60', chg: '+0.58%',  up: true  },
  { sym: 'SENSEX',    price: '73,648.62', chg: '+0.61%',  up: true  },
  { sym: 'BANKNIFTY', price: '48,302.15', chg: '-0.22%',  up: false },
  { sym: 'RELIANCE',  price: '2,847.55',  chg: '+1.24%',  up: true  },
  { sym: 'TCS',       price: '3,921.10',  chg: '-0.38%',  up: false },
  { sym: 'HDFCBANK',  price: '1,654.80',  chg: '+0.91%',  up: true  },
  { sym: 'INFY',      price: '1,478.30',  chg: '+2.15%',  up: true  },
  { sym: 'ICICIBANK', price: '1,052.45',  chg: '+1.03%',  up: true  },
  { sym: 'SBIN',      price: '762.80',    chg: '-0.44%',  up: false },
  { sym: 'WIPRO',     price: '462.45',    chg: '-0.72%',  up: false },
  { sym: 'TATAMOTORS',price: '912.30',    chg: '+1.87%',  up: true  },
  { sym: 'BAJFINANCE',price: '6,782.50',  chg: '+0.33%',  up: true  },
];

// Duplicate for seamless loop
const ITEMS = [...STRIP_DATA, ...STRIP_DATA];

export function MarqueeStrip() {
  return (
    <div className="ag-strip">
      <div className="ag-strip__track">
        {ITEMS.map((item, i) => (
          <span key={i} className="ag-strip__item">
            <span className="ag-strip__sym">{item.sym}</span>
            <span className="ag-strip__price">₹{item.price}</span>
            <span className={`ag-strip__chg ${item.up ? 'up' : 'down'}`}>
              {item.up ? '▲' : '▼'} {item.chg}
            </span>
            <span className="ag-strip__sep">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}