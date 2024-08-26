const express = require("express")
const {userRegister,userLogin,accessRequestMake,accessMakeByAllStudents,accessResponseMake} = require("../Controllers/UserController")

const router = express.Router()

router.post("/register",userRegister)
router.post("/login",userLogin)
router.put("/askAccess/:userId",accessRequestMake)
router.get("/byAllStudents",accessMakeByAllStudents)
router.put("/setAccess",accessResponseMake)

// router.put("/task-submission",tasksSubmitByStudent)

module.exports = router;