const router = require('express').Router();
const {
  getUsers,
  getMe,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  validateGetUserById,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../middlewares/validation');

/** получить всех пользователей */
router.get('/', getUsers);

/** получить информацию о пользователе */
router.get('/me', getMe);

/** получить пользователя по ID */
router.get('/:userId', validateGetUserById, getUserById);

/** обновить данные пользователя */
router.patch('/me', validateUpdateUser, updateUser);

/** обновить аватар пользователя */
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
