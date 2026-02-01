const mongoose = require("mongoose")

const jobDesc = mongoose.Schema({
     userId: mongoose.Schema.Types.ObjectId,
  description: String,
  createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model("job",jobDesc)