const express = require('express');
const mongoose = require('mongoose');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const owner = require('./middlewares/owner');
const { NOT_FOUND_ERROR } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** временный мидлвэр - ID автора карточки */
app.use(owner);

/** роутеры пользователей и карточек */
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

/** обработка несуществующих роутов */
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена' });
});

app.post('/signin', login);
app.post('/signup', createUser);

/** авторизация */
app.use(auth);

/** подключение к mongo и серверу */
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  app.listen(PORT);
}

main();
