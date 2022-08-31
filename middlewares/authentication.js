const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid Credentials' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid Credentials' });
  }
};

module.exports = authenticateUser;
