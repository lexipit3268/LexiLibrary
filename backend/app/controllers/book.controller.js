const MongoDB = require('../utils/mongodb.util');
const BookService = require('../services/book.service');
const ApiError = require('../api-error');
const { StatusCodes } = require('http-status-codes');
const CloudinaryUtil = require('../utils/cloudinary.util');
exports.findAll = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);

    const filter = {};
    if (req.query.q) {
      filter.tenSach = { $regex: req.query.q, $options: 'i' };
    }

    if (req.query.category) {
      filter.maTheLoai = req.query.category;
    }

    if (req.query.publisher) {
      filter.maNXB = req.query.publisher;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.donGia = {};

      if (req.query.minPrice) {
        filter.donGia.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        filter.donGia.$lte = Number(req.query.maxPrice);
      }
    }

    let sortOption = {};

    if (req.query.sort === 'price_asc') {
      sortOption.donGia = 1;
    }

    if (req.query.sort === 'price_desc') {
      sortOption.donGia = -1;
    }

    if (req.query.sort === 'oldest') {
      sortOption.namXuatBan = 1;
    }

    if (req.query.sort === 'latest') {
      sortOption.namXuatBan = -1;
    }

    const documents = await bookService.find(filter, sortOption);

    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred while retrieving books'),
    );
  }
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

exports.uploadCover = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'Image cannot be empty'));
    }

    const coverUrl = req.file.path;
    const publicId = req.file.filename;

    return res.status(StatusCodes.OK).json({
      message: 'Tải ảnh bìa thành công',
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

exports.deleteAll = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
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
    const book = await bookService.findById(req.params.id);
    if (!book)
      return next(new ApiError(StatusCodes.NOT_FOUND, `Not found book with id = ${req.params.id}`));

    const newImgId = req.body.publicImgId;
    const oldImgId = book.publicImgId;
    console.log(book);

    if (newImgId && oldImgId && newImgId !== oldImgId) {
      await CloudinaryUtil.deleteImage(oldImgId);
    }
    const result = await bookService.update(req.params.id, req.body);
    return res.send(result);
  } catch (error) {
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
    return res.send({ message: `Deleted ${result.deletedCount} books` });
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `An error while deleting book with id = ${req.params.id}`,
      ),
    );
  }
};
