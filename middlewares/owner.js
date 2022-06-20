/** временный мидлвэр - ID автора карточки */
const owner = ((req, res, next) => {
  req.user = {
    _id: '61eade4c6d5acf558c42d9b8',
  };

  next();
});

module.exports = owner;
