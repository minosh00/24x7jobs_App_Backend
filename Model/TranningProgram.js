const mongoose = require("mongoose");

const jobVacancySchema = mongoose.Schema({

    JobID:{type:String, required:true},
    jobTitle:{type:String , required:true},
    jobDescription:{type:String , required:true},
    jobPeriod:{type:String , required:true},
    JobImages:{type:String , required:true},
    CompanyName:{type:String , required:true},

},{
    timestamps:true,
}) 

const jobVacancymodel = mongoose.model('jobVacancy' , jobVacancySchema)

module.exports = jobVacancymodel


