const UserService = require('../services/user.service');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require('../api-error');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
exports.register = async (req, res, next) => {
  const { hoLot, ten, email, matKhau, soDienThoai } = req.body;
  if (!hoLot || !ten || !email || !matKhau || !soDienThoai) {
    return next(new ApiError(StatusCodes.BAD_REQUEST, 'Missing information'));
  }

  try {
    const userService = new UserService(MongoDB.client);
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      return next(new ApiError(StatusCodes.CONFLICT, 'Cannot use this email'));
    }

    const newUser = await userService.create(req.body);
    //loai bo mat khau
    const { matKhau: _, ...userWithoutPassword } = newUser;
    return res.status(StatusCodes.CREATED).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'An error while registering user account'),
    );
  }
};

exports.login = async (req, res, next) => {
  const { email, matKhau } = req.body;

  if (!email || !matKhau) {
    return next(new ApiError(StatusCodes.BAD_REQUEST, 'Email và mật khẩu không được để trống'));
  }

  try {
    const userService = new UserService(MongoDB.client);

    const user = await userService.findByEmail(email);
    if (!user) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, 'User do not exist'));
    }
    const isPasswordMatch = await bcrypt.compare(matKhau, user.matKhau);
    if (!isPasswordMatch) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect password'));
    }
    const token = jwt.sign({ id: user.maDocGia, role: user.role }, config.jwt.secret, {
      expiresIn: '24h',
    });

    return res.status(StatusCodes.OK).json({
      message: 'Đăng nhập thành công',
      token: token,
      user: {
        maDocGia: user.maDocGia,
        ten: user.ten,
        role: user.role,
      },
    });
  } catch (error) {
    return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'An error while logining'));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.findByMaDocGia(req.params.id);
    if (!document) {
      return next(new ApiError(StatusCodes.NOT_FOUND, 'User not found'));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error while retrieving user with id =  ${req.params.id}`,
      ),
    );
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);

    const user = await userService.findByMaDocGia(req.user.id);

    if (!user) {
      return next(new ApiError(StatusCodes.NOT_FOUND, 'User not found'));
    }

    const { matKhau, ...userWithoutPassword } = user;
    return res.status(StatusCodes.OK).json(userWithoutPassword);
  } catch (error) {
    return next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'An error while getting user information'),
    );
  }
};

// get all user (Staff)
exports.findAll = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const documents = await userService.find({});
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'An error while getting all user data'),
    );
  }
};
