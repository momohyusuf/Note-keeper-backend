const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const User = require('../models/user-profile-model');
const { UnauthorizedError, BadRequestError } = require('../errors');

// register controller
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const { firstName, lastName } = user;
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ firstName, lastName, token });
};
// ******************************

// Login in controller
const login = async (req, res) => {
  const { email, password } = req.body;

  // checks if the inputField is empty
  if (!email || !password) {
    throw new BadRequestError('please provide email and password');
  }
  //************************** */

  // finds the user and compares the password on our database
  const user = await User.findOne({ email });
  const comparePassword = await bcrypt.compare(password, user.password);
  // *****************************
  if (!comparePassword) {
    throw new UnauthorizedError('Please check your password');
  }
  const { firstName, lastName } = user;
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ firstName, lastName, token });
};

module.exports = {
  login,
  register,
};
