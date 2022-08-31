const { StatusCodes } = require('http-status-codes');
const CustomApiError = require('./customApiError');
class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
