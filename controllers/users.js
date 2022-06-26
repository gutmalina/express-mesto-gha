const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CastError = require('../errors/cast-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

/** создать пользователя */
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  if (!email || !password) {
    next(new CastError('Не передан email или пароль'));
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с указанным email уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new CastError('Введены некорректные данные пользователя'));
      }
      next(err);
    });
};

/** аутентификация - вход по email и паролю  */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new CastError('Не передан email или пароль'));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.send({ message: 'Всё верно!' });
      res.end();
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Введены некорректные данные пользователя'));
      }
      next(err);
    });
};

/** получение информации о пользователе */
module.exports.getMe = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному id не найден');
    }
    res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new CastError('Введен некорректный id пользователя'));
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
      throw new NotFoundError('Пользователь по указанному id не найден');
    }
    res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new CastError('Введен некорректный id пользователя'));
    }
    next(err);
  }
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
      next(new NotFoundError('Пользователь по указанному id не найден'));
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new CastError('Введены некорректные данные пользователя'));
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
      next(new NotFoundError('Пользователь по указанному id не найден'));
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new CastError('Введены некорректные данные пользователя'));
    }
    next(err);
  }
};
