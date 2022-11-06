const mongoose = require('mongoose');
const TrainingProgram = require("../Model/TranningApply");




const AllTranningApplied = async (req, res) => { 
    try {
        const jobs = await TrainingProgram.find();
                 
        res.status(200).json(jobs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



const UpdateTranningAppliedById = async (req, res) => {

    const { id } = req.params;
    const { ApplyProgramID, FullName, Email, UserID,status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No  with id: ${id}`);

    const updateJobPost = { ApplyProgramID, FullName, Email, UserID, status,  _id: id };

    await TrainingProgram.findByIdAndUpdate(id, updateJobPost, { new: true });

    res.json(updateJobPost);
}





const CreateTranningApply= async (req, res) => {

    const groups = req.body;

    const newGroups = new TrainingProgram({ ...groups, creator: req.userId })

    try {
        await newGroups.save();

        res.status(201).json(newGroups );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


const GetTranningApplyByID = async (req, res) => {
    const { id } = req.params;
    try {
        const groups = await TrainingProgram.findById(id);
        res.status(200).json(groups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const RemoveTranningApplied = async (req, res) => {
    try {
        await TrainingProgram.findByIdAndDelete(req.params.id)
        res.json({ msg: "Delete trainingAppliedProgram" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}



module.exports ={RemoveTranningApplied, GetTranningApplyByID,CreateTranningApply,UpdateTranningAppliedById,AllTranningApplied};







