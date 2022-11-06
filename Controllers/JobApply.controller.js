const mongoose = require('mongoose');
const JobApply = require("../Model/JobApply");


const GetidApplication = async (req, res) => {
    let id = req.params;
    console.log("applicationID", id.id);
    try {
        const Supervisors = await JobApply.find({ "applicationID": id.id });

        res.status(200).json(Supervisors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const GetOneApplication = async (req, res) => {
    let id = req.params.id;
    try {
        const Order = await JobApply.find({ "creator": id });
        res.status(200).json(Order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const GetAllApplication = async (req, res) => {
    const { userId } = req.query;
    try {
        const Supervisors = await JobApply.find(userId? { creator: userId }: {});

        res.status(200).json(Supervisors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}





const GetoneJobsApplication = async (req, res) => {
    const { id } = req.params;

    try {
        const request = await JobApply.findById(id);

        res.status(200).json(request);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



const deleteApplication = async (req, res) => {
    try {
        await JobApply.findByIdAndDelete(req.params.id)
        res.json({ msg: "Delete " })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}



const UpdateApplyJob = async (req, res) => {

    const { id } = req.params;
    const { ApplyID, FullName, Email, cv, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No  with id: ${id}`);

    const updatedSupervisor = { ApplyID, FullName, Email, cv, status, _id: id };

    await JobApply.findByIdAndUpdate(id, updatedSupervisor, { new: true });

    res.json(updatedSupervisor);
}



const ApplyJob = async (req, res) => {

    const jobpost = req.body;


    console.log("creator ", jobpost.userId);
    console.log("creator ", jobpost.JobID);

    const newApplication = new JobApply({ ...jobpost, creator: jobpost.userId == undefined ? "no creator" : jobpost.userId })
    console.log("applied job ", newApplication);
    try {
        await newApplication.save();

        res.status(201).json(newApplication);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = { ApplyJob, UpdateApplyJob, deleteApplication, GetoneJobsApplication, GetAllApplication, GetOneApplication, GetidApplication };







