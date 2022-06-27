const { celebrate, Joi } = require('celebrate');

// const REGEX_LINK = require('../utils/constants');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    // avatar: Joi.string().pattern((REGEX_LINK)),
    email: Joi.string().required().email(),
    password: Joi.string().required().length(5),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().length(5),
  }),
});

const validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateGetUserById,
  validateUpdateUser,
  validateUpdateAvatar,
};
