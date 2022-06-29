const checkToken = require('../helpers/jwt');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-error');

/** авторизация */
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer', '');
  const payload = checkToken(token);
  User
    .findOne({ email: payload.email })
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Необходима авторизация'));
      }
      req.user = { id: user._id };
      res
        .status(200);
      next();
    })
    .catch(() => {
      next(new UnauthorizedError('Необходима авторизация'));
    });
};
