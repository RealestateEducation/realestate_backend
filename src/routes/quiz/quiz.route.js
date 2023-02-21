/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const { quizController,  } = require('../../controllers');


router
    .route('/')
    .post(
        quizController.createQuiz,
    )
    .get(
        quizController.getQuizes
    )

router
    .route('/:id')
    .patch(quizController.updateQuiz)
    .delete(quizController.deleteQuiz)
    .get(quizController.getQuizById)

module.exports = router;