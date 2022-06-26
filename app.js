const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { NOT_FOUND_ERROR } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** роутеры пользователей и карточек */
app.use('/signin', require('./routes/users'));
app.use('/signup', require('./routes/users'));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

/** обработка несуществующих роутов */
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена' });
});

/** авторизация */
app.use(auth);

app.use(errors());

/** мидлвэр ошибок */
app.use(error);

/** подключение к mongo и серверу */
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  app.listen(PORT);
}

main();
