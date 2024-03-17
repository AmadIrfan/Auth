// @ts-nocheck
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	role: {
		type: String,
		required: true,
		enum: ["admin", "user"],
		default: 'user',
	},
	isVerified: {
		type: Boolean,
		required: true,
		default: false,
	},
}, { timestamps: true });

userSchema.methods.verifyPassword = async function (password) {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch;
}

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	const hashedPassword = await bcrypt.hash(this.password, 10);
	this.password = hashedPassword;
	return next();

});


let user = mongoose.model("Users", userSchema);
module.exports = user;
