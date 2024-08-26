const userModel = require("../Models/UserModel")
const courseModel = require("../Models/CourseModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllMentors = async(req,res)=>{
    try{
        const AllMentors = await userModel.find({Role : 3})
        res.status(200).send(AllMentors)
    }catch(err){
        res.status(500).send({message : err.message})
    }
}

const getSingleMentor = async(req,res)=>{
   try{
    const {id} = req.params;
    const singleMentor = await userModel.find({_id : id})
    if(singleMentor){
        res.status(200).send(singleMentor)
      }else{
         res.status(404).send({message : "Mentor not found"})
      }
   }catch(err){
      res.status(200).send({message : err.message})
   }
}

const toCheckAvailabilty = async(req,res)=>{
    
    try{
        const {userId} = req.params;

    const mentors = await userModel.find({_id : {$ne : userId}, Role : {$eq : 3}})

    const courses = await courseModel.find({})

    const check = mentors
    .map(mentor => mentor.Access)
    .flat()
    .filter(access => 
      access.permission == "Allow" &&  courses.some(course => access.courseName === course.CourseName)
      
    );

    res.status(200).send(check)

    } catch(err){
        res.status(500).send({message : err.message})
    }
    

}



module.exports = {getAllMentors,getSingleMentor,toCheckAvailabilty}