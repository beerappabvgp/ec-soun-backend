import express from "express";
import { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
let router = express.Router();

router.post("/create", authMiddleware, createProduct);
router.get("/", getAllProducts)
router.get("/:id", getProductById);
router.put("/:id",authMiddleware, updateProductById);
router.delete("/:id",authMiddleware, deleteProductById);

export default router;