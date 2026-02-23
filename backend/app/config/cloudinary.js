const config = require('./index');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: config.cloudiary.cloud_name,
  api_key: config.cloudiary.api_key,
  api_secret: config.cloudiary.api_secret,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'LexiLibrary',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const uploadCloud = multer({ storage });

module.exports = uploadCloud;
