const express = require("express");
const router = express.Router();


const {RemoveTranningApplied, GetTranningApplyByID,CreateTranningApply,UpdateTranningAppliedById,AllTranningApplied} = require("../Controllers/TrainningProgramApply.controller");


router.post("/CreateTranningApply",CreateTranningApply);
router.get("/GetTranningApplyByID/:id",GetTranningApplyByID);
router.patch("/UpdateTranningAppliedById/:id",UpdateTranningAppliedById);
router.get("/AllTranningApplied",AllTranningApplied);
router.delete("/RemoveTranningApplied/:id",RemoveTranningApplied);



module.exports = router;