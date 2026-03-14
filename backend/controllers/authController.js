const { Users } = require("../models/userModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");

// ── Cookie options — same object used for both set AND clear ──
// In production (HTTPS + cross-origin), cookies MUST have sameSite:none + secure:true
const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: false,                       // false so JS can read it for auth state check
  secure: isProd,                        // true on HTTPS (required for sameSite:none)
  sameSite: isProd ? "none" : "lax",    // none = cross-origin HTTPS; lax = local dev
  maxAge: 3 * 24 * 60 * 60 * 1000,     // 3 days
};

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }

    const user = await Users.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: "Signup successful",
      success: true,
      user: { id: user._id, email: user.email, username: user.username },
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

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: "Login successful",
      success: true,
      user: { id: user._id, email: user.email, username: user.username },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports.cookieOptions = cookieOptions;