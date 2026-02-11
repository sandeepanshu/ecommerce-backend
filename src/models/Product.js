const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: String,
    category: { type: String, required: true, index: true },
    mrp: { type: Number, required: true },
    distributorRate: { type: Number, required: true },
    retailerPrice: { type: Number, required: true },
    uomUnit: { type: String, required: true },
    uom: { type: Number, required: true },
    crt: { type: Number, required: true },
    image: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
