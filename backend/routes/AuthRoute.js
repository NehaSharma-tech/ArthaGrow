const { Signup, Login } = require("../controllers/authController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);

router.post("/login", Login);

// Used by ProtectedRoute in dashboard to verify cookie server-side
router.post("/verify", userVerification);

router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: false,
    sameSite: "lax",
  });
  res.status(200).json({
    message: "Logged out successfully",
    success: true,
  });
});

module.exports = router;