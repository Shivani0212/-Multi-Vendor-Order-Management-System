const Order = require("../models/order.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

// 🔹 Get Revenue Per Vendor
exports.revenuePerVendor = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $unwind: "$subOrders" },
      {
        $group: {
          _id: "$subOrders.vendorId",
          totalRevenue: { $sum: "$subOrders.totalPrice" }
        }
      }
    ]);

    res.status(200).json(revenue);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch revenue data" });
  }
};

// 🔹 Get Top 5 Products by Sales
exports.top5Products = async (req, res) => {
  try {
    const products = await Product.find().sort({ sales: -1 }).limit(5);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top products" });
  }
};

// 🔹 Get Average Order Value
exports.averageOrderValue = async (req, res) => {
  try {
    const avgValue = await Order.aggregate([
      { $group: { _id: null, avgValue: { $avg: "$totalPrice" } } }
    ]);

    res.status(200).json(avgValue);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch average order value" });
  }
};
