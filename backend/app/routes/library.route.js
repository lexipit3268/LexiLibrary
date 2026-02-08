const express = require('express');
const libraryController = null;
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.send({ message: 'Get OK' });
  })
  .post((req, res) => {
    res.send({ message: 'Post OK' });
  });

module.exports = router;
