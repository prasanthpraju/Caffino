const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");

const router = express.Router();

// 🔐 ALL CART ROUTES PROTECTED
router.use(protect);

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update", updateCart);
router.delete("/remove/:productId", removeFromCart);

module.exports = router;
