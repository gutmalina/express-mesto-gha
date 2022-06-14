const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');

/** роутеры пользователей и карточек */
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

// const bodyParser = require('body-parser');//сборка пакетов мидлвэров
// const { json } = require('body-parser');
// app.use(bodyParser, json())

// //test
// app.use((req, res, next)=>{
//   console.log(req.method, req.path);
//   next();
// })

// app.use(express.json())

// app.get('/', (req, res)=>{
//   res.send('TEST express get')
// })

// app.post('/', (req, res)=>{
//   res.send(req.body)
// })




/** подключение к mongo и серверу */
async function main(){
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, ()=>{
    console.log('TEST express');
  })
}

main();
