const mongoose = require("mongoose");
const { fundsSchema } = require("../schemas/fundsSchema");

const Funds = mongoose.model("Funds", fundsSchema);

module.exports = { Funds };