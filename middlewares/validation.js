const { celebrate, Joi } = require('celebrate');

//const regexLink = /^https?:\/\/\w\S{1,}#?$/gi;

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    //avatar: Joi.string().required().regex(RegExp(regexLink)),
    email: Joi.string().required().email(),
    password: Joi.string().required().length(10),
  }),
});

module.exports = validateCreateUser;
