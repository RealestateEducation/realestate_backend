/* eslint-disable prettier/prettier */
const express = require('express');
const userRoute = require('./user/user.route');
const notificationRoute = require('./notification/notification.route');
const authRoute = require('./auth/auth.route');
const questionRoute = require('./question/question.route');
const mailRoute = require('./mail/mail.route');
const paymentRoute = require('./payment/payment.route');
const cardRoute = require('./Card/card.route');
const setRoute = require('./set/set.route');
const quizRoute = require('./quiz/quiz.route')
const router = express.Router();

router.use('/auth', authRoute);
router.use('/notification', notificationRoute);
router.use('/user', userRoute);
router.use('/mail',mailRoute);
router.use('/question',questionRoute);
router.use('/payment',paymentRoute);
router.use('/card',cardRoute);
router.use('/set',setRoute);
router.use('/quiz',quizRoute);

module.exports = router;
