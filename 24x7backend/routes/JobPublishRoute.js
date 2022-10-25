const express = require('express');
const router = express.Router();
const Post = require('../models/JobPublish');





//get back all the jobs  posts

router.get('/AllJobsPublish', async (req, res) => {
     try{
        const posts = await Post.find();
        res.json(posts);
     }catch(err){
         res.json({message:err});
     }
});



     router.post('/createJobsPost', async (req,res,next) =>{
         console.log(req.file);
    
     const posts = new Post({
          
                
        JobPosition: req.body.JobPosition,
        JobDescription: req.body.JobDescription,
        JobCompanyName: req.body.JobCompanyName,
        JobType: req.body.JobType,
        SalaryDetails: req.body.SalaryDetails,
        JobPeriod: req.body.JobPeriod,
        OtherDetails: req.body.OtherDetails,
        imageLink: req.body.imageLink,
        

    });
     try{

    const savedPost = await posts.save();
     return res.json(savedPost);
     }
     catch (err) {
         res.json({ message: err });
     }

     posts
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created jobs successfully",
        createdPost: {
            JobPosition: result.JobPosition,
            JobDescription: result.JobDescription,
            JobCompanyName: result.JobCompanyName,
            JobType:result.JobType,
            imageLink:result.imageLink,
            SalaryDetails: result.SalaryDetails,
            JobPeriod: result.JobPeriod,
            OtherDetails:result.OtherDetails,

            _id: result._id,
            request: {
                type: 'GET',
                url: "http://127.0.0.1:5000/publishJobs/" + result._id
            }
        }
      });
    })

});

//get back a specific post
router.get('/:postId', async (req, res) => {

    try{
       const post = await Post.findById(req.params.postId);
          res.json(post);
         }
         catch (err) {
             res.json({ message: err });
         }   
});





//DLT A SPECIFIC POST
router.delete('/:postId', async (req, res) => {
    try{
       const removedPost = await Post.remove({_id: req.params.postId });
       res.json(removedPost);
         }
         catch (err) {
             res.json({ message: err });
         }   
});





//update a post
router.patch('/:postId', async (req, res) => {
    try{
       const updatedPost = await Post.updateOne(
           {_id: req.params.postId }, 
           {$set: { JobPosition:req.body.JobPosition ,  JobDescription:req.body.JobDescription , JobCompanyName:req.body.JobCompanyName  , JobType:req.body.JobType , SalaryDetails:req.body.SalaryDetails , JobPeriod:req.body.JobPeriod     }
        });
       res.json(updatedPost);
         }
         catch (err) {
             res.json({ message: err });
         }   
});

module.exports = router;

