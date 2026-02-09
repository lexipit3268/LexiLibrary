const dotenv = require('dotenv');
dotenv.config();

const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lexilibrary',
  },
  api: {
    prefix: process.env.API_PREFIX,
  },
  cloudiary: {
    cloud_name: process.env.CLOUNDIARY_NAME,
    api_key: process.env.CLOUNDIARY_KEY,
    api_secret: process.env.CLOUNDIARY_SECRET,
  },
};

module.exports = config;
