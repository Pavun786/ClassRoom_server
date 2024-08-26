const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    CourseName : {
        type : String,
        required : true
    },
    Duration : {
        type : String,
        required : true
    },
    Amount : {
        type : Number,
        required : true
    },
    Poster : {
        public_id : {
             type : String,
             required : true
        },
        url : {
            type : String,
            required : true
        }
    },
    Sylabus : [
      
        {
             type : mongoose.ObjectId,
             ref : "Sylabus"
       } 
    ]
})

module.exports = mongoose.model("Course",courseSchema)