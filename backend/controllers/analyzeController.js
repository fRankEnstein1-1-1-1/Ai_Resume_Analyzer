const Upload = require("../models/Upload");
const Job = require("../models/Job");
const Result = require("../models/Results");

const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");

const skillsList = require("../utils/skillsList");

function extractSkills(text) {
  const lowerText = text.toLowerCase();

  return skillsList.filter(skill =>
    lowerText.includes(skill.toLowerCase())
  );
}



exports.analyzeResume = async (req, res) => {
  try {

    const { uploadId, jobId } = req.body;

    // -------------------------------
    // Validate request
    // -------------------------------
    if (!uploadId || !jobId) {
      return res.status(400).json({
        message: "uploadId and jobId are required"
      });
    }

    // -------------------------------
    // Fetch Upload + Job from DB
    // -------------------------------
    const upload = await Upload.findById(uploadId);
    const job = await Job.findById(jobId);

    if (!upload || !job) {
      return res.status(404).json({
        message: "Upload or Job not found"
      });
    }

    // -------------------------------
    // PDF -> TEXT EXTRACTION
    // -------------------------------

    // Non-blocking file read (better practice)
    const pdfBuffer = await fs.promises.readFile(upload.filePath);

    const pdfData = await pdfParse(pdfBuffer);

    // Safe handling
    let resumeText = (pdfData.text || "")
      .replace(/\s+/g, " ")
      .trim();

    // -------------------------------
    // JOB DESCRIPTION
    // -------------------------------

    const jobDescriptionText = job.description || "";

    //skill extraction to find matched and mismatched
    const resumeSkills = extractSkills(resumeText);
const jobSkills = extractSkills(jobDescriptionText);

const matchedSkills = jobSkills.filter(skill =>
  resumeSkills.includes(skill)
);

const missingSkills = jobSkills.filter(skill =>
  !resumeSkills.includes(skill)
);


    // -------------------------------
    // DEBUG LOGS
    // -------------------------------

    console.log("\n========== RESUME TEXT ==========\n");
    console.log(resumeText.substring(0, 500)); // preview only

    console.log("\n========== JOB DESCRIPTION ==========\n");
    console.log(jobDescriptionText);

    console.log("\n=====================================\n");

    // -------------------------------
    // SEND TO ML SERVICE
    // -------------------------------

    const combinedText = resumeText + " " + jobDescriptionText;

    const aiResponse = await axios.post(
      "http://localhost:8000/analyze",
      {
        text: combinedText
      },
      {
        timeout: 10000 // prevent hanging request
      }
    );

    const matchScore = aiResponse.data.matchScore;

    console.log("AI RESULT:", matchScore);

    // -------------------------------
    // SAVE RESULT TO DB (optional now)
    // -------------------------------

    const saved = await Result.create({
      userId: req.user.id,
      uploadId,
      jobId,
      matchScore,
      matchedSkills,
      missingSkills
    });

    // -------------------------------
    // RETURN RESPONSE
    // -------------------------------

    return res.status(200).json({
      //message: "Analysis complete",
      matchScore,
      matchedSkills,
      missingSkills,
      //resumePreview: resumeText.substring(0, 500),
      //jobDescription: jobDescriptionText
    });

  } catch (err) {

    console.log("couldnt analyze!", err);

    return res.status(500).json({
      message: err.message
    });

  }
};
