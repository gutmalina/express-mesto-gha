const router = require('express').Router();
const {
  createUser,
  login,
  getMe,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  validateUpdateAvatar,
} = require('../controllers/users');
const {
  validateCreateUser,
  validateLogin,
  validateGetUserById,
  validateUpdateUser,
} = require('../middlewares/validation');

/** добавление пользователя */
router.post('/signup', validateCreateUser, createUser);

/** аутентификация - вход по email и паролю  */
router.post('/signin', validateLogin, login);

/** получение информации о пользователе */
router.get('/me', getMe);

/** получить всех пользователей */
router.get('/', getUsers);

/** получить пользователя по ID */
router.get('/:userId', validateGetUserById, getUserById);

/** обновить данные пользователя */
router.patch('/me', validateUpdateUser, updateUser);

/** обновить аватар пользователя */
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
