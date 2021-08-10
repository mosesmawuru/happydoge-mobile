const express = require("express");
const router = express.Router();
//@import models
const Withdraw = require("../models/Withdraw");
const User = require("../models/User");
const async = require("async");

router.post("/", async (req, res) => {
  const { address, amount, flag } = req.body;
  const data = await User.findOne({ address });
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
        data.countETH = data.countETH - amount;
        data.save();
        // .then((item) => {
        //   return res.status(200).json({ msg: "success" });
        // })
        // .catch((err) => {
        //   return res.status(400).json({ errors: err });
        // });
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
        data.countHDT = data.countHDT - amount;
        data.save();
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

router.get("/", async (req, res) => {
  Withdraw.find()
    .then((item) => {
      if (!item) {
        res.status(404).json({ nowithdraw: "There is no WithDraw!" });
      }
      res.status(200).json(item);
    })
    .catch((err) => console.log(err));
});

router.post("/update", async (req, res) => {
  const { id, status } = req.body;
  Withdraw.findByIdAndUpdate(
    id,
    { $set: { status: status, date: Date.now() } },
    { new: true }
  )
    .then((wd) => {
      res.status(200).json(wd);
    })
    .catch((err) => {
      res.status(404).json({ nowithdraw: "There is no withdraw." });
    });
});

router.post("/updates", async (req, res) => {
  const data = [
    { id: "610ff0a49827e14470d19762", status: 10 },
    { id: "610ff0bf9827e14470d19765", status: 11 },
  ];

  async.mapSeries(data, UpdateWithdraw, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
});

const UpdateWithdraw = (item, callback) => {
  const { id, status } = item;
  Withdraw.findByIdAndUpdate(
    id,
    { $set: { status: status, date: Date.now() } },
    { new: true }
  ).then((wd) => {
    callback(null, wd);
  });
};

module.exports = router;
