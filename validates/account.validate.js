const validator = require("validator");

module.exports.createPost = (req, res, next) => {
    const {
        fullName,
        email,
        password
    } = req.body;
    if (!fullName || !email || !password) {
        res.json({
            code: 400,
            message: "Please fill in all information!"
        });
        return;
    }
    if (!validator.isEmail(email))
    {
        res.json({
            code: 400,
            message: "Invalid Email!"
        })
        return;
    }
    if (!validator.isLength(password, {min: 8}))
    {
        res.json({
            code: 400,
            message: "Password needs at least 8 characters !"
        })
        return;
    }
    next();
}