const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.checkout = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ user: req.user.id }).session(session);
    if (!cart || cart.items.length === 0)
      throw new Error("Cart empty");

    let total = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product).session(session);

      if (product.stock < item.quantity)
        throw new Error("Insufficient stock");

      product.stock -= item.quantity;
      await product.save({ session });

      total += item.quantity * item.priceAtTime;
    }

    const order = await Order.create(
      [{
        user: req.user.id,
        items: cart.items,
        totalAmount: total
      }],
      { session }
    );

    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();
    res.json(order);

  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};
