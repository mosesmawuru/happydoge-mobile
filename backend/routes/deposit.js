const express = require("express");
const router = express.Router();
//@import models
const Deposit = require("../models/Deposit");

router.post("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
