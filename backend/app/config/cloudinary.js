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
  params: async (req, file) => {
    let folderName = 'Others';

    if (req.baseUrl.includes('books')) {
      folderName = 'Books';
    } else if (req.baseUrl.includes('users')) {
      folderName = 'Users';
    } else if (req.baseUrl.includes('staffs')) {
      folderName = 'staffs';
    }

    return {
      folder: `LexiLibrary/${folderName}`,
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    };
  },
});
const uploadCloud = multer({ storage });

module.exports = uploadCloud;
