const router = require("express").Router();
const auth = require("../middleware/Auth");

const { analyzeResume } = require("../controllers/analyzeController");

router.post("/", auth, analyzeResume);

module.exports = router;
