const httpStatus = require('http-status');
const { userService, questionService, cardService, quizService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  // const mail =await mailService.
  res.status(httpStatus.CREATED).send(user);
});

// const deleteUser = catchAsync(async (req, res) => {
//   const user = await userService.deleteUserById(req.params.id);
//   res.status(200).send(user);
// });

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).send(user);
  //res.status(200).json("chal puttar tu chutti kar");
});

const updateUserById = catchAsync(async (req, res) => {
  const result = await userService.updateUserById(req.params.id, req.body);
  res.send(result);
});

const resetUser = catchAsync(async (req, res) => {
  const result = await userService.resetUser(req.body);
  res.send(result);
});


const getStatistics = catchAsync(async (req, res) => {
  const obj = {};
  const correctAnswers = await questionService.correctAnswers(req.params.id);
  obj.answer = correctAnswers
  obj.testComplete = {
    totalTests: 10,
    correct: 6
  }

  obj.weekestQuiz = await quizService.getWeekestSubject(req.params.id)

  // console.log("correctAnswers --->>   ", correctAnswers.answer?.setPercentage)
  obj.practiceScore = {
    allQuestions: Math.round((correctAnswers.attemptAnswer * 100) / correctAnswers.totalAnswers),
    setPercentage: correctAnswers.setPercentage
  }

  obj.flashCardScore = await cardService.flashCardStatistics(req.params.id);

  obj.vocabularyScore = await cardService.vocabularyStatistics(req.params.id);
  obj.weeklyActivities = await questionService.weeklyActivities(req.params.id)
  console.log(obj);
  res.status(200).send(obj);
});

module.exports = {
  createUser,
  // deleteUser,
  getUserById,
  getStatistics,
  resetUser,
  updateUserById,
};
