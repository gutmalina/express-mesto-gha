const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validateCreateCard,
  validateDeleteCard,
  validateLikeCard,
  validateDislikeCard,
} = require('../middlewares/validation');

/** получить все карточки */
router.get('/', getCards);

/** создать карточку */
router.post('/', validateCreateCard, createCard);

/** удалить карточку по ID */
router.delete('/:cardId', validateDeleteCard, deleteCard);

/** поставить лайк карточке */
router.put('/:cardId/likes', validateLikeCard, likeCard);

/** удалить лайк у карточки */
router.delete('/:cardId/likes', validateDislikeCard, dislikeCard);

module.exports = router;
