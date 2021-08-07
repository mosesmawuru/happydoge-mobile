const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  address: {
    type: Boolean,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("transaction", TransactionSchema);
