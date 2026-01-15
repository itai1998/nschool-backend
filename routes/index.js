import express from "express";
import product from "./products.js";

const router = express.Router();

router.use("/product", product);
