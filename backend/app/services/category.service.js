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

  async findById(id) {
    if (!id) return null;
    return await this.Category.findOne({ maTheLoai: id });
  }

  async update(id, payload) {
    const updateData = this.extractCategoryData(payload);
    const result = await this.Category.findOneAndUpdate(
      { maTheLoai: id },
      { $set: updateData },
      { returnDocument: 'after' },
    );
    if (!result) {
      return null;
    }
    return result;
  }

  async delete(id) {
    if (!id) return null;
    const result = await this.Category.deleteOne({ maTheLoai: id });
    return result;
  }

  async deleteAll() {
    const result = await this.Category.deleteMany({});
    return result;
  }
}
module.exports = CategoryService;
