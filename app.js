const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const owner = require('./middlewares/owner');
const { NOT_FOUND_ERROR } = require('./utils/constants')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

/** временный мидлвэр - ID автора карточки*/
app.use(owner);

/** роутеры пользователей и карточек */
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));
app.use('*', (req, res, next) => {
  res.status(NOT_FOUND_ERROR).send("Страница не найдена")
})

/** подключение к mongo и серверу */
async function main(){
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
  });

  app.listen(PORT, ()=>{
    console.log('TEST express');
  })
}

main();
