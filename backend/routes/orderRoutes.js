import express from "express";
import { createOrder, verifyPayment, getOrderById, getMyOrders } from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/verify", verifyPayment);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", getOrderById);

export default router;
