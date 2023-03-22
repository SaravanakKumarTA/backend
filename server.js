const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routeURLs = require("./routes/route");
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.DB_ACCESS).then(()=>{
  console.log("connection successful")
}).catch((err)=>{
  console.log("Database Connection err",err)
});

app.use(express.json());
app.use(cors());
app.use("/app", routeURLs);

app.listen(4000, () => {
  console.log("Server up and running ");
});
