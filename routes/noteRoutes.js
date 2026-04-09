const express = require("express");
const {
  fetchUserMemos,
  saveNewEntry,
  modifyMemo,
  discardMemo
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Endpoints for fetching and creating memos
router.route("/")
  .get(protect, fetchUserMemos)
  .post(protect, saveNewEntry);

// Endpoints for updating and deleting specific records
router.route("/:id")
  .put(protect, modifyMemo)
  .delete(protect, discardMemo);

module.exports = router;