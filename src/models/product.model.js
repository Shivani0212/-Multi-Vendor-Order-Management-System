const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Vendor reference
  category: { type: String, required: true },
  sales: { type: Number, default: 0 }, // Track sales count
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
