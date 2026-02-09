const { ObjectId } = require('mongodb');
class CategoryService {
  constructor(client) {
    this.Category = client.db().collection('TheLoai');
  }

  extractCategoryData(payload) {
    const category = {
      maTheLoai: payload.maTheLoai,
      tenTheLoai: payload.tenTheLoai,
    };
    Object.keys(category).forEach((key) => category[key] === undefined && delete category[key]);
    return category;
  }

  async create(payload) {
    const category = this.extractCategoryData(payload);
    const result = await this.Category.findOneAndUpdate(
      category,
      { $set: {} },
      { returnDocument: 'after', upsert: true },
    );
    return result;
  }
  async find(filter) {
    const cursor = await this.Category.find(filter);
    return cursor.toArray();
  }
  async findById(id) {}
  async update(id) {}
  async delete(id) {}
  async deleteAll() {}
}
module.exports = CategoryService;
