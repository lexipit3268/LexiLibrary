const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router
  .route('/')
  .get(bookController.findAll)
  .post(bookController.create)
  .delete(bookController.deleteAll);

router
  .route('/:id')
  .get(bookController.findOne)
  .put(bookController.update)
  .delete(bookController.delete);
module.exports = router;
