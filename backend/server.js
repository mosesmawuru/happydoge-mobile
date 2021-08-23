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
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Passport middleware
app.use(passport.initialize());
// SOCKET
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const doEveryMinute = (socket) => {
  cron.schedule("00 00 */1 * * * *", async () => {
    const emailToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getHours(),
      today.getMinutes(),
      0
    );
    const today = new Date();
    Staking.find({ endTime })
      .then((item) => {})
      .cache((err) => {
        console.log(err);
      });
  });
};
try {
  io.on("connect", (socket) => {
    console.log("socket is created");
    socket.on("join", ({}, callback) => {
      try {
      } catch (error) {}
      callback();
    });
    socket.on("join", ({}, callback) => {
      try {
        doEveryMinute(socket);
      } catch (error) {}
      callback();
    });

    socket.on("disconnect", () => {});
  });
} catch (e) {}
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
// Serve static assets in productioncd
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
