const User = require('../models/user');

/**получить всех пользователей */
module.exports.getUsers=(req, res) => {
  User.find({})
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({message: 'Ошибка сервера'}));
};

/**получить пользователя по ID */
module.exports.getUserById= async (req, res) => {
  const userId = req.params.userId;
  try{
    const user = await User.findById(userId)
    if(!user){
      res.status(404).send({message: 'Пользователь по указанному id не найден'});
      return
    }
    res.status(200).send({ data: user });
  }catch(err){
    if(err.name === "CastError"){
      res.status(400).send({message: 'Введен некорректный id пользователя'});
      return
    }else{
      res.status(500).send({message: 'Ошибка сервера'})
    }
  }
};

/** создать пользователя */
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user)=>{res.status(200).send({ data: user });})
    .catch(err => res.status(400).send({ message: 'Ошибка сервера' }));
};

/** обновить данные пользователя */
module.exports.updateUser = async (req, res)=>{
  const { name, about } = req.body;
  const userId = req.user._id;
  try{
    const user = await User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    if(!user && err.name === "CastError") {
      res.status(404).send({message: 'Пользователь по указанному id не найден'});
      return
    }
    res.status(200).send({ data: { name, about }});
  }catch(err){
    if(err.name === "ValidationError" || err.name === "CastError"){
      res.status(400).send({err, message: 'Введены некорректные данные пользователя'});
      return
    }else{
      res.status(500).send({message: 'Ошибка сервера'})
    }
  }
};

/** обновить аватар пользователя */
module.exports.updateAvatar = async (req, res)=>{
  const { avatar } = req.body;
  const userId = req.user._id;
  try{
    const user = await User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    if(!user) {
      res.status(404).send({message: 'Пользователь по указанному id не найден'});
      return
    }
    res.status(200).send({ data: user, message: "Данные обновлены" });
  }catch(err){
    if(err.name === "CastError"){
      res.status(400).send({message: 'Введен некорректный id пользователя'});
      return
    }else{
      res.status(500).send({message: 'Ошибка сервера'})
    }
  }
};
