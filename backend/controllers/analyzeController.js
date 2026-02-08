const Upload = require("../models/Upload");
const Job = require("../models/Job");
const Result = require("../models/Results");

const fs = require("fs");
const pdfParse = require("pdf-parse")
console.log("pdf parse Value",pdfParse)
console.log("type of pdf parse is",typeof(pdfParse))




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

    // --------------------------------
    // PDF -> TEXT EXTRACTION
    // --------------------------------

    const pdfBuffer = fs.readFileSync(upload.filePath);

    const pdfData = await pdfParse(pdfBuffer);

    let resumeText = pdfData.text;

    // CLEAN TEXT (important)
    resumeText = resumeText.replace(/\s+/g, " ").trim();

    // --------------------------------
    // JOB DESCRIPTION TEXT
    // --------------------------------

    const jobDescriptionText = job.description;

    // --------------------------------
    // PRINT RESULTS (DEBUG)
    // --------------------------------

    console.log("\n================ RESUME TEXT ==================\n");
    console.log(resumeText);

    console.log("\n================ JOB DESCRIPTION ==================\n");
    console.log(jobDescriptionText);

    console.log("\n===================================================\n");

    // RETURN TEMP RESPONSE
    return res.status(200).json({
      message: "PDF extracted successfully",
      resumePreview: resumeText.substring(0, 500), // preview only
      jobDescription: jobDescriptionText
    });

  } catch (err) {

    console.log("couldnt analyze!", err);

    return res.status(500).json({ message: err.message });

  }
};
