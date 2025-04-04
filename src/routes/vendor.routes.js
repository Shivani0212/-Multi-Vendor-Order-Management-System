const express = require("express");
const { getDailySales, getLowStockItems } = require("../controllers/vendor.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/sales", authMiddleware, getDailySales);
router.get("/low-stock", authMiddleware, getLowStockItems);

module.exports = router;
