//@import models
const User = require("../models/User");
const History = require("../models/History");
const Referral = require("../models/Referral");
const axios = require("axios");

const deposit = async (socket) => {
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
              const balance =
                ((ethPrice.data.weightedAvgPrice * amount) / 100) * 30;
              selectedUser.countUSDT = selectedUser.countUSDT + balance;
              const sendUser = {
                address: selectedUser.address,
                balance,
              };
              const depoHistory = new History({
                method: flag,
                to_address: address,
                amount,
                type: 1,
              });
              const newReferral = new Referral({
                address: selectedUser.address,
                referral_amount: balance,
              });

              const selUser = await selectedUser.save();
              const refUser = await newReferral.save();
              const depoFlag = await depoHistory.save();
              if (selUser && refUser && depoFlag) {
                socket.emit("referral_deposit", sendUser);
              }
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

const tranferCrypto = async (socket, onlineUsers) => {
  socket.on("transfer", async (item) => {
    const { owneraddress, toaddress, flag, amount } = item;
    if (amount <= 0) {
      socket.emit("failed_transfer", { amount: "please input correct amount" });
    }

    const owner = await User.findOne({ address: owneraddress });
    const sender = await User.findOne({ address: toaddress });

    if (owner && sender) {
      if (flag === "eth") {
        if (owner.countETH >= amount) {
          owner.countETH = owner.countETH - amount;
          sender.countETH = sender.countETH + amount;
          const ownFlag = await owner.save();
          const sendFlag = await sender.save();
          const newHistory = new History({
            method: flag,
            from_address: owneraddress,
            to_address: toaddress,
            amount: amount,
            type: 3,
          });
          const historyFlag = await newHistory.save();
          if (ownFlag && sendFlag && historyFlag) {
            const data = {
              id: ownFlag._id,
              owner: owneraddress,
              user: toaddress,
              amount: amount,
              method: flag,
            };
            socket.emit("sent_money", data);
            socket.emit("complete_transfer", data);
          }
        } else {
          socket.emit("failed_transfer", { amount: "Not Sufficiant Balance" });
        }
      } else if (flag === "hdt") {
        if (owner.countHDT >= amount) {
          owner.countHDT = owner.countHDT - amount;
          sender.countHDT = sender.countHDT + amount;
          const ownFlag = await owner.save();
          const sendFlag = await sender.save();

          const newHistory = new History({
            method: flag,
            from_address: owneraddress,
            to_address: toaddress,
            amount: amount,
            type: 3,
          });
          const historyFlag = await newHistory.save();

          if (ownFlag && sendFlag && historyFlag) {
            const data = {
              id: ownFlag._id,
              owner: owneraddress,
              user: toaddress,
              amount: amount,
              method: flag,
            };
            socket.emit("sent_money", data);
            socket.emit("app_transaction", data);
          }
        } else {
          socket.emit("failed_transfer", { amount: "Not Sufficiant Balance" });
        }
      }
    } else {
      socket.emit("failed_transfer", {
        address: "please input correct address",
      });
    }
  });
};

module.exports = { deposit, tranferCrypto };
