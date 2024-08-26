const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const DbConnection = async()=>{
     try{
      let mongo_url = process.env.MONGO_URL
     
      await mongoose.connect(mongo_url)
      console.log("The Db connected")
     }catch(err){
       console.log(err.message)
     }
}

module.exports = DbConnection;