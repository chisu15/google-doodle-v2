const express = require('express');
const router = express.Router();
const validate = require("../validates/account.validate");
const controller = require("../controllers/user.controller")

router.post('/register', validate.createPost, controller.register);

module.exports = router;