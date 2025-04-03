const Order = require("../models/order.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const items = req.body.items;
    const subOrders = [];

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product || product.stock < item.quantity) {
        throw new Error("Stock unavailable");
      }

      product.stock -= item.quantity;
      await product.save({ session });

      subOrders.push({ vendorId: product.vendorId, productId: product._id, quantity: item.quantity });
    }

    const order = new Order({ customerId: req.user.id, subOrders });
    await order.save({ session });

    await session.commitTransaction();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};
