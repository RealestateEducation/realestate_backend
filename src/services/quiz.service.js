/* eslint-disable prettier/prettier */
const { Quiz } = require("../models")
const ApiError = require('../utils/APIError');
const httpStatus = require('http-status');
var mongoose = require('mongoose');

const createQuiz = async (body) => {
    const order = await Quiz.create(body);
    return order;
}
const queryQuizes = async (
    filter,
    options,
) => {
    const products = Quiz.paginate(
        filter,
        options,
        "questions"
    );
    return products;
};

const getQuizById = async id => {
    return Quiz.findById(id).populate('questions');
};

const getWeekestSubject = async id => {
    const response = await Quiz.paginate(
        {},
        {},
        "questions"
    );
    let allquizzez = [];
    let passed=0;
    response.results.map((v,i) => {
        v.questions.forEach(data => {
            if (data.passed.includes(id)){
                passed = passed + 1
            }
        })
        allquizzez = [...allquizzez, {name: v.title, id:v.id, passed:passed}]
        passed = 0
    })
    const weekestQuiz = allquizzez.sort((a, b) => {
        return a.passed - b.passed;
    });

    return await Quiz.findById(weekestQuiz[0].id).populate("questions")
};

const deleteQuiz = async (id) => {

    const quiz = await getQuizById(id);
    if (!quiz) {
        return 'Cannot find Quiz'
    }
    await quiz.remove();
  
    return Quiz;
}

const updateQuiz = async (id, update) => {
    const product = await getQuizById(id);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found.');
    }
    Object.assign(product, update);
    await product.save();
    return product;
};

module.exports = {
    createQuiz, 
    updateQuiz,
    getQuizById,
    queryQuizes,
    deleteQuiz,
    getWeekestSubject
};