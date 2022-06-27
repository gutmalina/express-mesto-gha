const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  CAST_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  SERVER_ERROR,
} = require('../utils/constants');
const generateToken = require('../helpers/jwt');

const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;

/** создать пользователя */
module.exports.createUser = (req, res) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  if (!email || !password) {
    return res.status(FORBIDDEN_ERROR).send({ message: 'Не передан email или пароль' });
  }
  return bcrypt
    .hash(password, SALT_ROUNDS)
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
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        return res.status(CONFLICT_ERROR).send({ message: 'Пользователь с указанным email уже существует' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

/** аутентификация - вход по email и паролю  */
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(CAST_ERROR).send({ message: 'Не передан email или пароль' });
  }
  return User
    .findOne({ email })
    .then((user) => {
      if (!user) {
        const err = new Error('Некорректная почта или пароль');
        err.statusCode = FORBIDDEN_ERROR;
        throw err;
      }
      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        const err = new Error('Некорректная почта или пароль');
        err.statusCode = FORBIDDEN_ERROR;
        throw err;
      }
      return generateToken({ email: user.email });
    })
    .then((token) => {
      res.send({ token });
    })
    .catch((err) => {
      if (err.statusCode === 'CastError') {
        return res.status(CAST_ERROR).send({ message: err.message });
      }
      if (err.statusCode === FORBIDDEN_ERROR) {
        return res.status(FORBIDDEN_ERROR).send({ message: err.message });
      }
      return res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

/** получение информации о пользователе */
module.exports.getMe = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному id не найден' });
    }
    return res.status(200).send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(CAST_ERROR).send({ message: 'Введен некорректный id пользователя' });
    }
    return res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
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
  const { name, about, avatar } = req.body;
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
