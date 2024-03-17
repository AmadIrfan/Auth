// @ts-nocheck
const express = require("express");
const jwt = require("jsonwebtoken");
async function getToken(user) {
	const payload = {
		id: user._id,
		email: user.email,
		role: user.role,
	};
	const token = jwt.sign(payload, process.env.JWTTOKEN);
	return token;
}
module.exports = { getToken };
