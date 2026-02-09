const Cart = require("../models/Cart");

// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, qty: 1 }],
      });
    } else {
      const index = cart.items.findIndex(
        (i) => i.product.toString() === productId
      );

      if (index > -1) {
        cart.items[index].qty += 1;
      } else {
        cart.items.push({ product: productId, qty: 1 });
      }
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CART
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE QTY
exports.updateQty = async (req, res) => {
  const { productId, qty } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (item) item.qty = qty;
  await cart.save();

  res.json(cart);
};

// REMOVE ITEM
exports.removeItem = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  cart.items = cart.items.filter(
    (i) => i.product.toString() !== productId
  );
  await cart.save();

  res.json(cart);
};
