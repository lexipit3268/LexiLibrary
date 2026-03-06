const MongoDB = require('../utils/mongodb.util');
const CartService = require('../services/cart.service');
const ApiError = require('../api-error');
const { StatusCodes } = require('http-status-codes');

exports.findAll = async (req, res, next) => {
  try {
    const cartService = new CartService(MongoDB.client);
    if (!req.body?.maDocGia) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'maDocGia cannot be empty'));
    }
    const maDocGia = req.body.maDocGia;
    const documents = await cartService.getCart(maDocGia);
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred while retrieving carts'),
    );
  }
};

exports.create = async (req, res, next) => {
  if (!req.body?.maSach) {
    return next(new ApiError(StatusCodes.BAD_REQUEST, 'maSach cannot be empty'));
  } else if (!req.body?.maDocGia) {
    return next(new ApiError(StatusCodes.BAD_REQUEST, 'maDocGia cannot be empty'));
  }

  try {
    const cartService = new CartService(MongoDB.client);
    const document = await cartService.addToCart(req.body);
    return res.send(req.body);
  } catch (error) {
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'An error occurred while adding to cart: ' + error,
      ),
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const cartService = new CartService(MongoDB.client);
    const result = await cartService.deleteItem(req.params.id);
    if (result.deletedCount === 0) {
      return next(new ApiError(StatusCodes.NOT_FOUND, 'Item not found'));
    }
    return res.send({ message: 'Item deleted successfully' });
  } catch (error) {
    return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error deleting item'));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const maDocGia = req.body.maDocGia;
    if (!maDocGia) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'maDocGia cannot be empty'));
    }
    const cartService = new CartService(MongoDB.client);
    await cartService.clearCart(maDocGia);
    return res.send({ message: 'Cart cleared successfully' });
  } catch (error) {
    return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error clearing cart'));
  }
};
