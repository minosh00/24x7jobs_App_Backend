const express = require("express");
const router = express.Router();


const {RemoveTrainingProgram, GetTrainingByID,CreateTrainingProgram,UpdateTrainingById,AllTraining} = require("../Controllers/Training.controller");


router.post("/CreateTrainingProgram",CreateTrainingProgram);
router.get("/GetTrainingByID/:id",GetTrainingByID);
router.patch("/UpdateTrainingById/:id",UpdateTrainingById);
router.get("/AllTraining",AllTraining);
router.delete("/RemoveTrainingProgram/:id",RemoveTrainingProgram);



module.exports = router;