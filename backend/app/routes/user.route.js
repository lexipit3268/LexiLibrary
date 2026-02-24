const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.get('/me', authMiddleware.verifyToken, userController.getMe);

router.route('/').get(userController.findAll);

router.route('/:id').get(userController.findOne);

module.exports = router;
