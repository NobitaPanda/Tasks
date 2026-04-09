const Note = require("../models/Note");
const asyncHandler = require("../utils/asyncHandler");

const fetchUserMemos = asyncHandler(async (req, res) => {
  const { query: keyword = "" } = req.query;
  const filter = { author: req.user.id }; // userId ➡️ author

  if (keyword.trim()) {
    filter.$or = [
      { heading: { $regex: keyword.trim(), $options: "i" } }, // title ➡️ heading
      { bodyContent: { $regex: keyword.trim(), $options: "i" } } // content ➡️ bodyContent
    ];
  }

  const allMemos = await Note.find(filter).sort({ createdAt: -1 });
  res.json(allMemos);
});

const saveNewEntry = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Heading and description are mandatory" });
  }

  const newMemo = await Note.create({
    author: req.user.id, // userId ➡️ author
    heading: title,      // title ➡️ heading
    bodyContent: content // content ➡️ bodyContent
  });

  res.status(201).json(newMemo);
});

const modifyMemo = asyncHandler(async (req, res) => {
  const { id: memoId } = req.params;
  const existingMemo = await Note.findOne({ _id: memoId, author: req.user.id });

  if (!existingMemo) {
    return res.status(404).json({ message: "Requested note not found" });
  }

  const { title, content } = req.body;

  if (title !== undefined) existingMemo.heading = title;
  if (content !== undefined) existingMemo.bodyContent = content;

  const updatedRecord = await existingMemo.save();
  res.json(updatedRecord);
});

const discardMemo = asyncHandler(async (req, res) => {
  const { id: memoId } = req.params;
  const deletedItem = await Note.findOneAndDelete({ _id: memoId, author: req.user.id });

  if (!deletedItem) {
    return res.status(404).json({ message: "No such note exists" });
  }

  res.json({ message: "Record removed successfully" });
});

module.exports = { fetchUserMemos, saveNewEntry, modifyMemo, discardMemo };