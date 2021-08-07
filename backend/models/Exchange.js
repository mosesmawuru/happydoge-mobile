const mongoose = require("mongoose");

const ExchangeSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("price", ExchangeSchema);
