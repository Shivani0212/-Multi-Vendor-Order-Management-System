const mongoose = require("mongoose");
const Product = require("../models/product.model");

//Create Product API
exports.createProduct = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body); // Debugging Log

    // Check if `req.body` exists and contains all required fields
    const { name, price, stock, category } = req.body;
    if (!name || !price || !stock || !category) {
      return res.status(400).json({ error: "All fields (name, price, stock, category) are required." });
    }

    // Ensure only vendors can create products
    if (!req.user || req.user.role !== "vendor") {
      return res.status(403).json({ error: "Only vendors can create products." });
    }

    // Create new product
    const product = new Product({
      name,
      price,
      stock,
      category,
      vendorId: req.user._id, // Ensure vendorId is assigned
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Product Creation Error:", error);
    res.status(500).json({ error: "Product creation failed", details: error.message });
  }
};

// Update Product API
exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const updateData = req.body;
  
      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "Invalid request: No data provided" });
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

// Delete Product API
exports.deleteProduct = async (req, res) => {
    try {
      // Validate product ID format
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
  
      // Find and delete the product
      const product = await Product.findOneAndDelete({
        _id: req.params.id,
        vendorId: req.user.id, // Ensures only the vendor can delete their own product
      });
  
      // Check if the product exists
      if (!product) {
        return res.status(404).json({ error: "Product not found or unauthorized" });
      }
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Product deletion failed" });
    }
  };

