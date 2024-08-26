const mongoose = require("mongoose")

const queriesSchema = new mongoose.Schema({
    queryTitle : {
        type : String,
        required : true
    },
    queryDescription : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required: true
    },
    courseName : {
        type : mongoose.ObjectId,
        ref : "Course"
    },
    language : {
        type : String,
        required : true
    },
    status : {
       type : String,
       required : true
    },
    createdBy:{
        type : mongoose.ObjectId,
        ref : "User"
    },
    assignedTo : {
        type : mongoose.ObjectId,
        ref : "User",
        required : false 
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }
}

)

module.exports = mongoose.model("Query",queriesSchema)