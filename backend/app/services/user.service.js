const bcrypt = require('bcryptjs');
class UserService {
  constructor(client) {
    this.User = client.db().collection('DocGia');
  }

  extractUserData(payload) {
    const user = {
      hoLot: payload.hoLot,
      ten: payload.ten,
      ngaySinh: payload.ngaySinh,
      phai: payload.phai,
      diaChi: payload.diaChi,
      soDienThoai: payload.soDienThoai,
      email: payload.email,
      matKhau: payload.matKhau,
      hinhAnh: payload.hinhAnh || null,
      role: 'user',
    };

    Object.keys(user).forEach((key) => user[key] === undefined && delete user[key]);
    return user;
  }

  //DG20260001
  async generateMaDocGia() {
    const lastUser = await this.User.find().sort({ maDocGia: -1 }).limit(1).toArray();
    const currentYear = new Date().getFullYear();

    if (lastUser.length === 0) {
      return `DG${currentYear}0001`;
    }

    const lastId = lastUser[0].maDocGia;
    const lastNumber = parseInt(lastId.substring(6));
    const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
    return `DG${currentYear}${nextNumber}`;
  }

  async create(payload) {
    const user = this.extractUserData(payload);

    user.maDocGia = await this.generateMaDocGia();

    if (user.matKhau) {
      const salt = await bcrypt.genSalt(10);
      user.matKhau = await bcrypt.hash(user.matKhau, salt);
    }

    const result = await this.User.findOneAndUpdate(
      { email: user.email },
      { $setOnInsert: user },
      { returnDocument: 'after', upsert: true },
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.User.find(filter);
    return cursor.toArray();
  }

  async findByEmail(email) {
    return await this.User.findOne({ email: email });
  }

  async findByMaDocGia(id) {
    return await this.User.findOne({ maDocGia: id });
  }

  async update(id, payload) {
    const updateData = this.extractUserData(payload);

    if (updateData.matKhau) {
      const salt = await bcrypt.genSalt(10);
      updateData.matKhau = await bcrypt.hash(updateData.matKhau, salt);
    }

    const result = await this.User.findOneAndUpdate(
      { maDocGia: id },
      { $set: updateData },
      { returnDocument: 'after' },
    );
    return result;
  }

  async delete(id) {
    return await this.User.deleteOne({ maDocGia: id });
  }
}

module.exports = UserService;
