const taskReviewModel = require("../Models/TaskReviewModel")
const mongoose = require('mongoose');


const taskReview = async(req,res)=>{

    try{
        const data = req.body;
        const {taskId} = data;

        const verifyTaskId = await taskReviewModel.findById(taskId)

        if(!verifyTaskId){
           
            const review_task = new taskReviewModel(data)
    
            await review_task.save()
           
             res.status(200).send(review_task)
        }else{

           let updatedReview = await taskReviewModel.findOneAndUpdate(taskId,data);
            res.status(200).send(updatedReview);
        }

       

    }catch(err){
        res.status(500).send({message : err.message})
    }

}

const taskFeedback = async(req,res)=>{

   try{
      
    const {taskId} = req.params;

    const findFeedBack = await taskReviewModel.findOne({taskId})
    if(!findFeedBack){
        res.status(404).send({message : "The task is not exist "})
    }else{
        console.log("feed",findFeedBack)
        res.status(200).send(findFeedBack)
    }

   }catch(err){
      res.status(500).send({message : err.message})
   }
    
}

const LeaderBoardUser = async(req,res)=>{
   
    try{
       
        const {courseId} = req.params;
        const courseIdObj = new mongoose.Types.ObjectId(courseId)

        console.log(typeof(courseIdObj))

        const result = await taskReviewModel.aggregate([
            
            {
                $lookup: {
                    from: "tasks",
                    localField: 'taskId',
                    foreignField: '_id',
                    as: 'task'
                }
            },

            { $unwind: '$task' },

            {
                $lookup: {
                    from: 'users',
                    localField: 'task.userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'task.courseId',
                    foreignField: '_id',
                    as: 'course'
                }
            },
            { $unwind: '$course' },
            {
                $match: {
                    'task.courseId': courseIdObj, // Replace YOUR_COURSE_ID with the actual courseId
                
                }
            },
            {
                $group: {
                    _id: {userId :"$task.userId",userName:"$user.Username",courseName : "$course.CourseName"},
                    totalMarks: { $sum: '$marks' },
                    // userDetails: { $first: '$user' } // Optionally, include user details
                }
            },
            {
                $sort: { totalMarks: -1 }
            },
            // {
            //     $project : {
            //         "user.Username" : 1
            //     }
            // }
            // // Unwind the task array
            // { $unwind: '$Task' },
            // // Group by userId and sum the marks
            // {
            //     $group: {
            //         _id: '$Task.userId',
            //         totalMarks: { $sum: '$marks' }
            //     }
            // },
            // // Sort by totalMarks in descending order
            // { $sort: { totalMarks: -1 } }
        ]);
     
        res.status(200).send(result)

    }catch(err){
        res.status(500).send({message: err.message})
    }

}

// const LeaderBoardUser = async(req,res)=>{
   
//     try{
       
//         const {courseId} = req.params;

//         const result = await taskReviewModel.find().populate({
//             path : "taskId",
//             populate:{
//                 path : "userId courseId"
//             }
//         })
//         .aggregate([
//             {
//                 $match : { "taskId.courseId._id" : courseId}
//             },
//             {
//                 $group : {
//                     _id : "$taskId.userId._id",
//                      marks : { $sum : "$marks"}
//                 }
//             },
//             {
//                 $sort : { marks : 1}
//             }
//         ])
       
//         res.status(200).send(result)
        
//     }catch(err){
//         res.status(500).send({message: err.message})
//     }

// }

// const LeaderBoardUser = async (req, res) => {

//     const {courseId} = req.params;
  
//  const result = taskReviewModel.aggregate([
//         // Match by courseId
//         {
//           $lookup: {
//             from: 'tasks',
//             localField: 'taskId',
//             foreignField: '_id',
//             as: 'task'
//           }
//         },
//         { $unwind: '$task' },
//         { $match: { 'task.taskId.courseId': courseId } }, // Replace YOUR_COURSE_ID with the actual courseId
      
//         // Group by userId and sum the marks
//         { 
//           $group: { 
//             _id: '$task.taskId.userId._id', // Group by userId
//             totalMarks: { $sum: '$marks' } // Sum the marks
//           } 
//         },
      
//         // Sort by totalMarks in descending order
//         { $sort: { totalMarks: -1 } }
//       ])
//       .exec((err, result) => {
//         if (err) {
//           console.error(err);
//           // Handle error
//         } else {
//           console.log(result);
//           // Handle result
//         }})
       
// };


module.exports = {taskReview,taskFeedback,LeaderBoardUser};
