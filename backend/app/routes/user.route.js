const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router
  .route('/')
  .get(userController.findAll)
  .post(userController.create)
  .delete(userController.deleteAll);

router.route('/login').post(userController.login);
router.route('/me').get(userController.getMe);

router
  .route('/:id')
  .get(userController.findOne)
  .put(userController.update)
  .delete(userController.delete);
module.exports = router;
