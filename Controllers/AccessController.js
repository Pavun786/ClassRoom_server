// const { ObjectId } = require("mongodb");
// const accessModel = require("../Models/AccessModel");
// const courseModel = require("../Models/CourseModel");
// const userModel = require("../Models/UserModel");


// const requestSend = async(req,res)=>{

//     const { courseId,userId,permission} = req.body;

//      console.log(courseId,userId,permission)

//      const requestMake = new accessModel({
//          courseId : courseId,
//          userId : userId,
//          permission
//      })

//      await requestMake.save() 

//      res.status(200).send({message : "Access Request sent",requestMake})

// }

// const responseSend = async(req,res)=>{
//    try{
//     const { courseId,userId,permission} = req.body;

//     const updateTheResponse = await accessModel.updateOne({ $and : [
//         {
//             courseId :{ $eq : courseId}
//         },
//         {
//             userId : { $eq : userId}
//         }
//     ]}, { $set :{permission : permission}})

//     res.status(200).send(updateTheResponse)
   
//   }catch(err){
//     res.status(500).send(err.message)
//   }

// }



// const allrequests = async (req, res) => {
//     try {
//         const allDetail = await accessModel.find({});

//         const requestsData = [];

//         for (const detail of allDetail) {
//             const findCourse = await courseModel.findById(detail.courseId, { CourseName: 1 });
//             const findUser = await userModel.findById(detail.userId, { Username: 1, Role: 1 });

//             requestsData.push({
//                 findCourse,
//                 findUser,
//                 permission: detail.permission
//             });
//         }

//         res.status(200).send(requestsData);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// };


// module.exports = {requestSend,responseSend,allrequests};