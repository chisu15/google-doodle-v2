const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        const extname = typeof file.originalname === 'string' ? path.extname(file.originalname) : '';
        console.log("", extname);
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Chỉ chấp nhận tệp hình ảnh'), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});


const controller = require('../controllers/doodle.controller');

router.get('/', controller.index);
router.get('/detail/:id', controller.detail);
router.post('/create',upload.single('image'), controller.create);
router.patch('/edit/:id', upload.single('image'), controller.edit);
router.delete('/delete/:id', controller.delete);

router.get('/popular', controller.popular);
router.get('/special', controller.special);
router.get('/newest', controller.newest);

module.exports = router;