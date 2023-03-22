const express = require("express");
const router = express.Router();
const SignUpTempCopy = require("../models/SignUpModels");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const saltPwd = await bcrypt.genSalt(10);
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
    res.status(200).json(signedUpUser);
  } catch (e) {
    console.log(e);
    res.status(400).json({ e: e.message });
  }
});

module.exports = router;
