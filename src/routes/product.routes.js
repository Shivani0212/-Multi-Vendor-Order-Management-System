const express = require("express");
const { createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/createproduct", authMiddleware, createProduct);
router.put("/updateproduct/:id", authMiddleware, updateProduct);
router.delete("/deleteproduct/:id", authMiddleware, deleteProduct);

module.exports = router;
