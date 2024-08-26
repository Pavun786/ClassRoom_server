const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    userId : {
        type : mongoose.ObjectId,
        ref : "User"
    },
    courseId : {
        type : mongoose.ObjectId,
        ref : "Course"
    },
    sylabusId : {
        type : mongoose.ObjectId,
        ref : "Sylabus"
    },
    sourceLink : {
         type : String,
         required : true
    },
    deployedLink : {
        type : String,
        required : true
    },
    // review :{
    //     type : mongoose.ObjectId,
    //     ref : "TaskReview"
    // }

})

module.exports = mongoose.model("Task",taskSchema)