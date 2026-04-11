import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  checkoutOrder,
} from "../controllers/orderController.js";
// import { authenticateToken } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all Apple orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Invalid token
 *       500:
 *         description: Server error
 */
router.get("/", getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getOrderById);

// TODO: Add authentication to get order by user id
//router.get("/me", authenticateToken, getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new Apple order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - shipping_address
 *               - total_amount
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: User ID
 *               shipping_address:
 *                 type: string
 *                 description: Shipping address
 *               total_amount:
 *                 type: number
 *                 format: decimal
 *                 description: Total order amount
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.post("/", createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: User ID
 *               shipping_address:
 *                 type: string
 *                 description: Shipping address
 *               total_amount:
 *                 type: number
 *                 format: decimal
 *                 description: Total order amount
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteOrder);

/**
 * @swagger
 * /orders/checkout:
 *   post:
 *     summary: Checkout - create an order with its items in one request
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - shipping_address
 *               - total_amount
 *               - items
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user placing the order
 *                 example: 1
 *               shipping_address:
 *                 type: string
 *                 description: Delivery address for the order
 *                 example: "1 Infinite Loop, Cupertino, CA 95014"
 *               total_amount:
 *                 type: number
 *                 format: decimal
 *                 description: Total price of the order
 *                 example: 1299.99
 *               items:
 *                 type: array
 *                 description: List of products being ordered
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - quantity
 *                     - unit_price
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       description: ID of the product
 *                       example: 42
 *                     quantity:
 *                       type: integer
 *                       description: Number of units ordered
 *                       example: 2
 *                     unit_price:
 *                       type: number
 *                       format: decimal
 *                       description: Price per unit at the time of purchase
 *                       example: 649.99
 *     responses:
 *       201:
 *         description: Order and items created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Bad request - items must be a non-empty array
 *       500:
 *         description: Checkout failed
 */
router.post("/checkout", checkoutOrder);

export default router;
