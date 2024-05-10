const express = require('express');
const router = express.Router();
const validate = require("../validates/account.validate");
const controller = require("../controllers/user.controller")

router.post('/register', validate.createPost, controller.register);

router.get('/', controller.index);
router.get('/detail/:id', controller.detail);
router.patch('/:id', upload.single('image'), controller.edit);
router.delete('/delete/:id', controller.delete);

module.exports = router;