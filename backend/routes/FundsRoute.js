const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Funds } = require("../models/fundsModel");
require("dotenv").config();

// ── Helper: extract userId from cookie token ──
const getUserId = (req) => {
  const token = req.cookies.token;
  if (!token) return null;
  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    return data.id;
  } catch {
    return null;
  }
};

// ── GET /funds — fetch user's funds (auto-creates with zeros if first time) ──
router.get("/funds", async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized", success: false });

  try {
    // upsert = auto-init on first visit with all-zero defaults
    const funds = await Funds.findOneAndUpdate(
      { userId },
      { $setOnInsert: { userId } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ success: true, funds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch funds", success: false });
  }
});

// ── PATCH /funds/add — add funds ──
router.patch("/funds/add", async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized", success: false });

  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount", success: false });
  }

  try {
    const funds = await Funds.findOneAndUpdate(
      { userId },
      {
        $inc: {
          available_margin: amount,
          available_cash:   amount,
          live_balance:     amount,
          payin:            amount,
        },
        $set: { updatedAt: Date.now() },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ success: true, funds, message: `₹${amount} added successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add funds", success: false });
  }
});

// ── PATCH /funds/withdraw — withdraw funds ──
router.patch("/funds/withdraw", async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized", success: false });

  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount", success: false });
  }

  try {
    const existing = await Funds.findOne({ userId });
    if (!existing || existing.available_cash < amount) {
      return res.status(400).json({ message: "Insufficient balance", success: false });
    }

    const funds = await Funds.findOneAndUpdate(
      { userId },
      {
        $inc: {
          available_margin: -amount,
          available_cash:   -amount,
          live_balance:     -amount,
        },
        $set: { updatedAt: Date.now() },
      },
      { new: true }
    );
    res.status(200).json({ success: true, funds, message: `₹${amount} withdrawn successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to withdraw funds", success: false });
  }
});

module.exports = router;