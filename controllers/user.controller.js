const md5 = require('md5');
const Users = require('../models/user.model');
const generate = require('../helpers/generate');

// [POST] version/user/register
module.exports.register = async (req, res) => {
  try {
    const existEmail = await Users.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (existEmail) {
      res.json({
        code: 400,
        message: 'Email existed!',
      });
      return;
    }
    const infoUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: md5(req.body.password),
      token: generate.generateRandomString(30),
    };
    const user = new Users(infoUser);
    await user.save();

    console.log(user);
    const token = user.token;

    res.cookie('token', token);

    res.json({
      code: 200,
      message: 'Create account success!',
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
};

// [POST] version/user/login
module.exports.login = async (req, res) => {
  try {
    const user = 
  } catch (error) {}
};
// [GET] VIEW
module.exports.index = async (req, res) => {
  try {
    const usersList = await Users.find();
    res.status(200).json(doodles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// [GET] DETAIL
module.exports.detail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    res.status(200).json(doodle);
  } catch (error) {
    res.json({
      code: 400,
      message: error.message,
    });
  }
};

// [PATCH] EDIT
module.exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    if (!user) {
      res.json({
        code: 404,
        message: 'Không tìm thấy tài khoản',
      });
      return;
    }
    const infoUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      favorite: req.body.favorite,
      doodleCreated: req.body.doodleCreated,
    };
    await Users.findByIdAndUpdate(id, infoUser);
    res.json({
      code: 200,
      message: 'Cập nhật người dùng thành công',
    });
  } catch (error) {
    res.json({
      code: 500,
      message: error.message,
    });
  }
};
