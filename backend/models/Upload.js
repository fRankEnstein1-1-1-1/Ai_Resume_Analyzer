const mongoose = require('mongoose')

const uploadSchema = mongoose.Schema({
     userId: mongoose.Schema.Types.ObjectId,
  fileName: String,
  filePath: String,
  uploadedAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model("upload",uploadSchema)