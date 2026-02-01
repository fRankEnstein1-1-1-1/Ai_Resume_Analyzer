const router  =  require("express").Router()
const auth = require("../middleware/Auth")
const {createJob} = require("../controllers/jobController")
router.post("/",auth, createJob)
module.exports = router