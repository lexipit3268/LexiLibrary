const MongoDB = require('../utils/mongodb.util');
const BookService = require('../services/book.service');
const ApiError = require('../api-error');
const { StatusCodes } = require('http-status-codes');

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const bookService = new BookService(MongoDB.client);
    documents = await bookService.find({});
  } catch (error) {
    return next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred while retrieving books'),
    );
  }
  return res.send(documents);
};

exports.create = async (req, res, next) => {
  if (!req.body?.maSach) {
    return next(new ApiError(StatusCodes.BAD_REQUEST, 'maSach cannot be empty'));
  } else if (!req.body?.tenSach) {
    return next(new ApiError(StatusCodes.BAD_REQUEST, 'tenSach cannot be empty'));
  }

  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred while creating the book'),
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const bookService = new CategoryService(MongoDB.client);
    const result = await bookService.deleteAll();
    if (!result) throw new ApiError(StatusCodes.CONFLICT, 'Cannot delete all');
    return res.send({ message: `Deleted ${result.deletedCount} books` });
  } catch (error) {
    return next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'An error while deleting all books'),
    );
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.findById(req.params.id);
    if (!document)
      return next(new ApiError(StatusCodes.NOT_FOUND, `Not found book with id = ${req.params.id}`));
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error while retrieving book with id = ${req.params.id} `,
      ),
    );
  }
};

exports.update = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.update(req.params.id, req.body);
    if (!document)
      return next(new ApiError(StatusCodes.NOT_FOUND, `Not found book with id = ${req.params.id}`));
    return res.send(document);
  } catch (error) {
    f;
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error while updating book with id = ${req.params.id}`,
      ),
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const result = await bookService.delete(req.params.id);
    if (!result)
      return next(new ApiError(StatusCodes.NOT_FOUND, `Not found book with id = ${req.params.id}`));
    return res.send({ message: `Deleted ${result.deletedCount} categories` });
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error while deleting book with id = ${req.params.id}`,
      ),
    );
  }
};
