const { StatusCodes } = require('http-status-codes');
const { CustomApiError } = require('../errors');

const generalErrorHandleMiddleware = (err, req, res, next) => {
  console.log(err);
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong please try again later',
  };
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  if (err.name === 'ValidationError') {
    customError.msg = 'Please note cannot be empty';
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === 'CastError') {
    customError.msg = `Please your ${err.value} is incorrect`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  // checks for empty input fields

  return res.status(customError.statusCode).json({ msg: customError.msg });
  // return res.status(customError.statusCode).json({ err });
};

module.exports = generalErrorHandleMiddleware;
