const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const uploadCloud = require('../config/cloudinary');

router
  .route('/')
  .get(bookController.findAll)
  .post(bookController.create)
  .delete(bookController.deleteAll);

router.route('/upload-cover').post(uploadCloud.single('image'), bookController.uploadCover);

router
  .route('/:id')
  .get(bookController.findOne)
  .post(bookController.update)
  .delete(bookController.delete);

module.exports = router;
