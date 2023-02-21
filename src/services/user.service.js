const httpStatus = require('http-status');
const { User } = require('../models');
const questionService = require('./question.service');
const notificationService = require('./notification.service');
const cardService = require('./card.service');
const ApiError = require('../utils/APIError');
const admin = require("firebase-admin");
var cron = require("node-cron");
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

var serviceAccount = require('../firebase/realestateeducation-cab19-firebase-adminsdk-w91sn-10d6581ea1.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const oneToOneNotification = async (request) => {
  const { title, body, data, tokens } = request;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: data,
    tokens: tokens,
    apns: {
      payload: {
        aps: {
          "mutable-content": 1,
        },
      },
    },
  };
  try {
    const response = await admin.messaging().sendMulticast(message);

  }
  catch (err) {
    console.log(err)
    return err;
  }

};

cron.schedule("0 19 * * *", async function () {
  let studyReminderToken = []
  let advertisementToken = []
  const notifyAll = await Notification.find()
  const studyReminder = await User.find({
    examDate: {
      $gte: new Date()
    }
  })

  studyReminder.forEach(value => studyReminderToken = [...studyReminderToken, value.token])
  notifyAll.forEach(value => advertisementToken = [...advertisementToken, value.token])


  if (advertisementToken.length > 0) {
    oneToOneNotification({
      title: "Real Estate Education",
      body: "You haven't practice on Real Estate Education App? We are waiting with a lots of new practice questions and vocabulary.",
      data: {},
      tokens: studyReminderToken
    })
  }

  if (studyReminderToken.length > 0) {
    oneToOneNotification({
      title: "Real Estate Education",
      body: "Be ready for your scheduled quiz. This notification is to remind you that you have scheduled your quiz.",
      data: {},
      tokens: studyReminderToken
    })
  }


});


cron.schedule("0 19 * * *", async function () {
  let studyReminderToken = []
  const studyReminder = await User.find({ studyReminder: true })
  studyReminder.forEach(value => studyReminderToken = [...studyReminderToken, value.token])

  console.log("studyRemindder3333 --->>> ")
  oneToOneNotification({
    title: "Real Estate Education",
    body: "You haven't practice on Real Estate Education App? We are waiting with a lots of new practice questions and vocabulary.",
    data: {},
    tokens: studyReminderToken
  })

});



const createUser = async userBody => {
  console.log((await User.find({ orderId: userBody.orderId })).length)
  if ((await User.find({ orderId: userBody.orderId })).length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already taken');
  } else {
    const user = await User.create(userBody);
    return user;
  }
};


/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options, 'customer_id');
  return users;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async id => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email, token) => {
  return User.findOneAndUpdate(
    { email },
    {
      token: token
    },
    { new: true }
  )
};

const getUserByCustomerId = async customer_id => {
  return User.findOne({ customer_id: customer_id });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const updateUserByCustomerId = async (customer_id, updateBody) => {
  const user = await getUserByCustomerId(customer_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async userId => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const deleteUserByCustomerId = async customer_id => {
  const user = await getUserByCustomerId(customer_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const resetUser = async body => {
  console.log(body)
  const res = await questionService.resetQuestionData(body.id)
  await cardService.resetCardsData(body.id)
  return (res)
};

module.exports = {
  createUser,
  queryUsers,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByCustomerId,
  updateUserById,
  updateUserByCustomerId,
  deleteUserById,
  deleteUserByCustomerId,
  resetUser,
};
