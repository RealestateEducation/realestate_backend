/* eslint-disable prettier/prettier */
const { string } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const productSchema = mongoose.Schema(
  {
    front: {
      type: String,
      required: true
    },
    back: {
      type: String,
      required: true
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
    category: {
      type: String,
      required: true,
    },
    setId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'set'
    }
  },
  {
    timestamps: true,
  },

);
// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
const Product = mongoose.model('card', productSchema);
module.exports = Product;
