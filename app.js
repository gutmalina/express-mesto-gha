const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');//сборка пакетов мидлвэров
const { json } = require('body-parser');

// app.use(bodyParser, json())
app.use(express.json())

/** временный мидлвэр - ID автора карточки*/
app.use((req, res, next) => {
  req.user = {
    _id: '62a8bc1c12020f86156e05b0'
  };

  next();
});

/** роутеры пользователей и карточек */
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

// //test
// app.use((req, res, next)=>{
//   console.log(req.method, req.path);
//   next();
// })

// app.get('/', (req, res)=>{
//   res.send('TEST express get')
// })

// app.post('/', (req, res)=>{
//   res.send(req.body)
// })


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
