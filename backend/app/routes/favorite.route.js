const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);

router
  .route('/')
  .get(favoriteController.findAll)
  .post(favoriteController.create)
  .delete(favoriteController.deleteAll);

router.route('/:id').delete(favoriteController.deleteOne);
module.exports = router;
