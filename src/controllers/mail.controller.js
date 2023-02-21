const {mailService} = require('../services/');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');

const mail = catchAsync(async (req, res) => {
  const mail = await mailService.createMail(req.body);
  // const confirmedMail =mailService.confirmMail(req.body);
  res.status(httpStatus.CREATED).send(mail);
});

const contactUs = catchAsync(async (req, res) => {
  const mail = await mailService.contactUsMail(req.body);
  res.status(httpStatus.CREATED).send(mail);
});

module.exports = {mail, contactUs};
