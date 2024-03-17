function checkRole(roles) {
    return (req, res, next) => {
        const role = req.user.role;
        if (roles.includes(role)) {
            next();
        } else {
            return res
                .status(403)
                .json({ message: "Don't have permission to access this route" });
        }
    };
}
module.exports = { checkRole }