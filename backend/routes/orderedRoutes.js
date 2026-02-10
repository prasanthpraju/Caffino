const express = require("express");
const {
  placeOrder,
  getAllOrders,
} = require("../controllers/orderedController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// USER – PLACE ORDER
router.post("/", protect, placeOrder);

// ADMIN – VIEW ALL ORDERS
router.get("/", protect, adminOnly, getAllOrders);

module.exports = router;
