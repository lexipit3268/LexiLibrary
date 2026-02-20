const express = require('express');
const staffController = require('../controllers/staff.controller');
const { verifyToken, isStaff } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/login', staffController.login);

router.get('/me', verifyToken, isStaff, staffController.getMe);

router.route('/').get(verifyToken, isStaff, staffController.findAll).post(staffController.create);

module.exports = router;
