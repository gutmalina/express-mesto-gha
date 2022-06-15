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
module.exports.updateUser = async (req, res)=>{
  const { name, about } = req.body;
  const userId = req.user._id;
  try{
    const user = await User.findByIdAndUpdate(userId, { name, about }, {new: true, runValidators: true})
    if (!user) {
      res.status(404).send('Пользователь по указанному id не найден');
    }
    res.status(200).send({ data: user });
  }catch(error){
    res.status(500).send({ message: 'Ошибка сервера' })
  }
};

/** обновить аватар пользователя */
module.exports.updateAvatar = (req, res)=>{
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if(!user) {
        res.status(404).send('Пользователь по указанному id не найден')
      }
      res.status(200).send({ data: user });
      }
    )
    .catch(err => res.status(500).send({ message: 'Ошибка сервера' }));
};
