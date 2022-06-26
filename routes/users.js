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
router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().length(10),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required(),
  }),
}), createUser);

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().length(10),
  }),
}), login);

router.get('/me', getMe);

router.get('/', getUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(RegExp(URL_REGEX)),
  }),
}), updateAvatar);

module.exports = router;
