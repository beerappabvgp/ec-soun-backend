import express from "express";
import { registerUser, loginUser, addToCart, getAllCartProducts, deleteProductFromCart, updateCartProduct } from "../controllers/userController.js";

let router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/add-to-cart", addToCart)
router.get("/cart-products/:userId", getAllCartProducts);
router.delete("/delete-product/:userId/:productId", deleteProductFromCart)
router.put("/update-cart-product", updateCartProduct);
export default router;