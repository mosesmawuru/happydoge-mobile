const express = require("express");
const router = express.Router();
//@import models
const History = require("../models/History");

router.get("/", (req, res) => {
  History.find({})
    .then((item) => {
      return res.status(200).json(item);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
});

router.post("/", (req, res) => {
  const { id } = req.body;
  History.findById(id)
    .then((item) => {
      return res.status(200).json(item);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
});

module.exports = router;
