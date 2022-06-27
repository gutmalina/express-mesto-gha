const checkToken = require('../helpers/jwt');
const User = require('../models/user');
const { SERVER_ERROR, UNAUTHORIZED_ERROR } = require('../utils/constants');

/** авторизация */
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(UNAUTHORIZED_ERROR).send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer', '');
  try {
    const payload = checkToken(token);
    return User
      .findOne({ email: payload.email })
      .then((user) => {
        if (!user) {
          return res.status(UNAUTHORIZED_ERROR).send({ message: 'Необходима авторизация' });
        }
        req.user = { id: user._id };
        next();
      })
      .catch(() => res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
  } catch (err) {
    return res.status(UNAUTHORIZED_ERROR).send({ message: 'Необходима авторизация' });
  }
};
