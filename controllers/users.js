const bcrypt = require('bcryptjs');
const User = require('../models/user');
const CastError = require('../errors/cast-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const ConflictError = require('../errors/conflict-error');

const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;

/** добавить пользователя */
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  if (!email || !password) {
    next(new ForbiddenError('Не передан email или пароль'));
  }
  return bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => {
      User
        .create({
          email,
          password: hash,
          name,
          about,
          avatar,
        });
    })
    .then((user) => {
      res
        .status(201)
        .send({
          user: {
            email: user.email,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
          },
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные пользователя'));
      }
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Пользователь с указанным email уже существует'));
      }
      next();
    });
};

/** получить всех пользователей */
module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => {
      res
        .status(200)
        .send({ data: users });
    })
    .catch(next);
};

/** получение информации о пользователе */
module.exports.getMe = (req, res, next) => {
  const userId = req.user._id;
  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res
        .status(200)
        .send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Введен некорректный id пользователя'));
      }
      next();
    });
};

/** получить пользователя по ID */
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res
        .status(200)
        .send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Введен некорректный id пользователя'));
      }
      next();
    });
};

/** обновить данные пользователя */
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User
    .findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      const err = new Error('Пользователь по указанному id не найден');
      err.name = 'NotFoundError';
      throw err;
    })
    .then((user) => {
      res
        .status(200)
        .send({ data: { user } });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные пользователя'));
      }
      next();
    });
};

/** обновить аватар пользователя */
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User
    .findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      const err = new Error('Пользователь по указанному id не найден');
      err.name = 'NotFoundError';
      throw err;
    })
    .then((user) => {
      res
        .status(200)
        .send({ data: { user } });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные пользователя'));
      }
      next();
    });
};
