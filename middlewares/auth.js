const jwt = require('jsonwebtoken');
const UNAUTHORIZED_ERROR = require('../utils/constants');

/** авторизация */
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UNAUTHORIZED_ERROR('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UNAUTHORIZED_ERROR('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
