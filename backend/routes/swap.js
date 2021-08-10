const express = require("express");
const router = express.Router();
//@import models
const User = require("../models/User");
const Exchange = require("../models/Exchange");
const History = require("../models/History");
//@import validation
const validateSwap = require("../validation/swap");

// @route   GET users/test
// @desc    Return current user
// @access  Public
router.post("/test", async (req, res) => {
  console.log(nodeEth.validateAddress(req.body.address));
});
// @route   POST swap/swaptohdt
// @desc    SWAP ETH to HDT
// @access  private
router.post("/swaptohdt", async (req, res) => {
  const { errors, isValid } = validateSwap(req.body);
  const { ID, amount, price } = req.body;
  if (!isValid) {
    return res.status(400).send(errors);
  }
  if (amount <= 0) {
    return res.status(400).send({ countETH: "please input correct" });
  }
  const hdtitem = await Exchange.find();
  const person = await User.findOne({ _id: ID });
  if (person && hdtitem) {
    if (person.countETH >= amount) {
      person.countETH = person.countETH - amount;
      person.countHDT = person.countHDT + (amount * price) / hdtitem[0].price;
      person
        .save()
        .then((item) => {
          const newHistory = new History({
            method: "eth",
            to_address: item.address,
            amount: amount,
            type: 5,
          });
          newHistory.save();

          return res.status(200).json({ msg: "success" });
        })
        .catch((err) => {
          return res.status(400).json({ errors: err });
        });
    } else {
      return res.status(400).send({
        countETH:
          "The amount to be swapped is greater than the amount of ETH you currently have.",
      });
    }
  } else {
    return res.status(400).json({ address: "address is not correct" });
  }
});
// @route   POST swap/swaptoeth
// @desc    SWAP HDT to ETH
// @access  private
router.post("/swaptoeth", async (req, res) => {
  const { errors, isValid } = validateSwap(req.body);
  const { ID, amount, price } = req.body;

  if (!isValid) {
    return res.status(400).send(errors);
  }
  if (amount <= 0) {
    return res.status(400).send({ countHDT: "please input correct" });
  }
  const hdtitem = await Exchange.find();
  const person = await User.findOne({ _id: ID });
  if (person && hdtitem) {
    if (person.countHDT >= amount) {
      person.countHDT = person.countHDT - amount;
      person.countETH =
        person.countETH + (amount * hdtitem[0].price) / price / 2;
      person
        .save()
        .then((item) => {
          const newHistory = new History({
            method: "hdt",
            to_address: item.address,
            amount: amount,
            type: 5,
          });
          newHistory.save();
          return res.status(200).json({ msg: "success" });
        })
        .catch((err) => {
          return res.status(400).json({ errors: err });
        });
    } else {
      return res.status(400).send({
        countHDT:
          "The amount to be swapped is greater than the amount of HDT you currently have.",
      });
    }
  } else {
    return res.status(400).json({ address: "address is not correct" });
  }
});
module.exports = router;
