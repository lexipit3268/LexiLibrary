const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowing.controller');

router
  .route('/')
  .get(borrowingController.findAll)
  .post(borrowingController.create)
  .delete(borrowingController.deleteAll);

router
  .route('/:id')
  .get(borrowingController.findOne)
  .put(borrowingController.update)
  .delete(borrowingController.delete);

module.exports = router;
