const router = require("express").Router()
const Result = require("../models/Results")
const auth = require("../middleware/Auth")
router.get("/", auth, async (req, res) => {
  const results = await Result.find({ userId: req.user.id })
    .populate("uploadId jobId")
    .sort({ createdAt: -1 });

  res.json(results);
});




module.exports = router