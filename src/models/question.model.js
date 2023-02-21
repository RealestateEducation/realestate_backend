const {boolean, required} = require('joi');
const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');
const productSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    premium: {
      type: Boolean,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    visitors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    setId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'set'
    },
    options: {
      type: Array,
      required: true,
    },
    category: {
      type: Number,
      required: false,
    },
    attempt: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    passed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    timestamps: true,
  },
);
// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
const Product = mongoose.model('questions', productSchema);
module.exports = Product;
