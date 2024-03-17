// @ts-nocheck
const userModel = require("../model/userModel");
const { sendEmail } = require("../utils/email_message");

async function getUserProfile(req, res) {
	try {
		let { id } = req.user;
		const user = await userModel.findById(id);
		res.status(200).json({ message: "successful", data: user });
	} catch (err) {
		res.status(505).json({ message: err.message });
	}
}

async function accountVerification(req, res) {
	try {
		let { id } = req.user;
		const user = await userModel.findById(id);
		if (user.isVerified) {
			return res.status(200).json({ message: "Account Already Verified", data: { email: user.email } });
		}
		await sendEmail(user.email, 'verify your account', `<h2>Hi ${user.name}</h2> <p>here is your verification link     <a href="http://localhost:5000/auth/verify-account/${user.id}"> Click Here</a>
		</p>`)
		res.status(200).json({ message: "Email has been sent please check your mail box", data: { email: user.email } });
	} catch (error) {
		res.status(200).json({ message: error.message });

	}
}

async function deleteUser(req, res) {
	try {
		let { id } = req.user;
		const user = await userModel.findByIdAndDelete(id);
		res.status(200).json({ message: "successfully deleted user profile", data: user });
	} catch (err) {
		res.status(505).json({ message: err.message });
	}
}
async function editUser(req, res) { }

module.exports = { getUserProfile, deleteUser, editUser, accountVerification };
