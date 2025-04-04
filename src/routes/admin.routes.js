const express = require("express");
const {
  revenuePerVendor,
  top5Products,
  averageOrderValue,
} = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/auth.middleware");
const rbac = require("../middleware/rbac.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-related analytics and reports
 */

/**
 * @swagger
 * /api/admin/revenue:
 *   get:
 *     summary: Get total revenue per vendor
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Revenue per vendor fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Vendor ID
 *                     example: "66141c5ab345f0416df3a000"
 *                   totalRevenue:
 *                     type: number
 *                     example: 5000.75
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch revenue data
 */
router.get("/revenue", authMiddleware, rbac(["admin"]), revenuePerVendor);

/**
 * @swagger
 * /api/admin/top-products:
 *   get:
 *     summary: Get top 5 products by sales
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top 5 products retrieved successfully
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
 *                   sales:
 *                     type: number
 *                     example: 140
 *                   price:
 *                     type: number
 *                     example: 19.99
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch top products
 */
router.get("/top-products", authMiddleware, rbac(["admin"]), top5Products);

/**
 * @swagger
 * /api/admin/avg-order-value:
 *   get:
 *     summary: Get average order value per customer
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Average order value retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   customerId:
 *                     type: string
 *                     example: "660e0fa3b123af14fd234c87"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   averageOrderValue:
 *                     type: number
 *                     example: 125.50
 *                   totalOrders:
 *                     type: integer
 *                     example: 4
 *                   totalSpent:
 *                     type: number
 *                     example: 502.00
 *       403:
 *         description: Access denied - Admin only
 *       500:
 *         description: Failed to fetch customer analytics
 */
router.get("/avg-order-value", authMiddleware, rbac(["admin"]), averageOrderValue);

module.exports = router;
