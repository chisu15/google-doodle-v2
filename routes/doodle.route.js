const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/doodle.controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, './tmp/');
    cb(null, '/tmp/');
  },
  filename: function (req, file, cb) {
    const extname =
      typeof file.originalname === 'string'
        ? path.extname(file.originalname)
        : '';
    console.log('', extname);
    console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTHHHHHHHHH', __dirname);
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    console.log(123123123123);
    return cb(new Error('Chỉ chấp nhận tệp hình ảnh'), false);
  }
  cb(null, true);
};
const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

router.get('/', controller.index);
router.get('/detail/:id', controller.detail);
router.get('/newest', controller.newest);
router.get('/popular', controller.popular);
router.get('/upcoming', controller.upcoming);
router.post('/', upload.single('image'), controller.create);
router.patch('/:id', upload.single('image'), controller.edit);
router.patch('/', controller.multiChange);
router.delete('/delete/:id', controller.delete);
router.get('/total-doodle', controller.totalDoodle);
router.get('/total-view', controller.totalViewAllTimeByMonth);
router.get('/total-like', controller.totalLikeAllTimeByMonth);
router.get('/random', controller.random)
router.get('/game', controller.game)
module.exports = router;
