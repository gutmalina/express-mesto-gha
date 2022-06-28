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
    userId: Joi.string().length(24).hex(),
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

/** создать карточку */
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});

/** удалить карточку по ID */
const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

/** поставить лайк карточке */
const validateLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

/** удалить лайк у карточки */
const validateDislikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  validateCreateUser,
  validateGetUserById,
  validateUpdateUser,
  validateUpdateAvatar,
  validateCreateCard,
  validateDeleteCard,
  validateLikeCard,
  validateDislikeCard,
};
