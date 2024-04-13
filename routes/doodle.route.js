const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer();

const controller = require('../controllers/doodle.controller');

router.get('/', controller.index);
router.get('/detail/:id', controller.detail);
router.post('/create/', upload.single('file'), controller.create);
router.patch('/edit/:id', upload.single('file'), controller.edit);
router.delete('/:id', controller.delete);

router.get('/popular', controller.popular);
router.get('/special', controller.special);
router.get('/newest', controller.newest);

module.exports = router;
