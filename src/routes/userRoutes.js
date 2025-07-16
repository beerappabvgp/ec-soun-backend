import express from "express";
import { registerUser, loginUser, addToCart } from "../controllers/userController.js";

let router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/add-to-cart", addToCart)

export default router;