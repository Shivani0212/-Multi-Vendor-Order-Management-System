const express = require("express");
const { placeOrder } = require("../controllers/order.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/placeorder", authMiddleware, placeOrder);

module.exports = router;
