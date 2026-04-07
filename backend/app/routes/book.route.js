const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const uploadCloud = require('../config/cloudinary');
const { verifyToken, isStaff } = require('../middlewares/auth.middleware');

router
  .route('/')
  .get(bookController.findAll)
  .post(verifyToken, isStaff, bookController.create)
  .delete(verifyToken, isStaff, bookController.deleteAll);

router.route('/upload-cover').post(uploadCloud.single('image'), bookController.uploadCover);

router
  .route('/:id')
  .get(bookController.findOne)
  .post(verifyToken, isStaff, bookController.update)
  .delete(verifyToken, isStaff, bookController.delete);

module.exports = router;
