const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product"
  );
  res.json(cart || { items: [] });
};

 exports.addToCart = async (req, res) => {
  // 🔐 MUST BE FIRST LINE
  if (!req.user) {
    return res.status(401).json({ message: "Login required" });
  }

  const { productId, qty = 1 } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: [{ product: productId, qty }],
    });
  } else {
    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (item) item.qty += qty;
    else cart.items.push({ product: productId, qty });

    await cart.save();
  }

  res.json(cart);
};


exports.updateCart = async (req, res) => {
  const { productId, qty } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });
  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );
  if (item) item.qty = qty;
  await cart.save();
  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  cart.items = cart.items.filter(
    (i) => i.product.toString() !== req.params.productId
  );
  await cart.save();
  res.json(cart);
};
