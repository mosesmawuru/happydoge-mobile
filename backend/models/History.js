const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  // method: {
  //   type: String,
  //   required: true,
  // },
  to_address: {
    type: String,
    required: true,
  },
  from_address: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,//1=deposit,2=withdraw,3=tranfer, 4=stack,5=swapped
    required: true,
  },
});

module.exports = mongoose.model("history", HistorySchema);
