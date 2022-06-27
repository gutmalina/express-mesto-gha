const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { NOT_FOUND_ERROR } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** роутеры пользователей и карточек */
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));
app.use('/', require('./routes/users'));

/** обработка несуществующих роутов */
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена' });
});

app.use(errors());

/** мидлвэр ошибок */
app.use(error);

/** подключение к mongo и серверу */
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  app.listen(PORT);
}

main();
