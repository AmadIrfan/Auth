const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/verifyToken");
const { checkRole } = require('../utils/role')
const { Login, Register, forgetPassword, verifyAccount } = require("../controller/authController");


router.post("/login", Login);
router.post("/register", Register);
router.post("/forgetPassword", forgetPassword);
router.get('/verify-account/:id', verifyAccount);

module.exports = router;
