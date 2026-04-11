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
      publicImgId: payload.publicImgId,
    };
    Object.keys(book).forEach((key) => book[key] === undefined && delete book[key]);
    return book;
  }

  async find(filter, sort = {}) {
    const cursor = await this.Book.find(filter).sort(sort);
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

  async getByCategory() {
    const cursor = await this.Book.aggregate([
      { $unwind: '$maTheLoai' },
      {
        $lookup: {
          from: 'TheLoai',
          localField: 'maTheLoai',
          foreignField: 'maTheLoai',
          as: 'info',
        },
      },
      { $unwind: '$info' },
      {
        $group: {
          _id: '$info.tenTheLoai', // nhom theo ten the loai
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    return cursor.toArray();
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

  async updateStock(id, amount) {
    // -1 muon, 1 khi tra hoac huy)
    const result = await this.Book.findOneAndUpdate(
      { maSach: id },
      { $inc: { soQuyen: amount } },
      { returnDocument: 'after' },
    );
    return result;
  }

  async isAvailable(id) {
    const book = await this.Book.findOne({ maSach: id }, { projection: { soQuyen: 1 } });
    return book && book.soQuyen > 0;
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
