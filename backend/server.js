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
app.listen(5000,()=>{
    console.log("server running sucesssfully")
})