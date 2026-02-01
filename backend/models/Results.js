const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  uploadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Upload",
  },

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },

  matchScore: Number,
  matchedSkills: [String],
  missingSkills: [String],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Result", resultSchema);
