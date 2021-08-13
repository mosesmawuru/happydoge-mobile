const express = require("express");
const router = express.Router();
const passport = require("passport");
//@import models
const Stack = require("../models/Stacking");
const User = require("../models/User");
const History = require("../models/History");
//@import validataion
const validateStack = require("../validation/stack");
// @route   GET stack/test
// @desc    Return current user
// @access  Public
router.get("/test", (req, res) => {});

// @route   POST stack
// @desc    stack HDT
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateStack(req.body);
    const { ID, amount } = req.body;
    if (amount <= 0) {
      return res.status(400).send({
        stackamount: "please input correct amount",
      });
    }

    if (!isValid) {
      return res.status(400).send(errors);
    }
    const person = await User.findOne({ _id: ID });
    const stackdata = await Stack.findOne({ user: ID });
    if (person) {
      if (person.countHDT >= amount) {
        if (stackdata) {
          stackdata.stack_amount = stackdata.stack_amount + amount;
          person.countHDT = person.countHDT - amount;
          person
            .save()
            .then((item) => {
              return res.status(200).json({ msg: "success" });
            })
            .catch((err) => {
              res.status(400).json({ errors: err });
            });
          stackdata
            .save()
            .then((item) => {
              return res.status(200).json({ msg: "success" });
            })
            .catch((err) => {
              res.status(400).json({ errors: err });
            });
        } else {
          const newData = new Stack({
            user: ID,
            stack_amount: amount,
            date: Date.now(),
          });
          person.countHDT = person.countHDT - amount;
          person
            .save()
            .then((item) => {
              return res.status(200).json({ msg: "success" });
            })
            .catch((err) => {
              res.status(400).json({ errors: err });
            });
          newData
            .save()
            .then((item) => {
              return res.status(200).json({ msg: "success" });
            })
            .catch((err) => {
              res.status(400).json({ errors: err });
            });
        }
      } else {
        return res.status(400).send({
          stackamount: "Not Sufficiant Balance",
        });
      }
    } else {
      return res.status(400).send({
        errors: "user not found",
      });
    }
  }
);
module.exports = router;
