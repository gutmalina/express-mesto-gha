const User = require('../models/user');

/**получить всех пользователей */
module.exports.getUsers=(req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Ошибка сервера' }));
};

/**получить пользователя по ID */
module.exports.getUserById= async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
      if (!user) {
      res.status(404).send('Пользователь по указанному id не найден');
    }
    res.status(200).send({ data: user });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка сервера' })
  }
};

/** создать пользователя */
module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try{
    const user = await User.create({ name, about, avatar })
    res.status(200).send({ data: user });
  } catch (error){
    res.status(500).send({ message: 'Ошибка сервера' })
  }
};

/** обновить данные пользователя */
module.exports.updateUser = (req, res)=>{
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Ошибка сервера' }));
};

/** обновить аватар пользователя */
module.exports.updateAvatar = (req, res)=>{
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Ошибка сервера' }));
};
