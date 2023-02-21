/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const {cardController} = require('../../controllers');
const cardValidation = require('../../validations/card.validation');
const validate = require('../../middlewares/validate');

router
  .route('/')
  .post(
    validate(cardValidation.createCard),
    cardController.createCard,
  )
  .get(
    cardController.getCards
  )
  .delete(
    cardController.deleteManyCards
  )

  router
  .route('/getbyfavorite')
  .get(cardController.getCardByFavorite);

  router
  .route('/getbylimit')
  .get(cardController.getCardByLimit);

  router
  .route('/:id')
  .patch(cardController.updateCard)
  .delete(cardController.deleteCard);

module.exports = router;
