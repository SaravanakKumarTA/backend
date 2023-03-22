const mongoose = require("mongoose");

const signUpTemp = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
  password: {
    type: String,
  },
},{timestamps:true}
);

module.exports = mongoose.model("users", signUpTemp);
