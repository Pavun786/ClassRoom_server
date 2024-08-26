const express = require("express")
const {createQuery,getQueriesById,getLatestQuery,getSingleQuery,getAllQueries,queryTakenByMentor} = require("../Controllers/QueryController")

const router = express.Router()

router.post("/create-query",createQuery)
router.get("/all-queries/:userId",getQueriesById)
router.get("/latest-query/:userId",getLatestQuery)
router.get("/single/:queryId",getSingleQuery)
router.get("/allQueries/:id",getAllQueries)
router.put("/assigned/:queryId",queryTakenByMentor)

module.exports = router;