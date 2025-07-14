import express from "express";
import { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } from "../controllers/productController.js";
let router = express.Router();

router.post("/create", createProduct);
router.get("/", getAllProducts)
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;