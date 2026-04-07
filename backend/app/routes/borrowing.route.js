const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowing.controller');
const { verifyToken, isStaff } = require('../middlewares/auth.middleware');

router
  .route('/')
  .get(borrowingController.findAll)
  .post(borrowingController.create)
  .delete(verifyToken, isStaff, borrowingController.deleteAll);

router
  .route('/:id')
  .get(borrowingController.findOne)
  .post(borrowingController.update)
  .delete(verifyToken, isStaff, borrowingController.delete);

module.exports = router;
