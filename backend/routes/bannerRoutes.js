const express = require("express");
const router = express.Router();

const {
  createBanner,
  getBanners,

} = require("../controllers/bannerController");

// Admin
router.post("/", createBanner);
 

// Public
router.get("/", getBanners);

module.exports = router;
