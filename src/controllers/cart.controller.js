const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!quantity || quantity < 1) {
      const error = new Error("Invalid quantity");
      error.statusCode = 400;
      throw error;
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        priceAtTime: product.price,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
    );

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      const error = new Error("Cart not found");
      error.statusCode = 404;
      throw error;
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed",
      cart,
    });
  } catch (err) {
    next(err);
  }
};
