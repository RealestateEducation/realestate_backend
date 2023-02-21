const mongoose = require('mongoose');

const {toJSON, paginate} = require('./plugins');

const OrderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    referenceIdea: {
      type: String,
      required: true,
    },
    brief: {
      type: String,
      require: true,
    },
    targetedAudience: {
      type: String,
      require: true,
    },
  },
  {
    timestaps: true,
  },
);

OrderSchema.plugin(toJSON);
OrderSchema.plugin(paginate);

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
