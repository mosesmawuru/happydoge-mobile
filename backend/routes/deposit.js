const express = require("express");
//@import models
const User = require("../models/User");
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
        .then(async (item) => {
          const data = {
            amount,
            address,
            flag,
          };
          socket.emit("success_deposit", data);

          if (item.referralcode) {
            const selectedUser = await User.findOne({
              owncode: item.referralcode,
            });

            if (selectedUser) {
              const balance = (ethPrice.data.weightedAvgPrice * amount) / 3;
              selectedUser.countUSDT = selectedUser.countUSDT + balance;
              const sendUser = {
                address: selectedUser.address,
                balance,
              };
              selectedUser
                .save()
                .then(() => {
                  socket.emit("referral_deposit", sendUser);
                })
                .catch((err) => {
                  console.log(err);
                  // socket.emit("failed_referral", err);
                });
            }
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
