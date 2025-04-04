const express = require("express");
const { getDailySales, getLowStockItems } = require("../controllers/vendor.controller");
const authMiddleware = require("../middleware/auth.middleware");
const rbac = require("../middleware/rbac.middleware");
const router = express.Router();

router.get("/sales", authMiddleware, rbac(["vendor"]), getDailySales);
router.get("/low-stock", authMiddleware, rbac(["vendor"]), getLowStockItems);

module.exports = router;
