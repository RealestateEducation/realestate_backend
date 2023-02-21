const express = require("express");
const { paymentController } = require("../../controllers/");
const paymentValidation =require("../../validations/payment.validation")
const router = express.Router();
const validate =require("../../middlewares/validate");






// router.route("/").post(validate(paymentValidation.createPayment),paymentController.createPayment);
// router.route('/:id').get(paymentController.getPayment);
// router.route("/create-checkout-session").post(paymentController.checkoutSession);
// router.route("/coded-checkout-session").post(paymentController.codedCheckoutSession);

module.exports = router;
