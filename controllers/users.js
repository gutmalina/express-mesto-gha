const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  CAST_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
} = require('../utils/constants');

/** аутентификация - вход по email и паролю  */
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ message: 'Всё верно!' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

/** получение информации о пользователе */
module.exports.getMe = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному id не найден' });
      return;
    }
    res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(CAST_ERROR).send({ message: 'Введен некорректный id пользователя' });
      return;
    }
    res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
  }
};

/** получить всех пользователей */
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

/** получить пользователя по ID */
module.exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному id не найден' });
      return;
    }
    res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(CAST_ERROR).send({ message: 'Введен некорректный id пользователя' });
      return;
    }
    res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
  }
};

/** добавить пользователя */
module.exports.createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10);
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(CAST_ERROR).send({ message: 'Введены некорректные данные пользователя' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

/** обновить данные пользователя */
module.exports.updateUser = async (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    )
      .orFail(() => {
        const err = new Error('Пользователь по указанному id не найден');
        err.name = 'NotFoundError';
        throw err;
      });
    res.status(200).send({ data: { user } });
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному id не найден' });
      return;
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res.status(CAST_ERROR).send({ message: 'Введены некорректные данные пользователя' });
      return;
    }
    res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
  }
};

/** обновить аватар пользователя */
module.exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    )
      .orFail(() => {
        const err = new Error('Пользователь по указанному id не найден');
        err.name = 'NotFoundError';
        throw err;
      });
    res.status(200).send({ data: { user } });
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному id не найден' });
      return;
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res.status(CAST_ERROR).send({ message: 'Введены некорректные данные пользователя' });
      return;
    }
    res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
  }
};
