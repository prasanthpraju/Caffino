const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 1,
    },

    // 🔥 MAIN CATEGORY
    category: {
      type: String,
      required: true,
      enum: ["coffee", "equipment", "accessories"],
    },

    // 🔥 SUB CATEGORY
    subCategory: {
      type: String,
      required: true,
      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
