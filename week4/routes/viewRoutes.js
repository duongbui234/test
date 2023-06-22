const express = require("express");
const { protect, checkLoggedIn } = require("../controllers/authController");
const {
  getAllTaskView,
  editTask,
  loginUser,
  registerUser,
} = require("../controllers/viewController");

const router = express.Router();

router.get("/", (_req, res) => {
  res.redirect("/todo");
});
router.get("/todo", protect, getAllTaskView);
router.get("/todo/:id", protect, editTask);
router.get("/login", checkLoggedIn, loginUser);
router.get("/register", checkLoggedIn, registerUser);

module.exports = router;
