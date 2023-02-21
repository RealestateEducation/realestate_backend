const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { roles } = require('../config/roles');
const { toJSON, paginate } = require('./plugins');
const { boolean } = require('joi');

const userSchema = mongoose.Schema(
  {
    subscriptionValid: {
      type: Date,
      required: false,
      trim: true,
    },
    subscription: {
      type: Boolean,
      required: true,
      default: true
    },
    orderId:{
      type: String,
      required: false
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    examDate: {
      type: Date,
      required: false,
      default: new Date()
    },
    examNotification: {
      type: Boolean,
      required: false,
      default: false
    },
    token:{
      type: String,
      required: false
    },
    studyReminder:{
      type: Boolean,
      required: false,
      default: true
    }
  },
  {
    timestaps: true,
  },
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);



/**
 * @typedef User
 */

const User = mongoose.model('user', userSchema);
module.exports = User;
