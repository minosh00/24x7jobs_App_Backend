const mongoose = require('mongoose');


const PublishSchema = mongoose.Schema({
 
 
    JobPosition:{type:String , required:true},

    JobDescription:{type:String , required:true},

    JobCompanyName:{type:String, required:true},

    JobType:{type:String, required:true},

    SalaryDetails:{type:String, required:true},

    JobPeriod:{type:String, required:true},

    OtherDetails:{type:String, required:true},

    imageLink:{type:String},


     date: {type: Date, default: Date.now}

 
})

module.exports = mongoose.model('JobPublish' , PublishSchema);