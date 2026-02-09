const MongoDB = require('../utils/mongodb.util');
const PublisherService = require('../services/publisher.service');
const ApiError = require('../api-error');
const { StatusCodes } = require('http-status-codes');

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const publisherService = new PublisherService(MongoDB.client);
    documents = await publisherService.find({});
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occurred while retrieving Publishers',
      ),
    );
  }
  return res.send(documents);
};

exports.create = async (req, res, next) => {
  if (!req.body?.tenNXB) {
    return next(new ApiError(StatusCodes.BAD_REQUEST, 'tenNXB cannot be empty'));
  }
  try {
    const publisherService = new PublisherService(MongoDB.client);
    const document = await publisherService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occurred while creating the publisher',
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
