const express = require("express")
const{mentorRegister,mentorLogin,getAllMentors,getSingleMentor,toCheckAvailabilty} = require("../Controllers/MentorController")

const router = express.Router()

router.get("/getAllMentors" ,getAllMentors)
router.get("/getMentor",getSingleMentor)
router.get("/askAccessByMentor/:userId",toCheckAvailabilty)

module.exports = router;