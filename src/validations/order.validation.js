const Joi = require('joi');

const createQuestion = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    explanation: Joi.string().required(),
    category: Joi.number().required(),
    answer: Joi.string().required(),
    options: Joi.array().required(),
    premium: Joi.boolean().required(),
  }),
};

module.exports = { createQuestion };
