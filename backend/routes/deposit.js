const express = require("express");
const router = express.Router();
const { hdtABI, ethABI } = require("../constant/tokenABI");
//@import models
const User = require("../models/User");
const Deposit = require("../models/Deposit");
const Price = require("../models/Exchange");
const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
router.post("/", async (req, res) => {
  const flag = "hdt";
  const amount = 100;
  const price = await Price.find();
  // console.log(price[0].price);
  // const { address, flag, amount } = req.body;
  // if (amount <= 0) {
  //   return res.status(400).send({
  //     amount: "Please input correct amount",
  //   });
  // }
  const address = "0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E";
  const userdata = await User.findOne({ address });
  const adminAddress = "0xbC6661e61539a3e33F9E5C4AD2952770c62a128b";
  const tokenAddress = "0x08895697055b82890a312dfc9f52df907d8fd001";
  const privateKey =
    "09629aa26282f4f6bb7d9792a18e77cc2bcd0fbbb2113ccfeaf7933d45080738";
  const contractAddress = "0x08895697055b82890a312dfc9f52df907d8fd001";

  const web3 = await new Web3(
    new Web3.providers.HttpProvider(
      "https://mainnet.infura.io/v3/43abad80628540079b649332f37de4fb"
    )
  );
  var count = await web3.eth.getTransactionCount(address);
  var gasPrice = await web3.eth.gasPrice;
  var gasLimit = 1000000;
  if (userdata) {
    if (flag === "eth") {
      web3.eth.getBalance(address, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          const realAmount = web3.fromWei(result, "ether");
          if (realAmount >= amount) {
            var rawTransaction = {
              from: address,
              nonce: web3.toHex(count),
              gasPrice: web3.toHex(gasPrice),
              gasLimit: web3.toHex(gasLimit),
              to: adminAddress,
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
                  userdata.countETH = userdata.countETH + amount;
                  userdata
                    .save()
                    .then((item) => {
                      return res.status(200).json({ msg: "success" });
                    })
                    .catch((err) => {
                      return res.status(400).json({ errors: err });
                    });
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
      var contract = web3.eth.contract(hdtABI).at(contractAddress);

      // // Call balanceOf function
      contract.balanceOf(address, (error, balance) => {
        // Get decimals
        contract.decimals((error, decimals) => {
          // calculate a balance
          balance = balance.div(10 ** decimals);
          if (balance >= amount) {
            console.log(amount);
          } else {
            return res.status(400).send({
              amount: "Not Sufficiant Balance",
            });
          }
        });
      });

      //   var data = contract.transfer.getData(adminAddress, 100, {
      //     from: address,
      //   });
      //   var rawTransaction = {
      //     from: address,
      //     nonce: web3.toHex(count),
      //     gasPrice: web3.toHex(gasPrice),
      //     gasLimit: web3.toHex(gasLimit),
      //     to: adminAddress,
      //     data: data,
      //     chainId: 0x01,
      //   };
      //   var tx = new Tx(rawTransaction, {
      //     chain: "mainnet",
      //     hardfork: "petersburg",
      //   });
      //   var privKey = Buffer.from(privateKey, "hex");
      //   tx.sign(privKey);
      //   var serializedTx = tx.serialize();
      //   web3.eth.sendRawTransaction(
      //     "0x" + serializedTx.toString("hex"),
      //     function (err, hash) {
      //       if (!err) console.log(hash);
      //       else console.log(err);
      //     }
      //   );
    }
  } else {
    return res.status(400).send({
      err: "User not found",
    });
  }
});

module.exports = router;
