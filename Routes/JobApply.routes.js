
const express = require("express");
const router = express.Router();
const {  ApplyJob, UpdateApplyJob,deleteApplication,GetoneJobsApplication,GetAllApplication,GetOneApplication,GetidApplication} = require("../Controllers/JobApply.controller");


router.post("/ApplyJob",ApplyJob);
router.get("/GetoneJobsApplication/:id",GetoneJobsApplication);
router.patch("/UpdateApplyJob/:id",UpdateApplyJob);
router.get("/GetAllApplication",GetAllApplication);
router.delete("/deleteApplication/:id",deleteApplication);
router.get("/GetOneApplication/:id",GetOneApplication);



module.exports = router;