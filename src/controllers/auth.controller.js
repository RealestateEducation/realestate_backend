const httpStatus = require("http-status");
const { authService, tokenService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const login = catchAsync(async (req, res, next) => {
  const { orderId, token } = req.body;
  console.log(req.body)
  const user = await authService.loginUserWithEmailAndPassword(orderId, token);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

module.exports = {
  login
};
