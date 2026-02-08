const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./app/routes/library.route');
const config = require('./app/config');
const { StatusCodes } = require('http-status-codes');

app.use(cors());
app.use(express.json());
app.use(`${config.api.prefix}`, router);
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Lexilibrary. CODE: ' + StatusCodes.OK });
});

module.exports = app;
