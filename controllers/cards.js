const Card = require('../models/card');
const {
  CAST_ERROR,
  NOT_FOUND_ERROR,
  FORBIDDEN_ERROR,
} = require('../utils/constants');

/** получить все карточки */
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

/** создать карточку */
module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.status(201).send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new CAST_ERROR('Введены некорректные данные'));
    }
    next(err);
  }
};

/** удалить карточку по ID */
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .orFail(() => new Error('Пользователь по указанному id не найден'))
    .then((card) => {
      if (String(userId) !== String(card.owner._id)) {
        throw new FORBIDDEN_ERROR('Карточка не может быть удалена');
      }
      Card.findByIdAndRemove(cardId)
        .then(() => {
          res.status(200).send({ data: card });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CAST_ERROR('Введены некорректные данные'));
      }
      next(err);
    });
};

/** поставить лайк карточке */
module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NOT_FOUND_ERROR('Карточка с указанным id не найдена');
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CAST_ERROR('Введены некорректные данные'));
      }
      next(err);
    });
};

/** удалить лайк у карточки */
module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NOT_FOUND_ERROR('Карточка с указанным id не найдена');
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CAST_ERROR('Введены некорректные данные'));
      }
      next(err);
    });
};
