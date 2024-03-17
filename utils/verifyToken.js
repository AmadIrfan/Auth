// @ts-nocheck
const express = require("express");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
	try {
		const token = req.headers.authorization;
		if (!token) {
			return res.status(401).json({ message: "invalid token" });
		}
		let userToken = token.split(" ")[1];
		const decodedToken = jwt.decode(userToken, process.env.JWTTOKEN);
		if (decodedToken) {
			req.user = decodedToken;
			next();
		} else {
			return res.status(401).json({ message: "invalid token" });
		}
	} catch (err) {
		return res.status(505).json({ message: err.message });
	}
}

module.exports = { verifyToken };

// 200 OK for successful login, 401 Unauthorized for invalid credentials, 403 Forbidden for access denied