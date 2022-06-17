const Card = require('../models/card');

/**получить все карточки */
module.exports.getCards=(req, res) => {
  Card.find({})
    .then(card => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({message: 'Ошибка сервера'}));
};

/** создать карточку */
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({message: 'Ошибка сервера'}));
};

/** удалить карточку по ID */
module.exports.deleteCard = (req, res)=>{
  const userId = req.user._id;
  try{
    const card = Card.findByIdAndRemove(req.params.CardId)
    if(!card) {
      res.status(404).send({message: 'Карточка с указанным id не найдена'})
      return
    }
    if(String(userId) !== String(card.owner._id)){
      res.status(403).send({message: 'Карточка не может быть удалена'})
      return
    }
    res.status(200).send({ data: card, message: "Карточка удалена" });
  }catch(err){
    res.status(500).send({message: 'Ошибка сервера'})
  }
};

/** поставить лайк карточке */
module.exports.likeCard = (req, res)=>{
  try{
    const card = Card.findByIdAndUpdate(  req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    if(!card){
      res.status(404).send({message: 'Карточка с указанным id не найдена'})
      return
    }
    res.status(200).send({ data: card })
  }catch(err){
    res.status(500).send({message: 'Ошибка сервера'})
  }
};

/** удалить лайк у карточки */
module.exports.dislikeCard = (req, res)=>{
  try{
    const card = Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    if(!card){
      res.status(404).send({message: 'Карточка с указанным id не найдена'})
      return
    }
    res.status(200).send({ data: card })
  }catch(err){
    res.status(500).send({message: 'Ошибка сервера'})
  }
};
