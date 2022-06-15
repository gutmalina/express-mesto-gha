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
    //const user = await User.findById('62a8bab412020f86156e05ae');
    if (!user) {
      res.status(404).send('Пользователь с id не найден');
    }
    res.status(200).send({ data: user });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка сервера' })
  }

};

/** создать пользователя */
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Ошибка сервера' }));
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
