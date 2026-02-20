const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/me').get(userController.getMe);

router.route('/').get(userController.findAll);

router.route('/:id').get(userController.findOne);

module.exports = router;
