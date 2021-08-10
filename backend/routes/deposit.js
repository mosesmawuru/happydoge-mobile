const express = require("express");
const router = express.Router();
const tokenABI = require("../constant/tokenABI");
//@import models
const User = require("../models/User");
const Deposit = require("../models/Deposit");

router.post("/", async (req, res) => {
  console.log(tokenABI.tokenABI);
  const address = "0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E";
  const userdata = await User.findOne({ address });
  const adminAddress = "0x8Ad784720f636DF7cCEb143CCC1dB3F25Afc01A0";
  const tokenAddress = "0x08895697055b82890a312dfc9f52df907d8fd001";
  const amount = 1;
  const flag = "hdt";
  const Web3 = require("web3");

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://mainnet.infura.io/v3/43abad80628540079b649332f37de4fb"
    )
  );
  if (flag === "eth") {
    web3.eth.getBalance(address, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        const realAmount = web3.utils.fromWei(result, "ether");
        if (realAmount >= amount) {
          // userdata.countETH = userdata.countETH + amount;
          // userdata
          //   .save()
          //   .then((item) => {
          //     return res.status(200).json({ msg: "success" });
          //   })
          //   .catch((err) => {
          //     return res.status(400).json({ errors: err });
          //   });
        } else {
          return res.status(400).send({
            amount: "There is no enough eth of your address",
          });
        }
      }
    });
  } else if (flag === "hdt") {
    var tokenInst = new Web3.eth.Contract(tokenABI.tokenABI, tokenAddress);
    tokenInst.methods
      .balanceOf(address)
      .call()
      .then(function (bal) {
        console.log(bal);
      });
    // userdata.countHDT = userdata.countHDT + amount;
    // userdata
    //   .save()
    //   .then((item) => {
    //     return res.status(200).json({ msg: "success" });
    //   })
    //   .catch((err) => {
    //     return res.status(400).json({ errors: err });
    //   });
  }
});

module.exports = router;
