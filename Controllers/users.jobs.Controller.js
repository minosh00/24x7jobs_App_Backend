const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require('../Model/user.model');

var jwtSecret = "mysecrettoken";


 const registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password , userRole ,age,country,selfIntro } = req.body;

    
    if(!name || !email  || !password   || !country ||!age)
    return res
    .status(400)
    .json({errorMessage : "plz all fill"});

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }
        user = new User({
            name,
            email,
            age,
            country,
            password,
            userRole,
            selfIntro,
        });

   // Encrypt Password
   const salt = await bcrypt.genSalt(10);

   user.password = await bcrypt.hash(password, salt);

   await user.save();

   //Return jsonwebtoken
   const payload = {
       user: {
           id: user.id,
       },
   };

   jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
       if (err) throw err;
       res.json({ token, userRole: user.userRole });
       
   });
} catch (err) {
   console.error(err.message);
   res.status(500).send("Server error");
}
};



const authUser =  async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
}


const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json([{ msg: "Invalid Credentials" }]);
    }

    const { email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        //Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, jwtSecret, { expiresIn: "1 days" }, (err, token) => {
            if (err) throw err;
            res.json({ token , name: user.name , userRole: user.userRole ,country:user.country, userId:user.id, selfIntro:user.selfIntro, age:user.age});
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};





const getUsers = async (req, res) => { 
    try {
        //const users = await User.find();
        const users = await User.find(!!req.query.role ?{userRole: req.query.role}: {});
                 
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


 const getUser = async (req, res) => { 
    const { id } = req.params;

    try {
        const users = await User.findById(id);
        
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



const createUser = async (req, res) => {
    const users = req.body;

    const newuser = new User({ ...users, creator: req.userId })

    try {
        await newuser.save();

        res.status(201).json(newuser );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

 const updateUser = async (req, res) => {
    const { id } = req.params;
    const newBody = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndUpdate(id, newBody);

    const updatedUser = await User.findById(id)

    res.json(updatedUser);
}


 const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "User deleted successfully." });
}



module.exports ={getUsers,getUser ,createUser,deleteUser  , updateUser , registerUser , authUser , loginUser};
