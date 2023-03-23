const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routeURLs = require("./routes/route");
const cors = require("cors");
const session = require("express-session");

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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "i;B,<tf0>p'M6*.Y-~~C*W3NZUrE+Or/&d`C+DI'+AfW#DgLX(Z7zN#)WX(YX2U",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
      secure: false,
    },
  })
);
app.use("/app", routeURLs);

app.listen(4000, () => {
  console.log("Server up and running ");
});
