const StaffService = require('../services/staff.service');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require('../api-error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const { StatusCodes } = require('http-status-codes');

exports.create = async (req, res, next) => {
  const { email, matKhau, hoTenNV, chucVu, soDienThoai } = req.body;

  if (!email || !matKhau || !hoTenNV || !chucVu || !soDienThoai) {
    return next(
      new ApiError(
        StatusCodes.BAD_REQUEST,
        'Missing required fields: email, password, name, position, or phone',
      ),
    );
  }

  try {
    const staffService = new StaffService(MongoDB.client);
    const existing = await staffService.findByEmail(email);

    if (existing) {
      return next(new ApiError(StatusCodes.CONFLICT, 'Staff email already exists'));
    }

    const document = await staffService.create(req.body);
    return res.status(201).send(document);
  } catch (error) {
    console.error('Create Staff Error:', error);
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occurred while creating the staff account',
      ),
    );
  }
};

exports.login = async (req, res, next) => {
  const { email, matKhau } = req.body;

  try {
    const staffService = new StaffService(MongoDB.client);
    const staff = await staffService.findByEmail(email);

    if (!staff) {
      return next(new ApiError(StatusCodes.NOT_FOUND, 'Staff account does not exist'));
    }

    const isMatch = await bcrypt.compare(matKhau, staff.matKhau);
    if (!isMatch) {
      return next(new ApiError(StatusCodes.CONFLICT, 'Incorrect password'));
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
        role: staff.role,
        image: staff.hinhAnh,
        email: staff.email,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'System login error occurred'));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    if (!req.params.id) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'maNhanVien cannot be empty'));
    }
    const document = await staffService.findByMaNV(req.params.id);
    if (!document) return next(new ApiError(StatusCodes.NOT_FOUND, "Staff doesn't exit"));
    return res.send(document);
  } catch (error) {
    console.error('FindOne Error:', error);
    return next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error retrieving staff information'),
    );
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const documents = await staffService.find({});
    return res.send(documents);
  } catch (error) {
    console.error('FindAll Error:', error);
    return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error retrieving staff list'));
  }
};
