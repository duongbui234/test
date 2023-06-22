const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  getSingleTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/protect");

const router = express.Router();

router.use(protect);
router.get("/", getAllTask);
router.post("/", createTask);
router.get("/:id", getSingleTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
