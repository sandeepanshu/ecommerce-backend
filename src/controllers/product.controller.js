const Product = require("../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    const {
      title,
      category,
      description,
      mrp,
      distributorRate,
      retailerPrice,
      uomUnit,
      uom,
      crt,
      price,
      stock,
    } = req.body;

    if (
      !title ||
      !category ||
      mrp == null ||
      distributorRate == null ||
      retailerPrice == null ||
      !uomUnit ||
      uom == null ||
      crt == null ||
      price == null ||
      stock == null
    ) {
      const error = new Error("All required fields must be provided");
      error.statusCode = 400;
      throw error;
    }

    const image = req.file ? req.file.filename : null;

    const product = await Product.create({
      title,
      category,
      description,
      mrp,
      distributorRate,
      retailerPrice,
      uomUnit,
      uom,
      crt,
      price,
      stock,
      image,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get Products with Pagination + Category Filter
exports.getProducts = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, category } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = { isActive: true };

    if (category) {
      query.category = category;
    }

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Soft Delete Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
