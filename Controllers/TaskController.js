const { verify } = require("jsonwebtoken");
const TaskModel = require("../Models/TaskModel");
const UserModel = require("../Models/UserModel")



const tasksSubmitByStudent = async(req,res)=>{

    try{
       const {userId,courseId,sylabusId,sourceLink,deployedLink} = req.body;

      

       const user = await UserModel.findById({_id : userId});

       if (!user) {
           return res.status(404).send({ message: "User not found" });
       }

       verifyTask = await TaskModel.findOne({$and : [{userId : userId},{courseId : courseId} ,{sylabusId : sylabusId}]})

       if(verifyTask){
         
          res.status(403).send({message : "The task already submitted"})
       }else{
          
        const taskSubmission = new TaskModel({
            
            userId : userId,
            courseId: courseId,
            sylabusId : sylabusId,
            sourceLink: sourceLink,
            deployedLink : deployedLink
         
        })

         await taskSubmission.save();

          res.status(200).send({message : "Task submitted successfully"})


       }
         
     }catch(err){
      res.status(500).send({message :err.message})
    }        
}


const getTasks = async(req,res)=>{

    try{
         
      const {userId,id} = req.params;
      const getTask = await TaskModel.find({userId : userId ,courseId : id}).populate({
         path : "sylabusId",
         select : "Heading Content"
      })
      // .populate({
      //    path : "review",
      //    select : "marks"
      // })
      console.log(getTask)

      res.status(200).send(getTask) 
    }catch(err){
       res.status(500).send({message : err.message})
    }
}

const getAllTasks = async(req,res)=>{

    try{
      const {id} = req.params;   
      
      const getTasks = await TaskModel.find({courseId : id}).populate({
         path : "sylabusId",
         select : "Heading Content"
      })
      console.log(getTasks)

      res.status(200).send(getTasks) 
    }catch(err){
       res.status(500).send({message : err.message})
    }
}

const getTaskByTaskId = async(req,res)=>{

    try{
      const {taskId} = req.params;

      const tasks = await TaskModel.findById(taskId).populate({
         path : "userId courseId sylabusId",
         select : "Username CourseName Heading Content Activities sourceLink deployedLink "
      })
  
      if(!tasks){
        res.status(404).send({message: "There is no task exists"})
      }else{
        res.status(200).send(tasks)
      }
    }catch(err){
       res.status(500).send({message : err.message})
    }
}



module.exports = {tasksSubmitByStudent,getTasks,getAllTasks,getTaskByTaskId};
