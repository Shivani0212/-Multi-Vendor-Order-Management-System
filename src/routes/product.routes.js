const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware");
const rbac = require("../middleware/rbac.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management by vendors
 */

/**
 * @swagger
 * /api/products/createproduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     description: Allows vendors to create a product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: Apple iPhone 14
 *               price:
 *                 type: number
 *                 example: 999.99
 *               stock:
 *                 type: number
 *                 example: 10
 *               category:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Missing fields or bad input
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */
router.post(
  "/createproduct",
  authMiddleware,
  rbac(["vendor"]),
  createProduct
);

/**
 * @swagger
 * /api/products/updateproduct/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     description: Allows vendors to update product details.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID to update
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b5c0f1d6a1b814c8f3e1a3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/updateproduct/:id",
  authMiddleware,
  rbac(["vendor"]),
  updateProduct
);

/**
 * @swagger
 * /api/products/deleteproduct/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     description: Allows vendors to delete their product.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b5c0f1d6a1b814c8f3e1a3
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found or unauthorized
 *       500:
 *         description: Product deletion failed
 */
router.delete(
  "/deleteproduct/:id",
  authMiddleware,
  rbac(["vendor"]),
  deleteProduct
);

module.exports = router;

