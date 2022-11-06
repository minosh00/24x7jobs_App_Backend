const mongoose = require("mongoose");


const TrainingApplySchema = mongoose.Schema({

    ApplyProgramID:{type:String, required:true},
    FullName:{type:String , required:true},
    Email:{type:String , required:true},
    UserID :{type:String},
    status:{type:String },
 
},{
    timestamps:true,
}) 

const Applymodel = mongoose.model('TrainingApply' , TrainingApplySchema)

module.exports = Applymodel
