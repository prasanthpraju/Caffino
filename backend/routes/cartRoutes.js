const express = require("express");
const {
  addToCart,
  getCart,
  updateQty,
  removeItem,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update", protect, updateQty);
router.delete("/remove/:productId", protect, removeItem);

module.exports = router;
