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
const productscreen = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    category: {
      type: Number,
      require: true,
    },
    productDescription: {
      type: String,
      require: true,
    },
    countInStock: {
      type: Number,
      require: true,
    },
    Rating: {
      type: Number,
      require: true,
    },
    reviews: [reviewSchema],
  },
  {
    timeStamps: true
  }
);


