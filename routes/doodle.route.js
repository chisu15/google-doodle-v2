const express = require('express');
const router = express.Router();
const Doodle = require('../models/doodle.model');
const controller = require("../controllers/doodle.controller")

router.get('/', controller.index);
router.get('/detail/:id', controller.detail);
router.post('/create', controller.create);
router.patch('/edit/:id', controller.edit);
router.delete('/:id', controller.delete);
router.patch('/settime/:id', controller.setTime)
module.exports = router