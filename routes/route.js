const express = require("express");
const router = express.Router();
const SignUpTempCopy = require("../models/SignUpModels");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const session = require("express-session");

router.post("/signup", async (req, res) => {
  const saltPwd = await bcrypt.genSalt(12);
  const securePwd = await bcrypt.hash(req.body.password, saltPwd);
  req.body.password = securePwd;
  const { username, email, company, password } = req.body;
  try {
    const signedUpUser = await SignUpTempCopy.create({
      username,
      email,
      company,
      password,
    });
    req.session.name = username;
    res.status(200).json({ username: signedUpUser.username });
  } catch (e) {
    console.log(e);
    res.status(400).json({ e: e.message });
  }
});



router.post("/loggedIn", async (req, res) => {
  if (req.session.username) {
    console.log(req.session.username);
    res.send("userloggedIn");
  } else {
    res.send("UserNotLoggedIn");
  }
});



router.post("/login", async (req, res) => {
  if (req.session.username) {
    console.log(req.session.username);
    res.send("userloggedIn");
  }
  console.log(req.session.username);
  const { username, password } = req.body;
  const users = mongoose.model("users");
  users
    .findOne({ username: username })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            console.log(req.sessionID);
            req.session.username = username;
            // console.log(req.session);
            res.status(200).json("home");
          }
          if (!result) res.status(500).json("not found");
        });
      } else {
        res.status(404).json("No such Users");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
