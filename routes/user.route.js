const express = require('express');
const router = express.Router();
const validate = require('../validates/account.validate');
const controller = require('../controllers/user.controller');
const passport = require("../middlewares/passport.middleware");


router.post('/register', validate.createPost, controller.register);
router.post('/login', controller.login);
router.get('/', controller.index);
router.get('/detail/:id', controller.detail);
router.patch('/change-password/:id', controller.changePassword);
router.patch('/:id', controller.edit);
router.patch('/favorite/:id', controller.favorite);
router.delete('/:id', controller.delete);

module.exports = router;
