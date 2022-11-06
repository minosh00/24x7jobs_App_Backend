const mongoose = require("mongoose");

const TrainingSchema = mongoose.Schema({

    TrainingID:{type:String, required:true},
    TrainingTitle:{type:String , required:true},
    Description:{type:String , required:true},
    TrainingPeriod:{type:String , required:true},
    TrainingImages:{type:String , required:true},
    TrainingOrganizer:{type:String , required:true},
    certificate:{type:String, default:null },

},{
    timestamps:true,
}) 

const TrainingModel = mongoose.model('Training' , TrainingSchema)

module.exports = TrainingModel


