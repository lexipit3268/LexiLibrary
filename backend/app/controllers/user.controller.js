const UserService = require('../services/user.service');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require('../api-error');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const cloudinaryUtil = require('../utils/cloudinary.util');
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
        code: user.maDocGia,
        name: user.hoLot + ' ' + user.ten,
        role: user.role,
        image: user.hinhAnh,
        email: user.email,
        isActive: user.isActive,
        limit: user.gioiHanDat,
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

exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'Image cannot be empty'));
    }

    const coverUrl = req.file.path;
    const publicId = req.file.filename;

    return res.status(StatusCodes.OK).json({
      message: 'Tải ảnh đại diện thành công',
      coverUrl: coverUrl,
      publicId: publicId,
    });
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occurred while uploading the book cover',
      ),
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

exports.update = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const user = await userService.findByMaDocGia(req.params.id);
    if (!user)
      return next(new ApiError(StatusCodes.NOT_FOUND, `Not found user with id = ${req.params.id}`));

    const oldPublicAvtId = user.publicAvtId;
    const newPublicAvtId = req.body.publicAvtId;

    if (oldPublicAvtId && newPublicAvtId && newPublicAvtId !== oldPublicAvtId) {
      await cloudinaryUtil.deleteImage(oldPublicAvtId);
    }

    const result = await userService.update(req.params.id, req.body);
    return res.send(result);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occurred while uploading user information',
      ),
    );
  }
};
