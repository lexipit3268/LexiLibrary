const cloudinary = require('cloudinary').v2;
const config = require('../config/index');

class CloudinaryUtil {
  constructor() {
    cloudinary.config(config.cloudiary);
  }

  async uploadImage(filePath, folderName) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `LexiLibrary/${folderName}`,
        resource_type: 'auto',
      });
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      throw new Error('Cloudinary Upload Error: ' + error.message);
    }
  }

  async deleteImage(publicImgId) {
    try {
      await cloudinary.uploader.destroy(publicImgId);
      console.log('Xóa ảnh thành công');
    } catch (error) {
      console.error('Cloudinary Delete Error:', error.message);
    }
  }
}

module.exports = new CloudinaryUtil();
