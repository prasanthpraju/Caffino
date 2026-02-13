const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  bannerCategory: { 
    type: String, 
    required: true 
  },
  bannerSubCategory: { 
    type: String,
    default: ""
  },
  sectionType: { 
    type: String, 
    enum: ["hero", "feature", "gallery"], 
    default: "",
    required: true 
  },
  mediaType: { 
    type: String, 
    enum: ["video", "image"], 
    required: true 
  },
  resource: {
    type: String, 
    required: true
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("Banner", bannerSchema);