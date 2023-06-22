const express = require("express");
const {
  login,
  register,
  logout,
  refreshToken,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refreshToken);

router.get("/logout", logout);

module.exports = router;
