const express = require("express");
const router = express.Router();
//@import models
const Withdraw = require("../models/Withdraw");
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { address, amount, flag } = req.body;
  const data = await User.findOne({ address });
  console.log(data);
  if (amount <= 0) {
    return res.status(400).send({ amount: "please input correct" });
  }
  const drawData = new Withdraw({
    address: address,
    amount: amount,
    method: flag,
    status: 3,
  });
  if (data) {
    if (flag === "eth") {
      if (data.countETH >= amount) {
        drawData
          .save()
          .then((item) => {
            return res.status(200).json({ msg: "success" });
          })
          .catch((err) => {
            return res.status(400).json({ errors: err });
          });
      } else {
        return res.status(400).send({
          amount:
            "The amount to be swapped is greater than the amount of ETH you currently have.",
        });
      }
    } else if (flag === "hdt") {
      if (data.countHDT >= amount) {
        drawData
          .save()
          .then((item) => {
            console.log(item);
            return res.status(200).json({ msg: "success" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json({ errors: err });
          });
      } else {
        return res.status(400).send({
          amount:
            "The amount to be swapped is greater than the amount of HDT you currently have.",
        });
      }
    }
  }
});

module.exports = router;
