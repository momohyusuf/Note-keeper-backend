const BadRequestError = require('./badRequest');
const NotFoundError = require('./not-found');
const UnauthorizedError = require('./unauthorized');
const CustomApiError = require('./customApiError');

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  CustomApiError,
};
