const userModel = require("../Models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getAllStudents = async(req,res)=>{
    try{
        const AllStudents = await userModel.find({Role : "2"});
        res.status(200).send(AllStudents)
    }catch(err){
        res.status(500).send({message : err.message})
    }
}

const getSingleStudent = async(req,res)=>{
   try{
    const {id} = req.params;
    const singleStudent = await userModel.find({_id : id})
    if(singleStudent){
        res.status(200).send(singleStudent)
      }else{
         res.status(404).send({message : "Student not found"})
      }
   }catch(err){
      res.status(200).send({message : err.message})
   }
}

const editStudent = async(req,res)=>{
      
    try{
      const {id} = req.params;
      const data = req.body;

      const editCourse = await userModel.findByIdAndUpdate({_id : id},{$set : data})
      res.status(200).send({message : "student edited successfully"})
    
    }catch(err){
        res.status(500).send({messsage : err.message})
    }
}

module.exports = {getAllStudents,getSingleStudent,editStudent}