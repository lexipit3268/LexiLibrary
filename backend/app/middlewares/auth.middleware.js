const jwt = require('jsonwebtoken');
const ApiError = require('../api-error');
const config = require('../config');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return next(new ApiError(401, 'Yêu cầu đăng nhập'));

  jwt.verify(token, config.jwt.secret, (err, user) => {
    if (err) {
      return next(new ApiError(403, 'Token không hợp lệ hoặc đã hết hạn'));
    }

    // u{ id, role }
    req.user = user;
    next();
  });
};

const isStaff = (req, res, next) => {
  if (req.user && (req.user.role === 'staff' || req.user.role === 'admin')) {
    next();
  } else {
    return next(new ApiError(403, 'Quyền truy cập bị từ chối (Yêu cầu quyền Staff)'));
  }
};

module.exports = { verifyToken, isStaff };
