const express = require("express")
const {taskReview,taskFeedback,LeaderBoardUser} = require("../Controllers/TaskReviewController")

const router = express.Router()


router.post("/review-task",taskReview)
router.get("/feedback/:taskId",taskFeedback)
router.get("/leader-board/:courseId",LeaderBoardUser)
module.exports = router;