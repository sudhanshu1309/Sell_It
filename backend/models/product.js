const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlenght: 32,
      require: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlenght: 500,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 10,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
