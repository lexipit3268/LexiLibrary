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
  try {
    const categoryService = new CategoryService(MongoDB.client);
    const result = await categoryService.deleteAll();
    if (!result) throw new ApiError(StatusCodes.CONFLICT, 'Cannot delete all');
    return res.send({ message: `Deleted ${result.deletedCount} categories` });
  } catch (error) {
    return next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'An error while deleting all categories'),
    );
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const categoryService = new CategoryService(MongoDB.client);
    const document = await categoryService.findById(req.params.id);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error while retrieving category with id = ${req.params.id}`,
      ),
    );
  }
};

exports.update = async (req, res, next) => {
  try {
    const categoryService = new CategoryService(MongoDB.client);
    const document = await categoryService.update(req.params.id, req.body);
    if (!document)
      return next(
        new ApiError(StatusCodes.NOT_FOUND, `Not found category with id = ${req.params.id}`),
      );
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error while updating category with id = ${req.params.id}`,
      ),
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const categoryService = new CategoryService(MongoDB.client);
    const result = await categoryService.delete(req.params.id);
    if (!result)
      return next(
        new ApiError(StatusCodes.NOT_FOUND, `Not found category with id = ${req.params.id}`),
      );
    return res.send({ message: `Deleted ${result.deletedCount} categories` });
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error while deleting category with id = ${req.params.id}`,
      ),
    );
  }
};
