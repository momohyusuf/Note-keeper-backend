const { StatusCodes } = require('http-status-codes');
const CustomApiError = require('./customApiError');

class Unauthorized extends CustomApiError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
