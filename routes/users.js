const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const URL_REGEX = require('../utils/constants');
const {
  createUser,
  login,
  getMe,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

/** создать пользователя */
router.post('/signup', createUser);

/** аутентификация - вход по email и паролю  */
router.post('/signin', login);

/** получение информации о пользователе */
router.get('/me', getMe);

/** получить всех пользователей */
router.get('/', getUsers);

/** получить пользователя по ID */
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
}), getUserById);

/** обновить данные пользователя */
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

/** обновить аватар пользователя */
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(RegExp(URL_REGEX)),
  }),
}), updateAvatar);

module.exports = router;
