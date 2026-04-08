const MongoDB = require('../utils/mongodb.util');
const FavoriteService = require('../services/favorite.service');
const ApiError = require('../api-error');
const { StatusCodes } = require('http-status-codes');

exports.findAll = async (req, res, next) => {
  try {
    const favoriteService = new FavoriteService(MongoDB.client);
    const { id: maDocGia } = req.user;

    const result = await favoriteService.find({ maDocGia });
    if (!result) throw new error();
    return res.send(result);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occur while retrieving favorites: ' + error,
      ),
    );
  }
};

exports.create = async (req, res, next) => {
  try {
    const favoriteService = new FavoriteService(MongoDB.client);
    if (!req.body.maSach) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'maSach cannot be empty'));
    }

    const { id: maDocGia } = req.user;
    const result = await favoriteService.create({ maDocGia: maDocGia, maSach: req.body.maSach });
    if (!result) throw new error();
    return res.send(result);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occur while creating favorite: ' + error,
      ),
    );
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const favoriteService = new FavoriteService(MongoDB.client);

    const result = await favoriteService.delete(req.params.id);

    if (!result) throw new error();
    if (result.deletedCount === 0)
      return next(
        new ApiError(StatusCodes.NOT_FOUND, 'Not found favorite with id = ' + req.params.id),
      );

    return res.send(result);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occur while deleteing favorite: ' + error,
      ),
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const favoriteService = new FavoriteService(MongoDB.client);
    const { id: maDocGia } = req.user;
    const result = await favoriteService.deleteAll(maDocGia);

    if (!result) throw new error();
    return res.send(result);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occur while deleteing favorite: ' + error,
      ),
    );
  }
};
