const httpStatus = require('http-status');
const { notificationService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createNotificationToken = catchAsync(async (req, res) => {
  const response = await notificationService.getNotificationById(req.body.token)
  console.log(response[0] == undefined)
  if(response[0] == undefined){
    console.log("CHALA GYAAA....")
    const user = await notificationService.createNotificationToken(req.body);
    res.status(httpStatus.CREATED).send(user);
  } else {
    console.log("CHALA GYAAA....  2")
    res.status(200).send({})
  }
});


module.exports = {
  createNotificationToken
};
