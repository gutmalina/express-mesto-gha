const Card = require('../models/card');

/**получить все карточки */
module.exports.getCards=(req, res) => {
  Card.find({})
    .then(card => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({message: 'Ошибка сервера'}));
};

/** создать карточку */
module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try{
    const card = await Card.create({ name, link, owner })
    res.status(200).send({ data: card })
  }catch(err){
    if(err.name === "Not Found"){
      res.status(404).send({message: 'Карточка с указанным id не найдена'})
      return
    }
    if(err.name === "ValidationError" || err.name === "CastError"){
      res.status(400).send({message: 'Введены некорректные данные'});
      return
    }
    res.status(500).send({message: 'Ошибка сервера'})
  }
};

/** удалить карточку по ID */
module.exports.deleteCard = async (req, res)=>{
  const cardId = req.params.cardId;
  const userId = req.user._id;
  try{
    const card = await Card.findByIdAndRemove(cardId)
    res.status(200).send({ data: card, message: "Карточка удалена" });
  }catch(err){
    if(err.name === "Not Found"){
      res.status(404).send({message: 'Карточка с указанным id не найдена'})
      return
    }
    if(err.name === "ValidationError" || err.name === "CastError"){
      res.status(400).send({message: 'Введены некорректные данные'});
      return
    }
    if(String(userId) !== String(card.owner._id)){
      res.status(403).send({message: 'Карточка не может быть удалена'})
      return
    }
    res.status(500).send({message: 'Ошибка сервера'})
  }
};

/** поставить лайк карточке */
module.exports.likeCard = (req, res)=>{
  //const cardId = req.params.cardId;
  const cardId = "6zac920b4e00b91d025a5af6";
  const userId = req.user._id;
  Card.findByIdAndUpdate(  cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card)=>{
      if(!card){
        res.status(404).send({message: 'Карточка с указанным id не найдена'})
        return
      }
      res.status(200).send({ data: card })
    })
    .catch((err)=>{
      if(err.name === "ValidationError" || err.name === "CastError"){
        res.status(400).send({ message: 'Введены некорректные данные'});
        return
      }
      res.status(500).send({message: 'Ошибка сервера'})
    })
};

/** удалить лайк у карточки */
module.exports.dislikeCard = async (req, res)=>{
  const cardId = "62ab1e0e9eb04686deff560c";
  //const cardId = req.params.cardId;
  const userId = req.user._id;
  try{
    const card = await Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    res.status(200).send({ data: card })
  }catch(err){
    if(err.name === "Not Found"){
      res.status(404).send({message: 'Карточка с указанным id не найдена'})
      return
    }
    if(err.name === "ValidationError" || err.name === "CastError"){
      res.status(400).send({err, message: 'Введены некорректные данные'});
      return
    }
    res.status(500).send({message: 'Ошибка сервера'})
  }
};

// "62ab1e0e9eb04686deff560c"
// "62ac920b4e00b91d025a5af6"
// "62ac92244e00b91d025a5af8"
