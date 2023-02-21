/* eslint-disable prettier/prettier */
const express = require("express");
const { notificationController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");

const router = express.Router();

router.post("/", notificationController.createNotificationToken);

module.exports = router;
