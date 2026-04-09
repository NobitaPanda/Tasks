const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    author: { // 'userId' ki jagah 'author'
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    heading: { // 'title' ki jagah 'heading'
      type: String,
      required: [true, "Note heading is required"],
      trim: true
    },
    bodyContent: { // 'content' ki jagah 'bodyContent'
      type: String,
      required: [true, "Please add some content to your note"],
      trim: true
    }
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Note", noteSchema);
module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema)