const express = require("express");
const { revenuePerVendor, top5Products, averageOrderValue } = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/revenue", authMiddleware, revenuePerVendor);
router.get("/top-products", authMiddleware, top5Products);
router.get("/avg-order-value", authMiddleware, averageOrderValue);

module.exports = router;
