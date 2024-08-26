const express = require("express")
const {tasksSubmitByStudent,getTasks,getAllTasks,getTaskByTaskId} = require("../Controllers/TaskController")

const router = express.Router()

router.post("/submitTask",tasksSubmitByStudent)
router.get("/allTask/:userId/:id",getTasks)
router.get("/getAllTasks/:id",getAllTasks)
router.get("/:taskId",getTaskByTaskId)


module.exports = router;