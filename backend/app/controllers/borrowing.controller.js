const MongoDB = require('../utils/mongodb.util');
const BorrowingService = require('../services/borrowing.service');
const ApiError = require('../api-error');
const { StatusCodes } = require('http-status-codes');

exports.findAll = async (req, res, next) => {
  try {
    const borrowingService = new BorrowingService(MongoDB.client);
    let filter = {};
    if (req.query.maDocGia) {
      filter.maDocGia = req.query.maDocGia;
    }

    const documents = await borrowingService.find(filter);
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occurred while retrieving all borrowing list',
      ),
    );
  }
};

exports.create = async (req, res, next) => {
  try {
    const borrowingService = new BorrowingService(MongoDB.client);
    const result = await borrowingService.create(req.body);
    return res.status(StatusCodes.CREATED).send(result);
  } catch (error) {
    if (error.message === 'LIMIT_EXCEEDED') {
      return next(
        new ApiError(StatusCodes.BAD_REQUEST, 'You have reached the borrowing limit of 5 books.'),
      );
    }
    if (error.message === 'OUT_OF_STOCK') {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'This book is out of stock'));
    }

    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occurred while creating a borrowing' + error.message,
      ),
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const borrowingService = new BorrowingService(MongoDB.client);
    const result = await borrowingService.deleteAll();
    if (!result) throw new ApiError(StatusCodes.CONFLICT, 'Cannot delete all');
    return res.send({ message: `Deleted ${result.deletedCount} borrowings` });
  } catch (error) {
    return next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'An error while deleting all borrowings'),
    );
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const borrowingService = new BorrowingService(MongoDB.client);
    const document = await borrowingService.find({ maPhieu: req.params.id });
    if (document.length === 0)
      return next(
        new ApiError(StatusCodes.NOT_FOUND, `Not found borrowing with id = ${req.params.id}`),
      );
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error while retrieving borrowing with id = ${req.params.id} `,
      ),
    );
  }
};

exports.update = async (req, res, next) => {
  try {
    const borrowingService = new BorrowingService(MongoDB.client);
    if (!req.params.id)
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'maPhieu cannot be empty'));
    const maPhieu = req.params.id;
    const payload = req.body;
    const result = await borrowingService.update(maPhieu, payload);
    return res.send(result);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error while updating borrowing with id = ${req.params.id}` + error,
      ),
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    if (!req.params.id)
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'maPhieu cannot be empty'));
    const borrowingService = new BorrowingService(MongoDB.client);
    const result = await borrowingService.deleteOne(req.params.id);
    if (!result)
      return next(
        new ApiError(StatusCodes.NOT_FOUND, `Not found borrowing with id = ${req.params.id}`),
      );
    return res.send({ message: `Deleted ${result.deletedCount} borrowing` });
  } catch (error) {
    new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `An error while deleting borrowing with id = ${req.params.id}`,
    );
  }
};
