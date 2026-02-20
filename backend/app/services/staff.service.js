const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

class StaffService {
  constructor(client) {
    this.Staff = client.db().collection('NhanVien');
  }

  extractStaffData(payload) {
    const staff = {
      hoTenNV: payload.hoTenNV,
      matKhau: payload.matKhau,
      chucVu: payload.chucVu,
      diaChi: payload.diaChi,
      soDienThoai: payload.soDienThoai,
      hinhAnh: payload.hinhAnh || null,
      email: payload.email,
      role: 'staff',
    };

    Object.keys(staff).forEach((key) => staff[key] === undefined && delete staff[key]);
    return staff;
  }
  //NV20260001
  async generateMaNV() {
    const lastStaff = await this.Staff.find().sort({ maNV: -1 }).limit(1).toArray();
    const currentYear = new Date().getFullYear();

    if (lastStaff.length === 0) {
      return `NV${currentYear}0001`;
    }

    const lastId = lastStaff[0].maNV;

    const lastYear = lastId.substring(2, 6);
    if (lastYear !== currentYear.toString()) {
      return `NV${currentYear}0001`;
    }

    const lastNumber = parseInt(lastId.substring(6));
    const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
    return `NV${currentYear}${nextNumber}`;
  }

  async create(payload) {
    const staff = this.extractStaffData(payload);

    staff.maNV = await this.generateMaNV();

    if (staff.matKhau) {
      const salt = await bcrypt.genSalt(10);
      staff.matKhau = await bcrypt.hash(staff.matKhau, salt);
    }

    const result = await this.Staff.findOneAndUpdate(
      { email: staff.email },
      { $setOnInsert: staff },
      { returnDocument: 'after', upsert: true },
    );
    return result;
  }

  async findByEmail(email) {
    return await this.Staff.findOne({ email: email });
  }

  async findByMaNV(id) {
    return await this.Staff.findOne({ maNV: id });
  }

  async findById(id) {
    return await this.Staff.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
  }
}

module.exports = StaffService;
