const mongoose = require('mongoose');
const JobPost = require("../Model/PostJobs");




const AllJobVacancy = async (req, res) => { 
    try {
        const jobs = await JobPost.find();
                 
        res.status(200).json(jobs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



const UpdateJobVacancyById = async (req, res) => {

    const { id } = req.params;
    const { JobID, jobTitle, jobDescription, jobPeriod, JobImages, CompanyName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No  with id: ${id}`);

    const updateJobPost = { JobID, jobTitle, jobPeriod, jobDescription, JobImages, CompanyName, _id: id };

    await JobPost.findByIdAndUpdate(id, updateJobPost, { new: true });

    res.json(updateJobPost);
}





const CreateJobVacancy= async (req, res) => {

    const groups = req.body;

    const newGroups = new JobPost({ ...groups, creator: req.userId })

    try {
        await newGroups.save();

        res.status(201).json(newGroups );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


const GetJobVacancyByID = async (req, res) => {
    const { id } = req.params;
    try {
        const groups = await JobPost.findById(id);
        res.status(200).json(groups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const RemoveJob = async (req, res) => {
    try {
        await JobPost.findByIdAndDelete(req.params.id)
        res.json({ msg: "Delete JobPost" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}









module.exports ={AllJobVacancy, CreateJobVacancy,GetJobVacancyByID,UpdateJobVacancyById,RemoveJob};








