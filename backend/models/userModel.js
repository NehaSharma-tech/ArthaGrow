const mongoose = require("mongoose");
const { userSchema } = require("../schemas/userSchema");

const Users = mongoose.model("User", userSchema);

module.exports=  { Users };