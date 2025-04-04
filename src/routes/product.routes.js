const express = require("express");
const { createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware");
const rbac = require("../middleware/rbac.middleware");
const router = express.Router();

router.post("/createproduct", authMiddleware, rbac(["vendor"]), createProduct);
router.put("/updateproduct/:id", authMiddleware, rbac(["vendor"]), updateProduct);
router.delete("/deleteproduct/:id", authMiddleware, rbac(["vendor"]), deleteProduct);

module.exports = router;
