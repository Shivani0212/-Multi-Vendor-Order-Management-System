const Order = require("../models/order.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

// Get Daily Sales (Last 7 Days)
exports.getDailySales = async (req, res) => {
  try {
    const vendorId = new mongoose.Types.ObjectId(req.user.id); // Ensure ObjectId

    // Get date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const sales = await Order.aggregate([
      { $unwind: "$subOrders" }, // Flatten subOrders array
      {
        $match: {
          "subOrders.vendorId": vendorId, // Match orders for the vendor
          "createdAt": { $gte: sevenDaysAgo } // Filter last 7 days
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
          totalSales: { $sum: "$subOrders.quantity" } // Sum of quantities sold
        }
      },
      { $sort: { _id: 1 } } // Sort by date in ascending order
    ]);

    res.status(200).json(sales);
  } catch (error) {
    console.error("Error fetching daily sales:", error);
    res.status(500).json({ error: "Failed to fetch sales data" });
  }
};

// Get Low-Stock Items
exports.getLowStockItems = async (req, res) => {
  try {
    const vendorId = new mongoose.Types.ObjectId(req.user.id); // Ensure ObjectId

    const lowStockItems = await Product.find({ vendorId, stock: { $lt: 5 } });

    res.status(200).json(lowStockItems);
  } catch (error) {
    console.error("Error fetching low-stock items:", error);
    res.status(500).json({ error: "Failed to fetch low-stock items" });
  }
};
