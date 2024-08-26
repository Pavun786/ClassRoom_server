const Message = require("../Models/MessageModel")

const newMessage = async(req,res)=>{
    try{
       
    const newMessage = req.body;
    const data = new Message(newMessage)
    const savedMessage = await data.save()
    res.status(200).send(savedMessage)

    }catch(err){
      res.status(500).send({message : err.message})
    }
}

const AllMessageByConversationId = async(req,res)=>{
   
    try{
        
        const messages = await Message.find({
            conversationId : req.params.conversationId
        })
        
        res.status(200).send(messages)
    
    }catch(err){
        
        res.status(500).send({message : err.message})
    }
}

module.exports = {newMessage,AllMessageByConversationId}