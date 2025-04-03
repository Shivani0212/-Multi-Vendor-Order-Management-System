const Product = require("../models/product.model");

exports.createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, vendorId: req.user.id });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Product creation failed" });
  }
};
