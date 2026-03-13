const mongoose = require("mongoose");
const { positionSchema } = require("../schemas/positionSchema");

const Positions= mongoose.model("Position", positionSchema);

module.exports= { Positions };