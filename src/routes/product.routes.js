const express = require("express");
const { createProduct } = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["vendor"]), createProduct);

module.exports = router;
