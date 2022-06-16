const Card = require('../models/card');

/**получить все карточки */
module.exports.getCards=(req, res) => {
  Card.find({})
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(400).send({ message: 'Ошибка сервера' }));
};

/** создать карточку */
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(400).send({ message: 'Ошибка сервера' }));
};

/** удалить карточку по ID */
module.exports.deleteCard = (req, res)=>{
  const userId = req.user._id;
  Card.findByIdAndRemove(req.params.CardId)
    .then((card)=>{
      if(!card) {
        res.status(404).send('Карточка с указанным id не найдена')
        return
      }
      if(String(userId) !== String(card.owner._id)){
        res.status(403).send('Карточка не может быть удалена')
        return
      }
      res.status(200).send({ data: card, message: "Карточка удалена" });
    })
    .catch(err => res.status(400).send({ message: 'Ошибка сервера' }));
};

/** поставить лайк карточке */
module.exports.likeCard = (req, res)=>{
  Card.findByIdAndUpdate(  req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) =>{
      if(!card){
        res.status(404).send('Карточка с указанным id не найдена')
        return
      }
      res.status(200).send({ data: card })
    })
    .catch(err => res.status(400).send({ message: 'Ошибка сервера' }));
};

/** удалить лайк у карточки */
module.exports.dislikeCard = (req, res)=>{
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if(!card){
        res.status(404).send('Карточка с указанным id не найдена')
        return
      }
      res.status(200).send({ data: card })
    })
    .catch(err => res.status(400).send({ message: 'Ошибка сервера' }));
};
