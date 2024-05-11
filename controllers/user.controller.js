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
      error: error.message,
      message: 'Internal Server Error',
    });
  }
};

// [POST] version/user/login
module.exports.login = async (req, res) => {
  try {
    const infoUser = {
      email: req.body.email,
      password: md5(req.body.password),
    };
    const user = await Users.findOne({ email: infoUser.email });
    if (!user) {
      return res.json({
        code: 404,
        message: 'Email not found!',
      });
    }
    if (user.password !== infoUser.password) {
      return res.json({
        code: 400,
        message: 'Password is incorrect!',
      });
    }
    return res.json({
      code: 200,
      message: 'Login success!',
      token: user.token,
    });
  } catch (error) {
    console.error(error);
    res.json({
      code: 500,
      error: error.message,
      message: 'Internal Server Error',
    });
  }
};

// [GET] VIEW
module.exports.index = async (req, res) => {
  try {
    const usersList = await Users.find();
    return res.status(200).json(usersList);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// [GET] DETAIL
module.exports.detail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.json({
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

    user.fullName = req.body.fullName;
    user.email = req.body.email;

    await user.save();
    return res.json({
      code: 200,
      message: 'Update user successful!',
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 500,
      error: error.message,
      message: 'Internal Server Error',
    });
  }
};

// [DELETE] DELETE
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    if (!user) {
      return res.json({
        code: 404,
        message: 'Not found user!',
      });
    }
    user.deleted = true;
    await user.save();
    return res.json({
      code: 200,
      message: 'Delete user successful!',
    });
  } catch (error) {
    return res.json({
      code: 500,
      error: error.message,
      message: error.message,
    });
  }
};

// [PATCH] CHANGE PASSWORD
module.exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    if (!user) {
      return res.json({
        code: 404,
        message: 'Not found user!',
      });
    }
    user.password = md5(req.body.password);
    await user.save();
    return res.json({
      code: 200,
      message: 'Change password successful!',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      code: 500,
      error: error.message,
      message: 'Internal Server Error',
    });
  }
};

// [PATCH] FAVORITE
module.exports.favorite = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    if (!user) {
      return res.json({
        code: 404,
        message: 'Not found user!',
      });
    }
    req.body.favorite.map((item) => {
      user.favorite.push(item);
    });
    await user.save();
    return res.json({
      code: 200,
      message: 'Update user favorite successful!',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      code: 500,
      error: error.message,
      message: 'Internal Server Error',
    });
  }
};
