const User = require('../models/user');
const CastError = require('../errors/cast-error');
const NotFoundError = require('../errors/not-found-error');

/** добавить пользователя */
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  User
    .create({
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
      if (err.name === 'ValidationError') {
        next(new CastError('Введены некорректные данные пользователя'));
      }
      next();
    });
};

/** получить всех пользователей */
module.exports.getUsers = (req, res, next) => {
  User
    .find({})
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
    next();
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
    next();
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
    next();
  }
};
