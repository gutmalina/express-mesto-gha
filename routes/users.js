const router = require('express').Router();
const {
  createUser,
  login,
  getMe,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const validateUpdateUser = require('../middlewares/validation');

/** создать пользователя */
router.post('/signup', createUser);

/** аутентификация - вход по email и паролю  */
router.post('/signin', login);

/** получение информации о пользователе */
router.get('/me', getMe);

/** получить всех пользователей */
router.get('/', getUsers);

/** получить пользователя по ID */
router.get('/:userId', getUserById);

/** обновить данные пользователя */
router.patch('/me', validateUpdateUser, updateUser);

/** обновить аватар пользователя */
router.patch('/me/avatar', updateAvatar);

module.exports = router;
