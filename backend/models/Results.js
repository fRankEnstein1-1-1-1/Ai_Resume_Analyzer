const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  uploadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "upload",
  },

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
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
