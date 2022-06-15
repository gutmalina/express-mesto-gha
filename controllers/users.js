const User = require('../models/user');

/**получить всех пользователей */
module.exports.getUsers=(req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

/**получить пользователя пов ID */
module.exports.getUserById= (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

/** создать пользователя */
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

/** обновить данные пользователя */
module.exports.updateUser = (req, res)=>{
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

/** обновить аватар пользователя */
module.exports.updateAvatar = (req, res)=>{
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};
