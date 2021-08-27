const mongoose = require("mongoose");

const ExchangeSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  stack_rate: {
    type: Number,
    required: true,
  },
  referral_rate: {
    type: Number,
    required: true,
  },
  swap_rate: {
    type: Number,
    required: true,
  },
  withdraw_rate: {
    type: Number,
    required: true,
  },
  minium_amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("price", ExchangeSchema);
