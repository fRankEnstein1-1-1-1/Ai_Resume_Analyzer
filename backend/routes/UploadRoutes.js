const router = require("express").Router();
const upload = require("../middleware/upload");
const {uploadResume} = require("../controllers/uploadController")

router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;
