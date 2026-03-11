const { ObjectId } = require('mongodb');
class Borrowing {
  constructor(client) {
    this.Borrowing = client.db().collection('Borrowings');
  }

  extractBorrowingData(payload) {
    const borrowing = {
      maDocGia: payload.maDocGia,
      maSach: payload.maSach,
      soLuong: payload.soLuong || 1,
      ngayTaoPhieu: new Date().toISOString(),
      ngayMuon: payload.ngayMuon || new Date().toISOString().slice(0, 10),
      ngayCanTra: payload.ngayCanTra || this.generateNgayCanTra(),
      ngayTra: payload.ngayTra || null,
      maNV: payload.maNV,
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
}
module.exports = Borrowing;
