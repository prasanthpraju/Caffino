const express = require("express");
const {
  addProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();    

// ROUTES
router.get("/", getProducts);
router.post("/", protect, adminOnly, addProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
