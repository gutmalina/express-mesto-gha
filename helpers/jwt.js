const jwt = require('jsonwebtoken');

const SECRET_KEY = 'some-secret-key';

/** создать токен */
const generateToken = (payload) => jwt.sign(
  payload,
  SECRET_KEY,
  { expiresIn: '7d' },
);

module.exports = { generateToken, SECRET_KEY };
