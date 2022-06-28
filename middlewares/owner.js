/** временный мидлвэр - ID автора карточки */
const owner = ((req, res, next) => {
  req.user = {
    _id: '62b9b94b255892329c3a088b',
  };

  next();
});

module.exports = owner;
