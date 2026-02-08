const express = require('express');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');

const app = express();
const router = require('./app/routes/library.route');
const config = require('./app/config');
const ApiError = require('./app/api-error');
app.use(cors());
app.use(express.json());
app.use(`${config.api.prefix}`, router);
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Lexilibrary. CODE: ' + StatusCodes.OK });
});

//Xu ly loi tap trung
//404
app.use((req, res, next) => {
  return next(new ApiError(StatusCodes.NOT_FOUND, 'Resource not found'));
});

app.use((err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
