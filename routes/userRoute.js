
const express = require("express");
const router = express.Router();

const {
	accountVerification,
	getUserProfile,
	deleteUser,
	editUser,
} = require("../controller/userController");
const { verifyToken } = require("../utils/verifyToken");

router.get("/profile", verifyToken, getUserProfile);
router.delete("/profile/delete", verifyToken, deleteUser);
router.post('/accountVerification',verifyToken,accountVerification)
module.exports = router;
