const Upload = require("../models/Upload");
const Job = require("../models/Job");
const Result = require("../models/Results");

exports.analyzeResume = async (req, res) => {
  try {
    const { uploadId, jobId } = req.body;

    if (!uploadId || !jobId) {
      return res.status(400).json({ message: "uploadId and jobId are required" });
    }

    const upload = await Upload.findById(uploadId);
    const job = await Job.findById(jobId);

    if (!upload || !job) {
      return res.status(404).json({ message: "Upload or Job not found" });
    }

    // MOCK AI
    const result = {
      matchScore: Math.floor(Math.random() * 40) + 60,
      matchedSkills: ["React", "Node"],
      missingSkills: ["Docker", "AWS"],
    };

    const saved = await Result.create({
      userId: req.user.id,
      uploadId,
      jobId,
      ...result,
    });

    return res.status(200).json(saved);
  } catch (err) {
    console.log("couldnt analyze!", err);
    return res.status(500).json({ message: err.message });
  }
};
