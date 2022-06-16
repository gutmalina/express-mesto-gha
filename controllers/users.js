const User = require('../models/user');

/**получить всех пользователей */
module.exports.getUsers=(req, res) => {
  User.find({})
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(400).send({ message: 'Ошибка сервера' }));
};

/**получить пользователя по ID */
module.exports.getUserById= (req, res) => {
  User.findById(req.params.userId)
    .then((user)=>{
      if(!user) {
        res.status(404).send('Пользователь по указанному id не найден')
        return
      }
      res.status(200).send({ data: user });
      }
    )
    .catch(err => res.status(400).send({ message: 'Ошибка сервера' }));
};

/** создать пользователя */
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user)=>{res.status(200).send({ data: user });})
    .catch(err => res.status(400).send({ message: 'Ошибка сервера' }));
};

/** обновить данные пользователя */
module.exports.updateUser = (req, res)=>{
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, {new: true, runValidators: true})
    .then((user)=>{
      if(!user) {
        res.status(404).send('Пользователь по указанному id не найден')
        return
      }
      res.status(200).send({ data: user });
      }
    )
    .catch(err => res.status(400).send({ message: 'Ошибка сервера' }));
};

/** обновить аватар пользователя */
module.exports.updateAvatar = (req, res)=>{
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if(!user) {
        res.status(404).send('Пользователь по указанному id не найден')
        return
      }
      res.status(200).send({ data: user });
      }
    )
    .catch(err => res.status(400).send({ message: 'Ошибка сервера' }));
};
