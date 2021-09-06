const axios = require("axios");
const getBalance = async (socket) => {
  setInterval(async () => {
    await axios
      .get("https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT")
      .then((res) => {
        // console.log(res.data.weightedAvgPrice);
        socket.emit("price", { price: res.data.weightedAvgPrice });
      });
  }, 2000);
};

module.exports = getBalance;
