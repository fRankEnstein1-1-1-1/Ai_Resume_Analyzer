const express = require("express");
const router = express.Router();

const upload = require("../uploads/middleware/upload");
const Upload = require("../models/Upload");

router.post(
  "/upload",
  upload.single("resume"),
  async (req, res) => {
    try {
      const newUpload = await Upload.create({
        userId: req.body.userId,
        fileName: req.file.filename,
        filePath: req.file.path
      });

      res.json(newUpload);
      console.log("No issues with multer")
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
