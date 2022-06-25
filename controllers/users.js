const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  CAST_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
} = require('../utils/constants');

/** аутентификация - вход по email и паролю  */
module.exports.login = (req, res, next) => {
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
module.exports.getMe = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NOT_FOUND_ERROR('Пользователь по указанному id не найден');
    }
    res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new CAST_ERROR('Введен некорректный id пользователя'));
    }
    next(err);
  }
};

/** получить всех пользователей */
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(next);
};

/** получить пользователя по ID */
module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NOT_FOUND_ERROR('Пользователь по указанному id не найден');
    }
    res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new CAST_ERROR('Введен некорректный id пользователя'));
    }
    next(err);
  }
};

/** добавить пользователя */
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(password, 10);
  User.create({
    email,
    password,
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new CONFLICT_ERROR('Пользователь с указанным email уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new CAST_ERROR('Введены некорректные данные пользователя'));
      }
      next(err);
    });
};

/** обновить данные пользователя */
module.exports.updateUser = async (req, res, next) => {
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
      next(new NOT_FOUND_ERROR('Пользователь по указанному id не найден'));
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new CAST_ERROR('Введены некорректные данные пользователя'));
    }
    next(err);
  }
};

/** обновить аватар пользователя */
module.exports.updateAvatar = async (req, res, next) => {
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
      next(new NOT_FOUND_ERROR('Пользователь по указанному id не найден'));
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new CAST_ERROR('Введены некорректные данные пользователя'));
    }
    next(err);
  }
};
