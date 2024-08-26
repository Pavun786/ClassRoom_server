const express = require("express")
const router = express.Router()

const {AllMessageByConversationId,newMessage} = require("../Controllers/MessageController")

router.post("/",newMessage)
router.get("/:conversationId" ,AllMessageByConversationId)

module.exports = router;