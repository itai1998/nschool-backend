import express from "express";
import {
  getAllOrderItems,
  getOrderItem,
  createOrderItem,
  createOrderItems,
  updateOrderItem,
  deleteOrderItem,
} from "../controllers/orderItemController.js";

const router = express.Router();

/**
 * @swagger
 * /orderItems:
 *   get:
 *     summary: Get all order items
 *     tags: [OrderItems]
 *     responses:
 *       200:
 *         description: List of all order items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItem'
 *       500:
 *         description: Server error
 */
router.get("/", getAllOrderItems);

/**
 * @swagger
 * /orderItems/bulk:
 *   post:
 *     summary: Create multiple order items (bulk)
 *     description: Request body must be a JSON array of order item objects (not wrapped in an object).
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             minItems: 1
 *             items:
 *               type: object
 *               required:
 *                 - order_id
 *                 - product_id
 *                 - quantity
 *                 - unit_price
 *               properties:
 *                 order_id:
 *                   type: integer
 *                 product_id:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *                 unit_price:
 *                   type: number
 *                   format: decimal
 *           example:
 *             - order_id: 1
 *               product_id: 10
 *               quantity: 2
 *               unit_price: 19.99
 *             - order_id: 1
 *               product_id: 11
 *               quantity: 1
 *               unit_price: 49.5
 *     responses:
 *       201:
 *         description: All items created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Body is not a non-empty array
 *       500:
 *         description: Server error
 */
router.post("/bulk", createOrderItems);

/**
 * @swagger
 * /orderItems/{id}:
 *   get:
 *     summary: Get an order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order item ID
 *     responses:
 *       200:
 *         description: Order item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getOrderItem);

/**
 * @swagger
 * /orderItems:
 *   post:
 *     summary: Create a new order item
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - product_id
 *               - quantity
 *               - unit_price
 *             properties:
 *               order_id:
 *                 type: integer
 *                 description: Order ID
 *               product_id:
 *                 type: integer
 *                 description: Product ID
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *               unit_price:
 *                 type: number
 *                 format: decimal
 *                 description: Unit price of the product
 *     responses:
 *       201:
 *         description: Order item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       500:
 *         description: Server error
 */
router.post("/", createOrderItem);

/**
 * @swagger
 * /orderItems/{id}:
 *   put:
 *     summary: Update an order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *                 description: Order ID
 *               product_id:
 *                 type: integer
 *                 description: Product ID
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *               unit_price:
 *                 type: number
 *                 format: decimal
 *                 description: Unit price of the product
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateOrderItem);

/**
 * @swagger
 * /orderItems/{id}:
 *   delete:
 *     summary: Delete an order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order item ID
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteOrderItem);

export default router;
