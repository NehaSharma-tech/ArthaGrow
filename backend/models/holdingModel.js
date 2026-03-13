const mongoose = require("mongoose");
const { holdingSchema } = require("../schemas/holdingSchema");

const Holdings= mongoose.model("Holding", holdingSchema);

module.exports= { Holdings };