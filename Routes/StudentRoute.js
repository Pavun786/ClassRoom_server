const express = require("express")
const {studentRegister,studentLogin,getAllStudents,getSingleStudent,editStudent} = require("../Controllers/StudentController")
const router = express.Router()


router.get("/getAllStudents",getAllStudents)
router.get("/getStudent/:id",getSingleStudent)
router.put("/editStudent/:id",editStudent)

module.exports = router;