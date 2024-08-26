const CourseModel = require("../Models/CourseModel");
const sylabusModel = require("../Models/SylabusModel")

const addSylbus = async(req,res)=>{
    
    try{
        const {Heading, Content,Activities,Course} = req.body;
        const newSylabus = new sylabusModel({
            Heading,
            Content,
            Activities,
            Course
        })
        await newSylabus.save()

       await CourseModel.findByIdAndUpdate(Course,{$push:{Sylabus : newSylabus}})

        res.status(200).send({message : "The sylabus added..",newSylabus})
    }catch(err){
        res.status(500).send({message : err.message})
    }
}

const getAllSylabus = async(req,res)=>{

      try{
        const allSylabus = await sylabusModel.find({})
        res.status(200).send(allSylabus)
     } catch(err){
        res.status(500).send({message : err.message})
     }
}

const getSylabus = async(req,res)=>{
    
    try{

    const{id} = req.params;
    const sylabus = await sylabusModel.findOne({_id : id})
    res.status(200).send(sylabus)

    }catch(err){
        res.status(500).send({message : err.message})
    }
}

const editSylabus = async(req,res)=>{
     try{

     const {id} = req.params;
     const data = req.body;
     const editSylabus = await sylabusModel.findByIdAndUpdate({_id : id},{$set : data})
     res.status(200).send({message : "The sylabus edited..!",editSylabus})

     }catch(err){
        res.status(500).send({message : err.message})
     }
}

const deleteSylabus = async(req,res)=>{
  
    try{
     
    const {id} = req.params;
    const deleteSylabus = await sylabusModel.findByIdAndDelete({_id : id})
     res.status(200).send({message : "The sylabus is deleted"})

   }catch(err){
      res.status(500).send({message : err.message})
   }
}

module.exports = {addSylbus,getAllSylabus,getSylabus,editSylabus,deleteSylabus}