const courseModel = require("../Models/CourseModel")
const sylabusModel = require("../Models/SylabusModel")
const cloudinary = require("../Utils/Cloudinary")

const AddNewCourse = async(req,res)=>{
   try{
       
    const { CourseName,Duration,Poster,Amount,Sylabus} = req.body;
    
    const findCourse = await courseModel.findOne({CourseName : CourseName})

    if(findCourse){
        res.status(500).send({message : "The Course is already exits"})
    }else{
     
        const courseImageUpload = await cloudinary.uploader.upload(Poster)

        const newCourse = new courseModel({
            CourseName : CourseName,
            Duration : Duration,
            Poster : {
               public_id : courseImageUpload.public_id,
               url : courseImageUpload.secure_url 
            },
            Amount : Amount,
            Sylabus : Sylabus
        })

        await newCourse.save()

        res.status(200).send({message : "The Course created successfully"})
    }

   }catch(err){
      res.status(500).send({message : err.message})
   }
}

const editCourse = async(req,res)=>{
      
    try{
      const {id} = req.params;
      const data = req.body;

      if(data.Poster){
         const courseImageUpload = await cloudinary.uploader.upload(data.Poster)
         data.Poster ={
            public_id : courseImageUpload.public_id,
            url : courseImageUpload.secure_url 
         }
      }

      const editCourse = await courseModel.findByIdAndUpdate({_id : id},{$set : data})
      res.status(200).send({message : "Course edited successfully"})
    
    }catch(err){
        res.status(500).send({messsage : err.message})
    }
}

const getAllCourses = async(req,res)=>{

    try{
        const allCourses = await courseModel.find()
        res.status(200).send(allCourses)
    }catch(err){
        res.status(500).send({message : err.message})
    }
}

const getSingleCourse = async(req,res)=>{
    try{
        const{id} = req.params;
        const singleCourse = await courseModel.findOne({_id :id}).populate({
            path : "Sylabus",
            select : "_id Heading Content Activities "
        })

        

        // const getSylabusforCourse = await sylabusModel.findOne({Course : id})
        
        // const result ={
        //     singleCourse,
        //     getSylabusforCourse
        // }

        if(singleCourse){
           res.status(200).send(singleCourse)
         }else{
            res.status(404).send({message : "course not found"})
         }
    }catch(err){
        res.status(500).send({message : err.message})
    }
}

const deleteCourse = async(req,res)=>{
     try{
        const {id} = req.params;
         const deleteCourse = await courseModel.findByIdAndDelete({_id : id})
         res.status(200).send({message : "The course deleted successfully"})
     }catch(err){
         res.status(500).send({message : err.message})
     }
}

module.exports = {AddNewCourse,editCourse,getAllCourses,getSingleCourse,deleteCourse}