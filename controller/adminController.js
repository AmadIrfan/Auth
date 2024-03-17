const userModel = require("../model/userModel");

async function getAllUser(req, res) {
    try {
        const user = await userModel.find();
        res.status(200).json({ message: "successful", data: user });
    } catch (err) {
        res.status(505).json({ message: err.message });
    }
}
async function getUserById(req, res) {
    try {
        let id = req.params.id
        const user = await userModel.findById(id);
        res.status(200).json({ message: "successful", data: user });
    } catch (err) {
        res.status(505).json({ message: err.message });
    }
}

module.exports = { getAllUser, getUserById }