/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const Card = require('../models/card');
const {
  CAST_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
} = require('../utils/constants');

/** получить все карточки */
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch((err) => {
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

/** создать карточку */
module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.status(201).send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(CAST_ERROR).send({ message: 'Введены некорректные данные' });
      return;
    }
    res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
  }
};

/** удалить карточку по ID */
module.exports.deleteCard = (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Карточка с указанным id не найдена' });
        return;
      }
      if (String(userId) !== String(card.owner._id)) {
        res.status(FORBIDDEN_ERROR).send({ message: 'Карточка не может быть удалена' });
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(CAST_ERROR).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

/** поставить лайк карточке */
module.exports.likeCard = (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Карточка с указанным id не найдена' });
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(CAST_ERROR).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

/** удалить лайк у карточки */
module.exports.dislikeCard = (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Карточка с указанным id не найдена' });
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(CAST_ERROR).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};
