const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller.js');

router
  .route('/')
  .get(categoryController.findAll)
  .post(categoryController.create)
  .delete(categoryController.deleteAll);

router
  .route('/:id')
  .get(categoryController.findOne)
  .post(categoryController.update)
  .delete(categoryController.delete);
module.exports = router;
