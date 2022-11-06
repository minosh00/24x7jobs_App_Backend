const mongoose = require('mongoose');
const TrainingProgram = require("../Model/TranningProgram");




const AllTraining = async (req, res) => { 
    try {
        const jobs = await TrainingProgram.find();
                 
        res.status(200).json(jobs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



const UpdateTrainingById = async (req, res) => {

    const { id } = req.params;
    const { TrainingID, TrainingTitle, Description, TrainingPeriod, TrainingImages, certificate,TrainingOrganizer } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No  with id: ${id}`);

    const updateJobPost = { TrainingID, TrainingTitle, TrainingPeriod, Description, TrainingImages, certificate,TrainingOrganizer, _id: id };

    await TrainingProgram.findByIdAndUpdate(id, updateJobPost, { new: true });

    res.json(updateJobPost);
}





const CreateTrainingProgram= async (req, res) => {

    const groups = req.body;

    const newGroups = new TrainingProgram({ ...groups, creator: req.userId })

    try {
        await newGroups.save();

        res.status(201).json(newGroups );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


const GetTrainingByID = async (req, res) => {
    const { id } = req.params;
    try {
        const groups = await TrainingProgram.findById(id);
        res.status(200).json(groups);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const RemoveTrainingProgram = async (req, res) => {
    try {
        await TrainingProgram.findByIdAndDelete(req.params.id)
        res.json({ msg: "Delete JobPost" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}



module.exports ={RemoveTrainingProgram, GetTrainingByID,CreateTrainingProgram,UpdateTrainingById,AllTraining};







