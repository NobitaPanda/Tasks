const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

// 1. Get all tasks
const fetchAllUserTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ ownerId: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// 2. Add new task
const addNewTask = asyncHandler(async (req, res) => {
  const { subject, info, progress, deadline } = req.body;
  if (!subject) {
    return res.status(400).json({ message: "Task heading is mandatory" });
  }

  const task = await Task.create({
    ownerId: req.user._id,
    subject,
    info,
    progress: progress || "pending",
    deadline
  });
  res.status(201).json(task);
});

// 3. Update task
const updateTaskDetails = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, ownerId: req.user._id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// 4. Delete task
const removeTaskRecord = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, ownerId: req.user._id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task removed successfully" });
});

module.exports = { 
  fetchAllUserTasks, 
  addNewTask, 
  updateTaskDetails, 
  removeTaskRecord 
};