const Order = require("../models/order.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 🛑 Validate user authentication
    if (!req.user || !req.user._id) {
      throw new Error("Unauthorized: User ID is missing.");
    }
    const customerId = req.user._id;

    // 📌 Validate request body (items must be present)
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Order must contain at least one valid item.");
    }

    let totalPrice = 0;
    const subOrdersArray = [];  // ✅ Store properly structured sub-orders
    const productUpdates = [];

    // 🔍 Validate stock & prepare sub-orders
    for (const item of items) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        throw new Error(`Invalid Product ID: ${item.productId}`);
      }
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw new Error(`Invalid quantity for product: ${item.productId}`);
      }

      // 📦 Fetch product details
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }

      // 📉 Deduct stock (transaction-safe)
      product.stock -= item.quantity;
      productUpdates.push(product.save({ session }));

      // ✅ Store sub-order in correct format
      subOrdersArray.push({
        vendorId: product.vendorId,  // ✅ Ensure vendorId is stored correctly
        productId: product._id,  // ✅ Ensure productId is included
        quantity: item.quantity,  // ✅ Ensure quantity is included
        totalPrice: product.price * item.quantity,
      });

      totalPrice += product.price * item.quantity;
    }

    // 🛒 Generate master order with correctly structured sub-orders
    const order = new Order({
      customerId,
      subOrders: subOrdersArray,  // ✅ Fixed: subOrders correctly structured
      totalPrice,
      status: "pending",
    });

    // 💾 Save order & update stock
    await order.save({ session });
    await Promise.all(productUpdates);

    // ✅ Commit transaction
    await session.commitTransaction();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    // ❌ Rollback transaction on error
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};
