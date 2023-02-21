const Joi = require('joi');

const createPayment = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.number().required(),
    currency: Joi.string().required(),
  }),
};

module.exports = {createPayment};
