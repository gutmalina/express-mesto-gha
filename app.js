const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');//сборка пакетов мидлвэров
const { json } = require('body-parser');
const owner = require('./middlewares/owner')

//app.use(bodyParser, json())
app.use(express.json())

/** временный мидлвэр - ID автора карточки*/
app.use(owner);

/** роутеры пользователей и карточек */
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

/** подключение к mongo и серверу */
async function main(){
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false
  });

  app.listen(PORT, ()=>{
    console.log('TEST express');
  })
}

main();
