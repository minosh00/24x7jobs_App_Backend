const mongoose = require("mongoose");


const ApplySchema = mongoose.Schema({

    ApplyID:{type:String, required:true},
    FullName:{type:String , required:true},
    Email:{type:String , required:true},
    creator :{type:String},
    cv:{type:String },
    status:{type:String },
 
},{
    timestamps:true,
}) 

const Applymodel = mongoose.model('jOBApply' , ApplySchema)

module.exports = Applymodel
