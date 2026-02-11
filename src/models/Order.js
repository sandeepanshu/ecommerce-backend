const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        product: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        priceAtTime: Number
      }
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
