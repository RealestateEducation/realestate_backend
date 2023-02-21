/* eslint-disable prettier/prettier */
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { quizService } = require('../services');
const pick = require('../utils/pick');

const createQuiz = catchAsync(async (req, res) => {
    const response = await quizService.createQuiz(req.body);
    res.status(httpStatus.CREATED).send(response);
});

const getQuizes = catchAsync(async (req, res) => {
    const filters = pick(req.query, ['title','premium']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await quizService.queryQuizes(
        filters,
        options,
    );
    res.send(result);
});

const updateQuiz = catchAsync(async (req, res) => {
    const result = await quizService.updateQuiz(req.params.id, req.body);
    res.send(result);
});

const deleteQuiz = catchAsync(async (req, res) => {
    const response = await quizService.deleteQuiz(req.params.id);
    res.send('Quiz has been deleted')
})

const getQuizById = catchAsync(async (req, res) => {
    const result = await quizService.getQuizById(req.params.id);
    res.send(result);
})

module.exports = {
    createQuiz,
    deleteQuiz,
    updateQuiz,
    getQuizById,
    getQuizes
  
};