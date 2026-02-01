const Upload = require("../models/Upload");

exports.uploadResume = async (req, res) => {
  try {
    const newUpload = await Upload.create({
      userId: req.user?.id || req.body.userId,
      fileName: req.file.filename,
      filePath: req.file.path,
    });

    res.json(newUpload);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
