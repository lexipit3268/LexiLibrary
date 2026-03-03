const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const uploadCloud = require('../config/cloudinary');

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.get('/me', authMiddleware.verifyToken, userController.getMe);

router.route('/').get(userController.findAll);

router.route('/upload-avatar').post(uploadCloud.single('image'), userController.uploadAvatar);

router.route('/:id').get(userController.findOne).post(userController.update);

module.exports = router;
