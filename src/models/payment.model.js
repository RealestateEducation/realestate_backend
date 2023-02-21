const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');

const PaymentSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    amount: {type: Number, required: true},
    currency: {type: String, required: true},
  },
  {timestaps: true},
);
PaymentSchema.plugin(toJSON);
PaymentSchema.plugin(paginate);

const Payment = mongoose.model('payment', PaymentSchema);

module.exports = Payment;
