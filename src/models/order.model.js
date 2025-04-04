const mongoose = require("mongoose");

const SubOrderSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true } // Store total price for each sub-order
});

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subOrders: [SubOrderSchema], // Split orders per vendor
  totalPrice: { type: Number, required: true }, // Store total order price
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
