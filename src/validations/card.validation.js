/* eslint-disable prettier/prettier */
const Joi = require('joi');

const createCard = {
  body: Joi.object().keys({
    front: Joi.string().required(),
    back: Joi.string().required(),
    setId: Joi.string().required(),
    category: Joi.string().required()
  }),
};

module.exports = {createCard};
