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

exports.findOne = async (req, res, next) => {
  try {
    const publisherService = new PublisherService(MongoDB.client);
    const document = await publisherService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(StatusCodes.NOT_FOUND, 'Publisher not found'));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error occurred while retrieving publishers with id = ${req.params.id}`,
      ),
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, 'Data to update can not be empty'));
  }
  try {
    const publisherService = new PublisherService(MongoDB.client);
    const id = req.params.id;
    const payload = req.body;
    if (!id || !payload)
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'Id or payload cannot be empty'));
    const document = await publisherService.update(id, payload);
    if (!document) {
      return next(new ApiError(StatusCodes.NOT_FOUND, 'Publisher not found'));
    }

    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error occurred while updating publishers with id = ${req.params.id}`,
      ),
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const publisherService = new PublisherService(MongoDB.client);
    const result = await publisherService.delete(req.params.id);
    if (!result)
      return next(
        new ApiError(StatusCodes.NOT_FOUND, `Cannot delete publisher id = ${req.params.id}`),
      );
    return res.send(result);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error occurred while deleting publishers with id = ${req.params.id}`,
      ),
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const publisherService = new PublisherService(MongoDB.client);
    const documents = await publisherService.deleteAll();
    return res.send({
      message: `${documents.deletedCount} publishers were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occurred while removing all publishers',
      ),
    );
  }
};
