const express = require("express")
const {AddNewCourse,editCourse,getAllCourses,getSingleCourse,deleteCourse} = require("../Controllers/CourseController")

const router = express.Router()

router.post("/addNewCourse",AddNewCourse)
router.put("/editCourse/:id",editCourse)
router.get("/getAllCourse",getAllCourses)
router.get("/getcourse/:id",getSingleCourse)
router.delete("/deleteCourse/:id",deleteCourse)

module.exports = router;