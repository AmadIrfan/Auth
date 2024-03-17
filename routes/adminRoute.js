
const express = require("express");
const router = express.Router();

const {
    getAllUser, getUserById,
} = require("../controller/adminController");
const { verifyToken } = require("../utils/verifyToken");
const { checkRole } = require("../utils/role");



router.get("/getUsers", verifyToken, checkRole(['admin']), getAllUser);
router.get("/getUserById/:id", verifyToken, checkRole(['admin']), getUserById);

module.exports = router;
