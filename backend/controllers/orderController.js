const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const items = cart.items.map((i) => ({
      product: i.product._id,
      qty: i.qty,
      price: i.product.price,
    }));

    const totalAmount = items.reduce(
      (sum, i) => sum + i.price * i.qty,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "PAID",
      address,
    });

    // clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
