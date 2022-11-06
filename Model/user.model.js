const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
    age: {
		type: String,
		required: true,

	},
	country: {
		type: String,
		required: true,
		
	},
	selfIntro: {
		type: String,
		required: true,
		default:null
		
	},
	password: {
		type: String,
		required: true,
	},
	userRole: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model("Users", UserSchema);