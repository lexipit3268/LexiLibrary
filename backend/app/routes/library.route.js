const express = require('express');
const router = express.Router();

const publisherRoute = require('./publisher.route');
const categoryRoute = require('./catagory.route');
const bookRoute = require('./book.route');
const staffRoute = require('./staff.route');
const userRoute = require('./user.route');
const borrowingRoute = require('./borrowing.route');

router.use('/categories', categoryRoute);
router.use('/publishers', publisherRoute);
router.use('/books', bookRoute);
router.use('/staffs', staffRoute);
router.use('/users', userRoute);
router.use('/borrowings', borrowingRoute);
router.route('/').get((req, res) => {
  res.send({ message: 'Route ok' });
});

module.exports = router;
