const { Signup, Login, cookieOptions } = require("../controllers/authController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login",  Login);
router.post("/verify", userVerification);

router.get("/logout", (req, res) => {
  // MUST match same options as setCookie (minus maxAge) — otherwise browser ignores it
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: false,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
  res.status(200).json({ message: "Logged out successfully", success: true });
});

module.exports = router;