const router = require("express").Router();
const auth = require("../middleware/Auth");

const { analyzeResume } = require("../controllers/analyzeController");

router.post("/", auth, analyzeResume);
console.log("Analyze route has been loaded")

module.exports = router;
