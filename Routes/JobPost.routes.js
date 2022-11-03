const express = require("express");
const router = express.Router();


const {AllJobVacancy, CreateJobVacancy,GetJobVacancyByID,UpdateJobVacancyById,RemoveJob} = require("../Controllers/PostJob.controller");


router.post("/CreateJobVacancy",CreateJobVacancy);
router.get("/GetJobVacancyByID/:id",GetJobVacancyByID);
router.patch("/UpdateJobVacancyById/:id",UpdateJobVacancyById);
router.get("/AllJobVacancy",AllJobVacancy);
router.delete("/RemoveJob/:id",RemoveJob);



module.exports = router;