/** временный мидлвэр - ID автора карточки */
const owner = ((req, res, next) => {
  req.user = {
    _id: '62af351e84b7c204df9afdc9',
  };

  next();
});

module.exports = owner;
