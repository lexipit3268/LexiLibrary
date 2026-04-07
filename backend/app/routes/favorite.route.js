const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
router
  .route('/')
  .get(favoriteController.findAll)
  .post(favoriteController.create)
  .delete(favoriteController.deleteAll);
module.exports = router;
