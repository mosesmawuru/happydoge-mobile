const express = require("express");
const passport = require("passport");
const router = express.Router();
const { hdtABI, ethABI } = require("../constant/tokenABI");
//@import models
const User = require("../models/User");
const Deposit = require("../models/Deposit");
const Price = require("../models/Exchange");
const axios = require("axios");

const getBalance = async (socket) => {
  socket.on("deposit", async (item) => {
    const { id, address, flag, amount } = item;
    const userdata = await User.findById(id);
    if (userdata) {
      if (flag === "eth") {
        userdata.countETH = userdata.countETH + amount;
      } else if (flag === "hdt") {
        userdata.countHDT = userdata.countHDT + amount;
      }
      const ethPrice = await axios.get(
        "https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT"
      );
      userdata
        .save()
        .then((item) => {
          const data = {
            amount,
            address,
          };
          socket.emit("success_deposit", data);
          if (item.referralcode) {
            const selectedUser = User.findOne({ owncode: item.referralcode });
            const balance = ethPrice.weightedAvgPrice / 3;
            selectedUser.countUSDT = selectedUser.countUSDT + balance;
            const sendUser = {
              address: selectedUser.address,
              balance,
            };
            socket.emit("success_deposit", data);
          }
        })
        .catch((err) => {
          socket.emit("failed_deposit", err);
        });
    } else {
      return res.status(400).send({
        err: "User not found",
      });
    }
  });
};

module.exports = getBalance;
