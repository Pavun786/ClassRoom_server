const mongoose = require("mongoose")

const taskReviewSchema = new mongoose.Schema({
      
          taskId : {
             type : mongoose.ObjectId,
             ref : "Task"
          },
          marks : {
              type : Number
          },
          comments : {
              type : String
          },
          reviewBy : {
              
             type : mongoose.ObjectId,
             ref : "User"
          }
        
})

module.exports = mongoose.model("TaskReview",taskReviewSchema)