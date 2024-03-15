const md5 = require("md5")
const Users = require("../models/user.model")
const generate = require("../helpers/generate");

// [POST] version/users/register
module.exports.register = async (req, res) => {

    const existEmail = await Users.findOne({
        email: req.body.email,
        deleted: false
    })
    if (existEmail) {
        res.json({
            code: 400,
            message: "Email existed!"
        })
        return;
    }
    const infoUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        token: generate.generateRandomString(30)
    }
    const user = new Users(infoUser);
    await user.save();

    console.log(user);
    const token = user.token;

    res.cookie("token", token)

    res.json({
        code: 200,
        message: "Create account success!",
        token: token
    });
}