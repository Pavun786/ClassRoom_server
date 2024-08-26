const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

     Username : {
         type : String,
         required : true
     },
     Dob : {
      type : Date,
      required : true
     },
     Email : {
        type : String,
        required : true,
        unique : true
     },
     Password : {
        type : String,
        required : true
     },
     Role : {
        type : String,
        required : true
     },
     Access : {
       type : Array
     },
   //   TaskSubmission : {
   //      type : Array
   //   }

   // TaskSubmission : [
   //     {
   //       taskId : {
   //          type : mongoose.ObjectId,
   //          ref : "Task"
   //       },
   //       marks : {
   //           type : Number
   //       },
   //       comments : {
   //           type : String
   //       }
   //     }
   // ]
})

module.exports = mongoose.model("User",userSchema)