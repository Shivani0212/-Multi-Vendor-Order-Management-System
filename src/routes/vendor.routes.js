const express = require("express");
const {
  getDailySales,
  getLowStockItems,
} = require("../controllers/vendor.controller");
const authMiddleware = require("../middleware/auth.middleware");
const rbac = require("../middleware/rbac.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vendor
 *   description: Vendor-related operations like sales and inventory
 */

/**
 * @swagger
 * /api/vendor/sales:
 *   get:
 *     summary: Get daily sales data for the last 7 days
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily sales data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "2024-04-01"
 *                   totalSales:
 *                     type: integer
 *                     example: 25
 *       401:
 *         description: Unauthorized - JWT required
 *       500:
 *         description: Internal server error
 */
router.get("/sales", authMiddleware, rbac(["vendor"]), getDailySales);

/**
 * @swagger
 * /api/vendor/low-stock:
 *   get:
 *     summary: Get products with low stock (less than 5 items)
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of low-stock products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "660e1106b123af14fd234c9e"
 *                   name:
 *                     type: string
 *                     example: "T-shirt"
 *                   stock:
 *                     type: number
 *                     example: 2
 *                   vendorId:
 *                     type: string
 *                     example: "660e0fa3b123af14fd234c87"
 *                   price:
 *                     type: number
 *                     example: 19.99
 *       401:
 *         description: Unauthorized - JWT required
 *       500:
 *         description: Internal server error
 */
router.get("/low-stock", authMiddleware, rbac(["vendor"]), getLowStockItems);

module.exports = router;
