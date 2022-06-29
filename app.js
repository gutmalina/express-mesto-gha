const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');

const owner = require('./middlewares/owner');
const error = require('./middlewares/error');
const { NOT_FOUND_ERROR } = require('./utils/constants');
const createUser = require('./controllers/users');
const validateCreateUser = require('./middlewares/validation');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** временный мидлвэр - ID автора карточки */
app.use(owner);

/** роутеры регистрации и аутентификации */
app.post('/signup', validateCreateUser, createUser);

/** роутеры пользователей и карточек */
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

/** обработка несуществующих роутов */
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена' });
});

/** обработчик ошибок celebrate */
app.use(errors());

/** централизованный обработчик ошибок */
app.use(error);

/** подключение к mongo и серверу */
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  app.listen(PORT, () => {
  // eslint-disable-next-line no-console
    console.log(`Connect ${PORT}`);
  });
}

main();
