const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // one funds document per user
  },

  // ── Available & used ──
  available_margin:  { type: Number, default: 0 },
  used_margin:       { type: Number, default: 0 },
  available_cash:    { type: Number, default: 0 },

  // ── Balance breakdown ──
  opening_balance:   { type: Number, default: 0 },
  live_balance:      { type: Number, default: 0 },
  payin:             { type: Number, default: 0 },

  // ── Margin components ──
  span:              { type: Number, default: 0 },
  delivery_margin:   { type: Number, default: 0 },
  exposure:          { type: Number, default: 0 },
  options_premium:   { type: Number, default: 0 },

  // ── Collateral ──
  collateral_liquid: { type: Number, default: 0 },
  collateral_equity: { type: Number, default: 0 },

  updatedAt: { type: Date, default: Date.now },
});

module.exports = { fundsSchema };