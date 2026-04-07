const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller.js');
const { verifyToken, isStaff } = require('../middlewares/auth.middleware');

router
  .route('/')
  .get(categoryController.findAll)
  .post(verifyToken, isStaff, categoryController.create)
  .delete(verifyToken, isStaff, categoryController.deleteAll);

router
  .route('/:id')
  .get(categoryController.findOne)
  .post(verifyToken, isStaff, categoryController.update)
  .delete(verifyToken, isStaff, categoryController.delete);
module.exports = router;
