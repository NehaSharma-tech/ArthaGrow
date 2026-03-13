const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const positionSchema= new Schema({
    product: String,
    name: String,
    qty: Number,
    avg:    Number,
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
});

module.exports= { positionSchema }