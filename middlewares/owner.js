/** временный мидлвэр - ID автора карточки*/
const owner = ((req, res, next) => {
  req.user = {
    _id: '62a8bc1c12020f86156e05b0'
  };

  next();
});

module.exports = owner;
