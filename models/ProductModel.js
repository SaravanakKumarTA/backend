const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    objectid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      require: true,
    },
    comments: {
      type: String,
      require: true,
    },
    reviews: {
      type: String,
      require: true,
    },
  },
  {
    timeStamps: true,
  }
);
const productSchema = mongoose.Schema(
  {
    seller: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    //reviews: [reviewSchema],
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("products", productSchema);
