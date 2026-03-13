const { Users } = require("../models/userModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }

    const user = await Users.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);

    // Set token as cookie only (cookie-only strategy)
    res.cookie("token", token, {
      httpOnly: false,   // false so frontend JS can read it if needed
      sameSite: "lax",   // lax allows cross-origin GET redirects to carry cookie
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in ms
    });

    res.status(201).json({
      message: "Signup successful",
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email", success: false });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email", success: false });
    }

    const token = createSecretToken(user._id);

    // Set token as cookie only (cookie-only strategy)
    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in ms
    });

    res.status(201).json({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};