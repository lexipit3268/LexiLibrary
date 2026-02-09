const MongoDB = require('../utils/mongodb.util');
const StaffService = require('../services/staff.service');
const ApiError = require('../api-error');
const { StatusCodes } = require('http-status-codes');

exports.findAll = async (req, res, next) => {
  return res.send({ message: 'findAll method' });
};

exports.create = async (req, res, next) => {
  return res.send({ message: 'create method' });
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

exports.login = async (req, res, next) => {
  return res.send({ mesage: 'staff login method' });
};
exports.getMe = async (req, res, next) => {
  return res.send({ mesage: 'staff getMe method' });
};
