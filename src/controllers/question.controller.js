const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const {questionService} = require('../services');
const pick = require('../utils/pick');

const createQuestion = catchAsync(async (req, res) => {
  const response = await questionService.createQuestion(req.body);
  res.status(httpStatus.CREATED).send(response);
});

const deleteQuestion = catchAsync(async(req,res)=>{
  const response = await questionService.deleteQuestion(req.params.id);
  res.send('Question Deleted')
})

const deleteManyQuestions = catchAsync(async (req, res) => {
  const response = await questionService.deleteManyQuestion(req.body);
  res.send(response)
})

const getQuestions = catchAsync(async (req, res) => {
  //const userFilters = pick(req.user, ["location_id", "customer_id"]);
  const filters = pick(req.query, ['subject', 'category', 'premium', 'createdAt']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  //let filter = Object.assign(queryFilters, userFilters);
  const result = await questionService.queryQuestions(filters, options);
  res.send(result);
});

const getSavedQuestions = catchAsync(async (req, res) => {
  const result = await questionService.getSavedQuestions(
    req.params.id
  );
  res.send(result);
});

const updateQuestion = catchAsync(async (req, res) => {
  const result = await questionService.updateQuestionById(
    req.params.id,
    req.body,
  );
  res.send(result);
});

module.exports = {
  createQuestion, 
  getQuestions, 
  updateQuestion,
  getSavedQuestions,
  deleteQuestion,
  deleteManyQuestions
};
