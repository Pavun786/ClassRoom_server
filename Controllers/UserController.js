const userModel = require("../Models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { parseISO } = require('date-fns');
const courseModel = require("../Models/CourseModel");

const userRegister = async(req,res) =>{

    try{
        const { Username,Dob,Email,Password,Role} = req.body;

       const verifyUser = await userModel.findOne({Email : Email})

      if(verifyUser){
          res.status(500).send({message : "User already exist..!"})
      }else{
       
        const NO_OF_ROUNDS = 10;
        const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
        const hashedPassword = await bcrypt.hash(Password,salt)

        const dob = new Date(Dob);
    
        const newUser =  new userModel({
            
            Username : Username,
            Email : Email,
            Password : hashedPassword,
            Dob : dob,
            Role : Role
           })

        await newUser.save();

        res.status(200).send(newUser)

      }

        
     }catch(err){
        res.status(500).send({message : err.message})
    }

    
}


const userLogin = async(req,res) =>{

    try{
        const { Email,Password} = req.body;

       
       const findUser = await userModel.findOne({Email : Email})

      if(!findUser){
          res.status(500).send({message : "UnAuthorized..!"})
      }else{
       
        const checkpassword = await bcrypt.compare(Password,findUser.Password)

        if(!checkpassword){
            res.status(500).send({message : "The Invaild User credentials"})
        }
        else{
             const token = await jwt.sign({id:findUser._id},process.env.SECRET_KEY)
             res.status(200).send({
                message : "User Logined Successfully",
                token,
                Role :findUser.Role,
                id : findUser._id
             })
        }

      }

 }catch(err){
        res.status(500).send({message : err.message})
    }

    
}




const accessRequestMake = async(req,res)=>{
   
   try{
    const {userId} = req.params;  

     console.log(userId)

    const data = req.body;
    
   const checkRequest = await userModel.findOne({_id : userId})
   
   const verifyRequest = checkRequest.Access.filter((ele)=> ele.courseId == data.courseId)

   console.log("veri",verifyRequest)

// const verifyRequest = await userModel.findOne({
//     _id: userId,
//     Access: {
//       $elemMatch: { courseId: data.courseId }
//     }
//   });
  

  if(verifyRequest.length > 0){

     console.log("exe1....")
      
    res.status(403).send({message : "Request already sent"})
   
  }else{

    console.log("exe....")
      //for get the courseName 
    const course = await courseModel.findById({_id : data.courseId},{CourseName : 1})

    const newData = {
         courseId : course._id,
         courseName : course.CourseName,
         permission : data.permission,
         
    }
  
    const findUserAndReqUpdate = await userModel.findByIdAndUpdate(
        {_id : userId},
        {$push :{ Access : newData }},
        { new: true }
    )
      
    res.status(200).send({message : "Access Request sent",findUserAndReqUpdate})

   }

}catch(err){
    res.status(500).send({message : err.message})
   }
    
}

const accessMakeByAllStudents = async(req,res)=>{

      try{
        const findStudents = await userModel.find({ $and : [
            { 
            //    Role : {$eq : 2 }
           Role : { $in: [2, 3] }
            },
            {
               Access : {$ne :[]}
            }
         ]})
   
         res.status(200).send(findStudents)
      }catch(err){
         res.status(500).send({message : err.message})
      }
}
  
const accessResponseMake = async (req, res) => {
    try {
        const { courseId, userId, permission } = req.body;
 
       const user = await userModel.findById({_id : userId});

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const accessIndex = user.Access.findIndex(access => access.courseId.toString() === courseId);

        if (accessIndex === -1) {
            return res.status(404).send({ message: "Course not found for this user" });
        }
        user.Access[accessIndex].permission = permission;

       await user.save();

       const updateUser = await userModel.findByIdAndUpdate({_id : userId},{$set :user})

        console.log(user)

        res.status(200).send({ message: "Access response updated successfully",updateUser });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


// const tasksSubmitByStudent = async(req,res)=>{

//      try{
//         const {userId,courseId,sylabusId,sourceLink,DeployedLink} = req.body;

//         const taskData = {
//             courseId: courseId,
//             sylabusId : sylabusId,
//             sourceLink: sourceLink,
//             DeployedLink : DeployedLink
//         }

//         const user = await userModel.findById({_id : userId});

//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }

//         const accessIndex = user.TaskSubmission.findIndex(sylabus => sylabus.sylabusId.toString() === sylabusId);

//         if(accessIndex === -1){
            
//             const findDeatilsAndUpdate = await userModel.findByIdAndUpdate({_id : userId},{$push : {TaskSubmission : taskData}},{new : true})

//             res.status(200).send({message : "tasklinks updated"})
//         }else{
//             res.status(403).send({message : "The Task already submitted"})
//         }

//        }catch(err){
//        res.status(500).send({message :err.message})
//      }        
// }



//  const  accessResponseMake = async(req,res)=>{
//     try{
//      const { courseId,userId,permission} = req.body;

//      const updateTheResponse = await userModel.findByIdAndUpdate(
//          {
//              _id : userId,
//              "Access.courseId" : courseId
//          },
        
//          { $set :{ Access : {permission : permission}}},
         
//          { new : true}
//          )

//      res.status(200).send({message : "Access Allowed"})

//      }catch(err){
//      res.status(500).send(err.message)
//    }

//  }

    

module.exports = {userRegister,userLogin,accessRequestMake,accessMakeByAllStudents,accessResponseMake}