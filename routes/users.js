const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  validateCreateUser,
  validateGetUserById,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../middlewares/validation');

/** добавить пользователя */
router.post('/', validateCreateUser, createUser);

/** получить всех пользователей */
router.get('/', getUsers);

/** получить пользователя по ID */
router.get('/:userId', validateGetUserById, getUserById);

/** обновить данные пользователя */
router.patch('/me', validateUpdateUser, updateUser);

/** обновить аватар пользователя */
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
