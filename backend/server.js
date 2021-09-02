const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const cron = require("node-cron");
const Staking = require("./models/Stacking");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();

// Connect Database
connectDB();

// Init Middleware
// app.use(cors());
app.use(
  cors({
    origin: ["https://www.section.io", "http://localhost:3000"],
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);
// Define Routes
app.use("/users", require("./routes/users"));
app.use("/price", require("./routes/exchange"));
app.use("/transfer", require("./routes/transfer"));
app.use("/stack", require("./routes/stacking"));
app.use("/swap", require("./routes/swap"));
app.use("/history", require("./routes/history"));
app.use("/deposit", require("./routes/deposit"));
app.use("/withdraw", require("./routes/withdraw"));
app.use("/earn", require("./routes/earn"));
app.use("/referral", require("./routes/referral"));
// Serve static assets in productioncd
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const doEveryMinute = (socket) => {
  const today = new Date();
  console.log("callEvery");
  cron.schedule("*/10 * * * * *", function () {
    const currentHour = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getHours()
    );
    Staking.find({ endTime: currentHour })
      .then((data) => {
        // if (item) {
        // } else {
        // }
        const item = { data: "adadsfdsf" };
        socket.emit("cron", item);
      })
      .cache((err) => {
        console.log(err);
      });
  });
  // cron.schedule("00 00 */1 * * * *", async () => {
  // cron.schedule("*/10 * * * * *", async () => {

  //   const today = new Date();
  //   console.log("adsfsadf");
  //   Staking.find({ endTime: currntHour })
  //     .then((item) => {
  //       console.log(item);
  //       socket.emit("cron", item);
  //     })
  //     .cache((err) => {
  //       console.log(err);
  //     });
  // });
};
// SOCKET
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
try {
  io.on("connection", (socket) => {
    console.log("New client connected");
    doEveryMinute(socket);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      // clearInterval(interval);
    });
  });
} catch (e) {}
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
