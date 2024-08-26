const express = require("express")
const router = express.Router()
const {newConverstion,getConversationByUser,getConversationByqueryId} = require("../Controllers/ConverstionController")

router.post("/",newConverstion)
router.get("/:userId" ,getConversationByUser)
router.get("/result/:queryId",getConversationByqueryId)



module.exports = router;