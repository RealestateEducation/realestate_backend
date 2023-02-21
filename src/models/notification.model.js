const mongoose = require('mongoose');

const {toJSON, paginate} = require('./plugins');

const OrderSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestaps: true,
  },
);

OrderSchema.plugin(toJSON);
OrderSchema.plugin(paginate);

const Order = mongoose.model('notification', OrderSchema);

module.exports = Order;
