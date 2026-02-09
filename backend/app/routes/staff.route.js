const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');

router
  .route('/')
  .get(staffController.findAll)
  .post(staffController.create)
  .delete(staffController.deleteAll);

router.route('/login').post(staffController.login);
router.route('/me').get(staffController.getMe);

router
  .route('/:id')
  .get(staffController.findOne)
  .put(staffController.update)
  .delete(staffController.delete);
module.exports = router;
