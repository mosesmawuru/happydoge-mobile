const express = require("express");
const passport = require("passport");
const router = express.Router();
//@import model
const Exchange = require("../models/Exchange");
//@import validataion
const validatePrice = require("../validation/price");
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePrice(req.body);
    const { price } = req.body;
    if (!isValid) {
      return res.status(400).send(errors);
    }
    Exchange.findOne({})
      .then((item) => {
        if (item) {
          item.price = price;
          item
            .save()
            .then((item) => {
              return res.status(200).json({ msg: "success" });
            })
            .catch((err) => {
              return res.status(400).json({ errors: err });
            });
        } else {
          const newData = new Exchange({
            price: price,
          });

          newData
            .save()
            .then((item) => {
              return res.status(200).json({ msg: "success" });
            })
            .catch((err) => {
              return res.status(400).json({ errors: err });
            });
        }
      })
      .catch((err) => {
        return res.status(400).json({ errors: err });
      });
  }
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Exchange.find()
      .then((item) => {
        return res.status(200).json(item[0]);
      })
      .catch((err) => {
        return res.status(400).json({ errors: err });
      });
  }
);
module.exports = router;
