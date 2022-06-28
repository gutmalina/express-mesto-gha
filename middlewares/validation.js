const { celebrate, Joi } = require('celebrate');

/** добавить пользователя */
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
});

/** получить пользователя по ID */
const validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
});

/** обновить данные пользователя */
const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

/** обновить аватар пользователя */
const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
});

module.exports = {
  validateCreateUser,
  validateGetUserById,
  validateUpdateUser,
  validateUpdateAvatar,
};
