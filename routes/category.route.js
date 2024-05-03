const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require("../controllers/category.controller");


router.get('/', controller.index);
router.get('/detail/:id', controller.detail);
router.post('/', controller.create);
router.patch('/:id', controller.edit);
router.patch("/", controller.multiChange);
router.delete('/:id', controller.delete);




module.exports = router;