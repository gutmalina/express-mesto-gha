const { celebrate, Joi } = require('celebrate');

// const REGEX_LINK = require('../utils/constants');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    // avatar: Joi.string().pattern((REGEX_LINK)),
    email: Joi.string().required().email(),
    password: Joi.string().required().length(10),
  }),
});

module.exports = validateCreateUser;
