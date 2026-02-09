const MongoDB = require('../utils/mongodb.util');
const CategoryService = require('../services/category.service');
const ApiError = require('../api-error');
const { StatusCodes } = require('http-status-codes');

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const categoryService = new CategoryService(MongoDB.client);
    documents = await categoryService.find({});
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occurred while retrieving categories',
      ),
    );
  }
  return res.send(documents);
};

exports.create = async (req, res, next) => {
  if (!req.body?.tenTheLoai) {
    return next(new ApiError(StatusCodes.BAD_REQUEST, 'tenTheLoai cannot be empty'));
  }
  try {
    const categoryService = new CategoryService(MongoDB.client);
    const document = await categoryService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occurred while creating the category',
      ),
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  return res.send({ message: 'deleteAll method' });
};

exports.findOne = async (req, res, next) => {
  return res.send({ message: 'findOne method. ID: ' + req.params.id });
};

exports.update = async (req, res, next) => {
  return res.send({ message: 'update method' });
};

exports.delete = async (req, res, next) => {
  return res.send({ message: 'delete method' });
};
