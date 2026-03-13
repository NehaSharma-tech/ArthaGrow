const mongoose = require("mongoose");
const { orderSchema } = require("../schemas/orderSchema");

const Orders= mongoose.model("Order", orderSchema);

module.exports= { Orders };