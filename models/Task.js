const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  info: { type: String },
  progress: { type: String, default: "pending" },
  deadline: { type: Date }
}, { timestamps: true });
module.exports = mongoose.model("Task", taskSchema);