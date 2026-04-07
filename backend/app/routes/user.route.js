const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const uploadCloud = require('../config/cloudinary');
const { verifyToken, isStaff } = require('../middlewares/auth.middleware');

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.get('/me', authMiddleware.verifyToken, userController.getMe);

router.route('/').get(verifyToken, isStaff, userController.findAll);

router.route('/upload-avatar').post(uploadCloud.single('image'), userController.uploadAvatar);

router
  .route('/:id')
  .get(verifyToken, userController.findOne)
  .post(verifyToken, userController.update);

module.exports = router;
