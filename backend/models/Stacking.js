const mongoose = require("mongoose");

const ExchangeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  stack_amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  flag: {
    type: Boolean,
    require: true,
    default: true,
  },
});

module.exports = mongoose.model("stacking", ExchangeSchema);
