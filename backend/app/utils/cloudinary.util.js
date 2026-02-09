const cloudinary = require('cloudinary').v2;
const config = require('../config/index');

class CloudinaryUtil {
  constructor() {
    cloudinary.config(config.cloudiary);
  }

  /**
   * Upload ảnh lên Cloudinary
   * @param {String} filePath
   * @param {String} folderName
   * @returns {Promise}
   */
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
  /**
   * Xóa ảnh trên Cloudinary
   * @param {String} publicId
   */
  async deleteImage(publicId) {
    try {
      await cloudinary.uploader.destroy(publicId);
      console.log('Xóa ảnh thành công');
    } catch (error) {
      console.error('Cloudinary Delete Error:', error.message);
    }
  }
}

module.exports = new CloudinaryUtil();
