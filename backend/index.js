const dns = require("node:dns");
dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8"]);

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const fundsRoute = require("./routes/FundsRoute");

const { Holdings } = require("./models/holdingModel");
const { Positions } = require("./models/positionModel");
const { Orders } = require("./models/orderModel");
const { Funds } = require("./models/fundsModel");

const http = require("http");
const { Server } = require("socket.io");
const { NseIndia } = require("stock-nse-india");

const PORT = process.env.PORT || 3002;
const uri = process.env.ATLASDB_URL;

// Trim + strip trailing slash to avoid silent CORS mismatches
const clean = (url) => (url || "").trim().replace(/\/$/, "");
const FRONTEND_URL = clean(process.env.FRONTEND_URL);
const DASHBOARD_URL = clean(process.env.DASHBOARD_URL);

/* ---------------------- ALLOWED ORIGINS ---------------------- */

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  FRONTEND_URL,
  DASHBOARD_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (curl, Postman, Thunder Client)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
};

/* ---------------------- HTTP SERVER ---------------------- */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    credentials: true,
  },
});

const nse = new NseIndia();

const axios = require("axios");

const NSE_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  Referer: "https://www.nseindia.com/",
  Origin: "https://www.nseindia.com",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
};

let nseCookies = "";

async function bootstrapNseSession() {
  try {
    const resp = await axios.get("https://www.nseindia.com", {
      headers: NSE_HEADERS,
      timeout: 10000,
    });
    const rawCookies = resp.headers["set-cookie"];
    if (rawCookies) {
      nseCookies = rawCookies.map((c) => c.split(";")[0]).join("; ");
      console.log("NSE session bootstrapped");
    }
  } catch (err) {
    console.log("NSE session bootstrap failed:", err.message);
  }
}

// Inject browser headers into every axios request to nseindia.com
axios.interceptors.request.use((config) => {
  if (config.url && config.url.includes("nseindia.com")) {
    config.headers = {
      ...config.headers,
      ...NSE_HEADERS,
      ...(nseCookies ? { Cookie: nseCookies } : {}),
    };
  }
  return config;
});

/* ---------------------- MIDDLEWARE ---------------------- */

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ---------------------- DB CONNECTION ---------------------- */

main()
  .then(async () => {
    console.log("DB connection successful");
    await bootstrapNseSession();
    setInterval(bootstrapNseSession, 25 * 60 * 1000); // refresh every 25 min
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(uri);
}

/* ---------------------- ROUTES ---------------------- */

app.use("/", authRoute);
app.use("/", fundsRoute);

app.get("/holdings", async (req, res) => {
  const allHoldings = await Holdings.find({});
  res.json(allHoldings);
});

app.get("/positions", async (req, res) => {
  const allPositions = await Positions.find({});
  res.json(allPositions);
});

app.get("/orders", async (req, res) => {
  const allOrders = await Orders.find({});
  res.json(allOrders);
});

/* ---------------------- WATCHLIST STOCKS ---------------------- */

const watchlist = [
  "RELIANCE",
  "TCS",
  "INFY",
  "HDFCBANK",
  "ICICIBANK",
  "SBIN",
  "ITC",
  "HINDUNILVR",
  "LT",
  "KOTAKBANK",
  "BAJFINANCE",
  "AXISBANK",
];

/* ---------------------- WEBSOCKET ---------------------- */

io.on("connection", (socket) => {
  console.log("User connected to watchlist socket");
  socket.emit("connected", "WebSocket connected");
  fetchWatchlistPrices();
  fetchIndices();
  socket.on("disconnect", () => console.log("User disconnected"));
});

/* ---------------------- FETCH STOCK DATA ---------------------- */

async function fetchWatchlistPrices() {
  try {
    const stocks = await Promise.all(
      watchlist.map(async (symbol) => {
        const data = await nse.getEquityDetails(symbol);
        return {
          name: symbol,
          price: data.priceInfo.lastPrice,
          percent: Number(data.priceInfo.pChange).toFixed(2) + "%",
          isDown: data.priceInfo.pChange < 0,
        };
      }),
    );
    io.emit("watchlistUpdate", stocks);
  } catch (err) {
    console.log("Watchlist fetch error:", err.message);
  }
}

/* ---------------------- FETCH INDEX DATA ---------------------- */

async function fetchIndices() {
  try {
    const all = await nse.getAllIndices();
    const rows = all?.data || all || [];

    const niftyRow = rows.find((d) => d.indexSymbol === "NIFTY 50");
    const sensexRow = rows.find((d) => d.indexSymbol === "NIFTY BANK");

    if (!niftyRow || !sensexRow) {
      console.log("Indices fetch: rows not found");
      return;
    }

    io.emit("indicesUpdate", {
      nifty: {
        value: niftyRow.last,
        change: niftyRow.percentChange,
        isDown: niftyRow.percentChange < 0,
      },
      sensex: {
        value: sensexRow.last,
        change: sensexRow.percentChange,
        isDown: sensexRow.percentChange < 0,
      },
    });
  } catch (err) {
    console.log("Indices fetch error:", err.message);
  }
}

setInterval(fetchWatchlistPrices, 5000);
setInterval(fetchIndices, 10000);

/* ---------------------- NEW ORDER ---------------------- */

app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode } = req.body;

  const newOrder = new Orders({ name, qty, price, mode });
  await newOrder.save();

  let existingHolding = await Holdings.findOne({ name });

  if (existingHolding) {
    if (mode === "BUY") {
      const totalQty = existingHolding.qty + qty;
      const totalInvestment =
        existingHolding.avg * existingHolding.qty + price * qty;
      existingHolding.avg = totalInvestment / totalQty;
      existingHolding.qty = totalQty;
    } else if (mode === "SELL") {
      existingHolding.qty = existingHolding.qty - qty;
    }
    existingHolding.price = price;
    const pnl =
      (existingHolding.price - existingHolding.avg) * existingHolding.qty;
    existingHolding.net = pnl.toFixed(2);
    existingHolding.day = (pnl * 0.01).toFixed(2);
    await existingHolding.save();
  } else {
    if (mode === "BUY") {
      const newHolding = new Holdings({
        name,
        qty,
        avg: price,
        price,
        net: "0",
        day: "0",
      });
      await newHolding.save();
    }
  }

  res.send("Order Saved & Holdings Updated!");
});

/* ---------------------- START SERVER ---------------------- */

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
