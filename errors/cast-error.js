const CAST_ERROR = require('../utils/constants');

class CastError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CAST_ERROR;
  }
}

module.exports = CastError;
