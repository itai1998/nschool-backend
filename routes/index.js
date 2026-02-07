import express from "express";
import productRoutes from "./product.js";
import authRoutes from "./auth.js";
import orderRoutes from "./order.js";
import userRoutes from "./user.js";

const router = express.Router();

router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);

export default router;
