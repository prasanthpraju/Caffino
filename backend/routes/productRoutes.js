const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProductById,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// USER + ADMIN
router.get("/", getProducts);

// ADMIN
router.post("/", protect, adminOnly, addProduct); 
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

// GET SINGLE PRODUCT (for edit page)
router.get("/:id", getProductById);

module.exports = router;
