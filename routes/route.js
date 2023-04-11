const express = require("express");
const router = express.Router();
const SignUpTempCopy = require("../models/SignUpModels");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  res.send("Kumar is here");
});

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
    console.log("logged In :", req.session.username);
    res.send("userloggedIn");
    return;
  }
  console.log("not logged in logged in chk res");
  res.send("UserNotLoggedIn in logged in chk res");
});

router.post("/logout", async (req, res) => {
  if (req.session.username) {
    req.session.destroy((err) => {});
    res.send("destroyed");
  } else {
    req.session.destroy(() => {});
    res.send("UserNotLoggedIn in log out");
  }
});

router.post("/login", async (req, res) => {
  if (req.session.username) {
    res.send("userloggedIn");
  }
  const { username, password } = req.body;

  console.log(username,password);
  const users = mongoose.model("users");
  users.findOne({ username: username }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result) {
          req.session.username = username;
          console.log(req.session.username, " logging in");
          req.session.save((err) => {
            if(err){
              console.log(err);
            }
          });

          res.status(200).json("home");
          return;
        }
        if (!result) res.status(500).json("not found");
        return;
      });
    } else {
      res.status(404).json("No such Users");
      return;
    }
  });
});

module.exports = router;
