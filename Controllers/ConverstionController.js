const Conversation = require("../Models/ConversationModel")


const newConverstion = async(req,res)=>{
   try{
     
    const newdata = new Conversation({
        members : [ req.body.senderId ,req.body.receiverId],
        queryId : req.body.queryId
     })
  
     const savedConverstion = await newdata.save()
     res.status(200).send(savedConverstion)
     console.log("conversation create")
   }catch(err){
     res.status(500).send({message: err.message})
   }
}

const getConversationByUser = async(req,res)=>{
   try{

    const conversation = await Conversation.find({
        members : {$in : [req.params.userId]}
    })
    res.status(200).send(conversation)

   }catch(err){
     res.status(500).send({message : err.message})
   }
}

const getConversationByqueryId = async(req,res)=>{
   try{
    const {queryId} = req.params;
    const conversation = await Conversation.find({queryId})
    res.status(200).send(conversation)
   }catch(err){
    res.status(500).send({message : err.message})
  }
}

module.exports = {newConverstion,getConversationByUser,getConversationByqueryId}