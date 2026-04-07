const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisher.controller');
const { verifyToken, isStaff } = require('../middlewares/auth.middleware');

router
  .route('/')
  .get(publisherController.findAll)
  .post(verifyToken, isStaff, publisherController.create)
  .delete(verifyToken, isStaff, publisherController.deleteAll);

router
  .route('/:id')
  .get(publisherController.findOne)
  .post(verifyToken, isStaff, publisherController.update)
  .delete(verifyToken, isStaff, publisherController.delete);
module.exports = router;
