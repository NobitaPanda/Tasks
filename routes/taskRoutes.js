const express = require("express");
const { 
  fetchAllUserTasks, 
  addNewTask, 
  updateTaskDetails, 
  removeTaskRecord 
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Sabhi routes protected hain
router.route("/")
  .get(protect, fetchAllUserTasks)
  .post(protect, addNewTask);

router.route("/:id")
  .put(protect, updateTaskDetails)
  .delete(protect, removeTaskRecord);

module.exports = router;