const { Users } = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {
  // Read token from cookie (cookie-only strategy)
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false, message: "No token found" });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await Users.findById(data.id);

    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    return res.json({
      status: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // Token expired or tampered
    return res.json({ status: false, message: "Invalid or expired token" });
  }
};