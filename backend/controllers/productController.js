const Product = require("../models/Product");

// ADMIN – ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      stock,
      category,
      subCategory,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      image,
      stock,
      category,
      subCategory: subCategory.toLowerCase(), // 🔥 IMPORTANT
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
};


// USER + ADMIN – GET PRODUCTS
 exports.getProducts = async (req, res) => {
  try {
    const { category, subCategory } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    const products = await Product.find(filter);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADMIN – DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN – UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.image = req.body.image || product.image;
    product.stock = req.body.stock || product.stock;
    product.description = req.body.description || product.description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 


exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

