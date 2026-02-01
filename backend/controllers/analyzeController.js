const Upload = require("../models/Upload");
const Job = require("../models/Job");
const Result = require("../models/Results");

exports.analyzeResume = async (req, res) => {
  try {
    const { uploadId, jobId } = req.body;

    const upload = await Upload.findById(uploadId);
    const job = await Job.findById(jobId);

    if (!upload || !job)
      return res.status(404).json("Data not found");

    // MOCK AI
    const result = {
      matchScore: Math.floor(Math.random() * 40) + 60,
      matchedSkills: ["React", "Node"],
      missingSkills: ["Docker", "AWS"],
    };

    res.json(result);

     const saved = await Result.create({
    userId: req.user.id,
    uploadId,
    jobId,
    ...result,
  });
   res.json(saved);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
