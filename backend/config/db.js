const mongoose = require('mongoose')

const ConnectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to mongo")
    }
    catch(error){
        console.log("mongo not connected")
        console.log(err)
    process.exit(1)
   }
}
module.exports = ConnectDB;