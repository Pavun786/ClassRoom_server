const express = require("express")
const {addSylbus,getAllSylabus,editSylabus,deleteSylabus,getSylabus} = require("../Controllers/SylabusController")

const router = express.Router()

router.post("/create",addSylbus)
router.get("/all-sylabus",getAllSylabus)
 router.put("/edit-sylabus/:id",editSylabus)
 router.get("/get-sylabus/:id",getSylabus)
 router.delete("/delete-sylabus/:id",deleteSylabus)

module.exports = router;