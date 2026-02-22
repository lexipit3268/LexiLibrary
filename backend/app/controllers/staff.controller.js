const StaffService = require('../services/staff.service');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require('../api-error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

exports.create = async (req, res, next) => {
  const { email, matKhau, hoTenNV, chucVu, soDienThoai } = req.body;

  if (!email || !matKhau || !hoTenNV || !chucVu || !soDienThoai) {
    return next(
      new ApiError(400, 'Missing required fields: email, password, name, position, or phone'),
    );
  }

  try {
    const staffService = new StaffService(MongoDB.client);
    const existing = await staffService.findByEmail(email);

    if (existing) {
      return next(new ApiError(409, 'Staff email already exists'));
    }

    const document = await staffService.create(req.body);
    return res.status(201).send(document);
  } catch (error) {
    console.error('Create Staff Error:', error);
    return next(new ApiError(500, 'An error occurred while creating the staff account'));
  }
};

exports.login = async (req, res, next) => {
  const { email, matKhau } = req.body;

  try {
    const staffService = new StaffService(MongoDB.client);
    const staff = await staffService.findByEmail(email);

    if (!staff) {
      return next(new ApiError(401, 'Staff account does not exist'));
    }

    const isMatch = await bcrypt.compare(matKhau, staff.matKhau);
    if (!isMatch) {
      return next(new ApiError(401, 'Incorrect password'));
    }

    const token = jwt.sign(
      { id: staff.maNV, role: 'staff', name: staff.hoTenNV },
      config.jwt.secret,
      { expiresIn: '24h' },
    );

    res.json({
      message: 'Staff login successful',
      token,
      user: {
        id: staff.maNV,
        name: staff.hoTenNV,
        role: 'staff',
        image: staff.hinhAnh,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return next(new ApiError(500, 'System login error occurred'));
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);

    const staff = await staffService.findByMaNV(req.user.id);

    if (!staff) {
      return next(new ApiError(404, 'Staff information not found'));
    }

    // Exclude password
    const { matKhau, ...staffData } = staff;
    return res.status(200).json(staffData);
  } catch (error) {
    console.error('GetMe Error:', error);
    return next(new ApiError(500, 'Error retrieving staff information'));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);

    const documents = await staffService.Staff.find({}).toArray();
    return res.send(documents);
  } catch (error) {
    console.error('FindAll Error:', error);
    return next(new ApiError(500, 'Error retrieving staff list'));
  }
};
