const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routeURLs = require("./routes/route");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
//db connenction
dotenv.config();
mongoose
  .connect(process.env.DB_ACCESS)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log("Database Connection err", err);
  });

app.use(express.json());
//cors no use for now
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
//session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "i;B,<tf0>p'M6*.Y-~~C* W3NZUrE+Or/&d`C+DI'+AfW#DgLX(Z7zN#)WX(YX2U",
    cookie: {
      sameSite: "lax",
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_ACCESS, //YOUR MONGODB URL
      ttl: 1000 * 24 * 60 * 60,
      autoRemove: "native",
    }),
  })
);
app.use("/app", routeURLs);
var productroute = require("./routes/route");
app.listen(4000, () => {
  console.log("Server up and running ");
});
