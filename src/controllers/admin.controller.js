const Order = require("../models/order.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

// Get Revenue Per Vendor
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

// Get Top 5 Products by Sales
exports.top5Products = async (req, res) => {
  try {
    const products = await Product.find().sort({ sales: -1 }).limit(5);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top products" });
  }
};

// Get Average Order Value
exports.averageOrderValue = async (req, res) => {
  try {
    // Only admin allowed
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$customerId",
          totalSpent: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
          averageOrderValue: { $avg: "$totalPrice" }
        }
      },
      {
        $lookup: {
          from: "users", // name of the user collection in lowercase
          localField: "_id",
          foreignField: "_id",
          as: "customer"
        }
      },
      {
        $unwind: "$customer"
      },
      {
        $project: {
          customerId: "$_id",
          name: "$customer.name",
          averageOrderValue: { $round: ["$averageOrderValue", 2] },
          totalOrders: 1,
          totalSpent: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching average order value per customer:", error);
    res.status(500).json({ error: "Failed to fetch customer analytics" });
  }
};