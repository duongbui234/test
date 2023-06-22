const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask);
router.post("/:id", updateTask);
router.get("/:id", deleteTask);

module.exports = router;
