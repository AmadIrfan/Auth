// @ts-nocheck
const userModel = require("../model/userModel");
const { sendEmail } = require("../utils/email_message");
const { getToken } = require("../utils/token");

async function Register(req, res) {
	try {
		let data = req.body;
		let checkUser = await userModel.findOne({ email: data.email });
		if (checkUser) {
			return res
				.status(505)
				.json({ message: "user with this credential already exist", data: data });

		}
		const user = new userModel(data);
		let userReturned = await user.save();
		res
			.status(201)
			.json({ message: "Registered successfully", data: data });

		let message = await sendEmail(data.email, 'account Create successfully', `<h3>Hi ${data.name}</h3> your account has been created successfully `);
	} catch (err) {
		res.status(505).json({ message: err.message, });
	}
}
async function forgetPassword(req, res) {
	try {
		let email = req.body.email;
		let userReturned = await userModel.findOne({ email: email });

		if (!userReturned) {
			return res
				.status(505)
				.json({ message: "user with this email dose not exist", data: { email: email } });
		}
		let message = await sendEmail(email, 'Reset password', `<h3>Hi ${userReturned.name}</h3> <p>Click on blow given link to reset password</p> <a href=''>reset password</a> `);
		res
			.status(200)
			.json({ message: "Check your mail box Email has been sent successfully", data: { email: email } });
	} catch (error) {
		res.status(505).json({ message: error.message });
	}
}
async function Login(req, res) {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email });
		if (user) {
			const isMatch = await user.verifyPassword(password);
			if (isMatch) {
				const token = await getToken(user);
				res.status(200).json({
					message: "login successfully",
					data: {
						token: token,
					},
				},);
			}
			else {
			}
		} else {
			res.status(404).json({ message: "User Not Found ", data: null, });
		}
	} catch (err) {
		res.status(502).json({ message: err.message, data: null, });
	}
}
async function verifyAccount(req, res) {
	try {
		let { id } = req.params;
		let user = await userModel.findById(id);
		if (user.isVerified) {
			return res.status(200).send({
				message: "Email is Already verified.",
				data: {
					email: user.email,
				},
			});
		}
		user.isVerified = true;
		await user.save();
		if (user.isVerified) {
			// res.render('verification');
			res.status(200).send({
				message: "successfully Verified your Email ...",
				data: {
					email: user.email,
				},
			});
			await sendEmail(
				user.email,
				"Email Verified",
				`<h3>${user.name} </h3> <p>successfully Verified your Email ...</p>`
			);
		}
	} catch (err) {
		res.status(505).send({
			message: err.message,
		});
	}
}


module.exports = { Login, Register, forgetPassword, verifyAccount };
