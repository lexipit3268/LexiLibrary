const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.route('/').get(cartController.findAll).delete(cartController.deleteAll);
router.route('/add').post(cartController.create);
router.route('/:id').post(cartController.update).delete(cartController.delete);

module.exports = router;
