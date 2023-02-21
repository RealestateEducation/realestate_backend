const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      // type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true, alias: 'type'
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vendor',
    },
  },
  {
    timestamps: true,
  },
);
// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
const Product = mongoose.model('product', productSchema);
module.exports = Product;
