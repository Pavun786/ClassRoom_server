const mongoose = require("mongoose")

const sylabusSchema = new mongoose.Schema({
       
        Course : {
            type : mongoose.ObjectId,
            ref : "Course"
        },
        
        Heading :{
                
            type : String,
            required : true
       },
        Content : [
                {
                    type : String,
                    required : true
                }
            ],
       Activities : {
                 type : String,
                 
            }
    
})

module.exports = mongoose.model("Sylabus",sylabusSchema)