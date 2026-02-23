const { ObjectId } = require('mongodb');
class Book {
  constructor(client) {
    this.Book = client.db().collection('Sach');
  }
  extractBookData(payload) {
    const book = {
      maSach: payload.maSach,
      tenSach: payload.tenSach,
      donGia: parseInt(payload.donGia) || 0,
      soQuyen: parseInt(payload.soQuyen) || 0,
      namXuatBan: parseInt(payload.namXuatBan) || new Date().getFullYear(),
      maNXB: payload.maNXB,
      tacGia: payload.tacGia,
      maTheLoai: Array.isArray(payload.maTheLoai)
        ? payload.maTheLoai
        : payload.maTheLoai
          ? [payload.maTheLoai]
          : [],
      hinhAnh: payload.hinhAnh,
      moTa: payload.moTa,
    };
    Object.keys(book).forEach((key) => book[key] === undefined && delete book[key]);
    return book;
  }
  async find(filter) {
    const cursor = await this.Book.find(filter);
    return cursor.toArray();
  }

  async create(payload) {
    const book = this.extractBookData(payload);
    const result = await this.Book.findOneAndUpdate(
      book,
      { $set: {} },
      { returnDocument: 'after', upsert: true },
    );
    return result;
  }

  async findById(id) {
    if (!id) return null;
    return await this.Book.findOne({ maSach: id });
  }

  async update(id, payload) {
    const updateData = this.extractBookData(payload);
    const result = await this.Book.findOneAndUpdate(
      { maSach: id },
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
    const result = await this.Book.deleteOne({ maSach: id });
    return result;
  }

  async deleteAll() {
    const result = await this.Book.deleteMany({});
    return result;
  }
}
module.exports = Book;
