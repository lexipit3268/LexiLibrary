const { ObjectId } = require('mongodb');
const BookService = require('./book.service');
class Borrowing {
  constructor(client) {
    this.Borrowing = client.db().collection('TheoDoiMuonSach');
    this.bookService = new BookService(client);
  }

  extractBorrowingData(payload) {
    const borrowing = {
      maDocGia: payload.maDocGia,
      maSach: payload.maSach,
      soLuong: payload.soLuong || 1,
      ngayTaoPhieu: new Date().toISOString().slice(0, 10),
      ngayMuon: payload.ngayMuon || new Date().toISOString().slice(0, 10),
      ngayCanTra: payload.ngayCanTra || this.generateNgayCanTra(),
      ngayTra: payload.ngayTra || null,
      trangThai: payload.trangThai || 'DangCho',
    };
    return borrowing;
  }

  // MP20260001
  async generateMaPhieu() {
    const lastBorrowing = await this.Borrowing.find().sort({ maPhieu: -1 }).limit(1).toArray();
    const currentYear = new Date().getFullYear();

    if (lastBorrowing.length === 0) {
      return `MP${currentYear}0001`;
    }

    const lastId = lastBorrowing[0].maPhieu;
    const lastNumber = parseInt(lastId.substring(6));
    const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
    return `MP${currentYear}${nextNumber}`;
  }

  generateNgayCanTra() {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 14);
    return currentDate.toISOString().slice(0, 10);
  }

  async find(filter) {
    const cursor = await this.Borrowing.find(filter);
    return cursor.toArray();
  }

  async create(payload) {
    const borrowing = this.extractBorrowingData(payload);
    borrowing.maPhieu = await this.generateMaPhieu();

    const isBookAvailable = await this.bookService.isAvailable(borrowing.maSach);
    if (!isBookAvailable) {
      throw new Error('OUT_OF_STOCK');
    }

    const activeBorrowings = await this.Borrowing.find({
      maDocGia: borrowing.maDocGia,
      trangThai: { $in: ['DangCho', 'DangMuon'] },
    }).toArray();

    const currentCount = activeBorrowings.reduce((total, item) => total + item.soLuong, 0);
    if (currentCount + borrowing.soLuong > 5) {
      throw new Error('LIMIT_EXCEEDED');
    }

    await this.Borrowing.insertOne(borrowing);
    await this.bookService.updateStock(borrowing.maSach, -borrowing.soLuong);

    return borrowing;
  }
  async update(id, payload) {
    const currentBorrowing = await this.Borrowing.findOne({ maPhieu: id });
    if (!currentBorrowing) return null;
    const updateData = {};
    if (payload.trangThai) updateData.trangThai = payload.trangThai;

    if (payload.trangThai === 'DaTra') {
      updateData.ngayTra = payload.ngayTra || new Date().toISOString().slice(0, 10);
    }

    const restockStatus = ['DaTra', 'TuChoi', 'DaHuy'];
    if (
      restockStatus.includes(updateData.trangThai) &&
      !restockStatus.includes(currentBorrowing.trangThai)
    ) {
      await this.bookService.updateStock(currentBorrowing.maSach, currentBorrowing.soLuong);
    }

    const result = await this.Borrowing.findOneAndUpdate(
      { maPhieu: id },
      { $set: updateData },
      { returnDocument: 'after' },
    );
    return result;
  }

  async deleteOne(id) {
    return await this.Borrowing.deleteOne({ maPhieu: id });
  }

  async deleteAll() {
    return await this.Borrowing.deleteMany({});
  }
}
module.exports = Borrowing;
