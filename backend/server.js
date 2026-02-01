require("dotenv").config()
const express = require("express")
const uploads = require("./routes/UploadRoutes")
const cors = require("cors")

const ConnectDB = require("./config/db")
const app = express()
ConnectDB()

app.use(cors())
app.use(express.json())
app.use("/api/uploadresume",uploads)
app.use("/api/auth", require("./routes/AuthRoutes"));

app.use("/api/job", require("./routes/JobRoutes"));
app.use("/api/analyze", require("./routes/AnalyzeRoute"));

app.use("/api/previousresults",require("./routes/ResultRoutes"))
app.listen(5000,()=>{
    console.log("server running sucesssfully")
})