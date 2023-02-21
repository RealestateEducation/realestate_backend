/* eslint-disable prettier/prettier */
const { Question, Quiz } = require('../models');
const ApiError = require('../utils/APIError');
const httpStatus = require('http-status');
var mongoose = require('mongoose');

const createQuestion = async (body) => {
  const order = await Question.create(body);
  return order;
};


const deleteQuestion = async (id) => {
  const res = await Question.findById(id);
  if (!res) {
    return 'can not find question'
  }
  await res.remove()
  return res
}

const deleteManyQuestion = async (body) => {
  const res = await Question.deleteMany(
    {
      _id: {
        $in: body
      }
    }
  )
  return res
}

const correctAnswers = async (id) => {
  let questionSets = [];
  const attempAnswers = await Question.find(
    {
      'attempt': {
        $in: [
          mongoose.Types.ObjectId(id)
        ]
      }
    }
  );
  console.log("attempAnswers ..<<", attempAnswers)

  const totalQuestions = await Question.find();

  const quiz = await Quiz.paginate({}, {}, 'questions')

  for (var x = 0; x < quiz.results.length; x++) {
    let data = quiz.results[x].questions;
    let attemptedQuestion = 0

    data.forEach(value => {
      if (value.attempt.includes(id)) {
        attemptedQuestion = attemptedQuestion + 1
      }
    })

    questionSets = [
      ...questionSets, {
        percentage: (attemptedQuestion * 100) / data.length
      }
    ]

  }


  return {
    totalAnswers: totalQuestions.length,
    attemptAnswer: attempAnswers.length,
    setPercentage: questionSets
  };
};

const weeklyActivities = async (id) => {
  const After24Hours = () => {
    const myCurrentDate = new Date();
    const myPastDate = new Date(myCurrentDate);
    return myPastDate.setDate(myPastDate.getDate() - 1);
  }
  const After7Days = () => {
    const myCurrentDate = new Date();
    const myPastDate = new Date(myCurrentDate);
    return myPastDate.setDate(myPastDate.getDate() - 7);
  }

  const dataWithin24Hours = await Question.find(
    {
      'updatedAt': {
        $gt: After24Hours()
      }
    }
  )
  const dataWithin7Days = await Question.find(
    {
      'updatedAt': {
        $gt: After7Days()
      }
    }
  )

  return {
    answeredToday: dataWithin24Hours.length,
    answeredWeekly: dataWithin7Days.length,
    studyTime: 30
  }

};

const queryQuestions = async (
  filter,
  options,
) => {
  const products = Question.paginate(
    filter,
    options,
  );
  return products;
};

const getQuestionById = async id => {
  return Question.findById(id);
};

const getSavedQuestions = async id => {
  const response = await Question.find(
    {
      'favorites': {
        $in: [
          mongoose.Types.ObjectId(id),
        ]
      }
    }
  )
  return response
}

const updateQuestionById = async (id, update) => {
  const product = await getQuestionById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found.');
  }
  Object.assign(product, update);
  await product.save();
  return product;
};

const resetQuestionData = async (id) => {
  const res = await Question.updateMany(
    {
    },
    {
      $pull: {
        favorites: String(id)
      },
    }
  )

  await Question.updateMany(
    {
    },
    {
      $pull: {
        visitors: id,
      },
    }
  )

  await Question.updateMany(
    {
    },
    {
      $pull: {
        attempt: String(id),
      },
    }
  )


  await Question.updateMany(
    {
    },
    {
      $pull: {
        passed: id,
      },
    }
  )



};

module.exports = {
  createQuestion,
  queryQuestions,
  updateQuestionById,
  getSavedQuestions,
  correctAnswers,
  weeklyActivities,
  deleteQuestion,
  deleteManyQuestion,
  resetQuestionData
};
