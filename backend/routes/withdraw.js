const express = require("express");
const passport = require("passport");
const router = express.Router();
//@import models
const Withdraw = require("../models/Withdraw");
const User = require("../models/User");
const async = require("async");
const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);
//get all withdraw state
router.get("/", async (req, res) => {
  Withdraw.find()
    .sort({ date: -1 })
    .then((item) => {
      if (!item) {
        res.status(404).json({ nowithdraw: "There is no WithDraw!" });
      }
      res.status(200).json(item);
    })
    .catch((err) => console.log(err));
});
//@update state
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // const { id, address, amount, flag, status } = req.body;
    const status = 1;
    const amount = 0.001;
    const flag = "eth";
    const adminAddress = "0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E";
    const address = "0xbC6661e61539a3e33F9E5C4AD2952770c62a128b";
    const tokenAddress = "0x08895697055b82890a312dfc9f52df907d8fd001";
    const privateKey =
      "09629aa26282f4f6bb7d9792a18e77cc2bcd0fbbb2113ccfeaf7933d45080738";
    const contractAddress = "0x08895697055b82890a312dfc9f52df907d8fd001";

    const web3 = await new Web3(
      new Web3.providers.HttpProvider(
        "https://ropsten.infura.io/v3/43abad80628540079b649332f37de4fb"
      )
    );
    const userdata = await User.findOne({ address });
    var count = await web3.eth.getTransactionCount(adminAddress);
    var gasPrice = await web3.eth.gasPrice;
    var gasLimit = 1000000;
    if (userdata) {
      if (status === 1) {
        if (flag === "eth") {
          web3.eth.getBalance(adminAddress, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              const realAmount = web3.fromWei(result, "ether");
              if (realAmount >= amount) {
                var rawTransaction = {
                  from: adminAddress,
                  nonce: web3.toHex(count),
                  gasPrice: web3.toHex(gasPrice),
                  gasLimit: web3.toHex(gasLimit),
                  to: address,
                  value: amount * 1000000000000000000,
                };
                var tx = new Tx(rawTransaction, { chain: "ropsten" });
                var privKey = Buffer.from(privateKey, "hex");
                tx.sign(privKey);
                var serializedTx = tx.serialize();
                web3.eth.sendRawTransaction(
                  "0x" + serializedTx.toString("hex"),
                  function (err, hash) {
                    if (!err) {
                      return res.status(200).json({ msg: "success" });
                    } else {
                      return res.status(400).send({
                        err: "The transaction is pending",
                      });
                    }
                  }
                );
              } else {
                return res.status(400).send({
                  amount: "Not Sufficiant Balance",
                });
              }
            }
          });
        } else if (flag === "hdt") {
          // var tokenInst = web3.eth.contract(hdtABI).at(contractAddress);
          // var data = contract.transfer.getData(account2, 10000, {
          //   from: address,
          // });
        }
      } else if (status === 3) {
        if (flag === "eth") {
          userdata.countETH = userdata.countETH + amount;
          userdata
            .save()
            .then((res) => {
              return res.status(200).json({ msg: "success" });
            })
            .catch((err) => {
              return res.status(400).json({ errors: err });
            });
        } else if (flag === "hdt") {
          userdata.countHDT = userdata.countHDT + amount;
          userdata
            .save()
            .then((res) => {
              return res.status(200).json({ msg: "success" });
            })
            .catch((err) => {
              return res.status(400).json({ errors: err });
            });
        }
      }
    } else {
      return res.status(400).send({
        err: "User not found",
      });
    }
    // Withdraw.findByIdAndUpdate(
    //   id,
    //   { $set: { status: status, date: Date.now() } },
    //   { new: true }
    // )
    //   .then((wd) => {
    //     res.status(200).json(wd);
    //   })
    //   .catch((err) => {
    //     res.status(404).json({ nowithdraw: "There is no withdraw." });
    //   });
  }
);
//@multi update withdraw state
router.post(
  "/updates",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

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

router.post(
  "/getwithdraw",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { address } = req.body;
    Withdraw.find({ address, status: 1 })
      .then((item) => {
        return res.status(200).json(item);
      })
      .catch((err) => {
        return res.status(404).json(err);
      });
  }
);
module.exports = router;
