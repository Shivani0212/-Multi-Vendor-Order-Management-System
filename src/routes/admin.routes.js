const express = require("express");
const { revenuePerVendor, top5Products, averageOrderValue } = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/auth.middleware");
const rbac = require("../middleware/rbac.middleware");
const router = express.Router();

router.get("/revenue", authMiddleware, rbac(["admin"]), revenuePerVendor);
router.get("/top-products", authMiddleware, rbac(["admin"]), top5Products);
router.get("/avg-order-value", authMiddleware, rbac(["admin"]), averageOrderValue);

module.exports = router;
