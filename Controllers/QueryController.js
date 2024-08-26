const queryModel = require("../Models/QueriesModel")

const createQuery = async(req,res)=>{
   
  try{
    const {queryTitle,queryDescription,category,courseName,language,status,createdBy,assignedTo} = req.body;

    console.log(courseName)
    
    const queryData = new queryModel({
        queryTitle,
        queryDescription,
        category,
        courseName,
        language,
        status,
        createdBy,
        assignedTo : null
    })
    await queryData.save()

    res.status(200).send(queryData)
   }catch(err){
     res.status(500).send({message : err.message})
   }
}

const getQueriesById = async(req,res)=>{
   console.log("exe1")
    try{
        const {userId} = req.params;
        console.log("userId")
        const data = await queryModel.find({createdBy : userId})
        if(!data){
          res.status(404).send({message : "There is no queries"})
        }else{
          res.status(200).send(data)
        }
    }catch(err){
        res.status(500).send({message : err.message})
    }
}

const getAllQueries = async(req,res)=>{
   try{
    console.log("exe2")
     const {id} = req.params;
      
     const data = await queryModel.find({courseName : id}).populate({
        path : "courseName",
        select : "CourseName"
      })
      console.log(data)
      if(data.length == 0){
        res.status(404).send({message : "There is no queries"})
      }else{
        res.status(200).send(data)
      }
  }catch(err){
      res.status(500).send({message : err.message})
  }
}

const getLatestQuery = async(req,res)=>{
  console.log("exe3")
    try{
      const {userId} = req.params;
        const data = await queryModel.findOne({createdBy : userId}).sort({ createdAt: -1 }).limit(1).populate({
          path : "assignedTo",
          select : "Username"
        })
        console.log(data)
        if(!data){
          res.status(404).send({message : "There is no queries"})
        }else{
          res.status(200).send(data)
        }
    }catch(err){
        res.status(500).send({message : err.message})
    }
} 

const getSingleQuery = async(req,res)=>{
  console.log("exe4")
    try{
        const {queryId} = req.params;
        const data = await queryModel.findById(queryId).populate({
          path : "assignedTo",
          select : "Username"
        })
        
        res.status(200).send(data)
    }catch(err){
        res.status(500).send({message : err.message})
    }
}

const queryTakenByMentor = async(req,res)=>{

   try{
    const {queryId} = req.params;
    const {status,assignedTo} = req.body;

    const findQuery = await queryModel.findById(queryId)

    if(!findQuery){
      res.status(404).send({message : "The Query is not found"})
    }else{
       const data = {
          status,
          assignedTo
       }
       const result = await queryModel.findByIdAndUpdate(queryId,data,{new : true})
       res.status(200).send(result)
    }
   }catch(err){
      res.status(500).send({message : err.message})
   }
}

module.exports = {createQuery,getQueriesById,getLatestQuery,getSingleQuery,getAllQueries,queryTakenByMentor};