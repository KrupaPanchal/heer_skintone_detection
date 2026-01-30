import Order from "../models/Order.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res) => {
    try {
        const { amount, currency = "INR", receipt } = req.body;

        // MOCK PAYMENT MODE
        if (process.env.RAZORPAY_KEY_ID === 'rzp_test_placeholder') {
            console.log("⚠️ Using Mock Payment Mode");
            return res.json({
                id: "order_mock_" + Date.now(),
                currency: currency,
                amount: amount * 100,
                status: "created"
            });
        }

        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// @desc    Verify Payment
// @route   POST /api/orders/verify
// @access  Public
export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderItems,
            shippingAddress,
            totalPrice,
            user,
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        let isAuthentic = false;

        // MOCK PAYMENT VERIFICATION
        if (process.env.RAZORPAY_KEY_ID === 'rzp_test_placeholder') {
            if (razorpay_signature === 'mock_signature') {
                isAuthentic = true;
            }
        } else {
            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(body.toString())
                .digest("hex");
            isAuthentic = expectedSignature === razorpay_signature;
        }

        if (isAuthentic) {
            const order = new Order({
                user: user ? user._id : null,
                orderItems,
                shippingAddress,
                paymentResult: {
                    id: razorpay_payment_id,
                    status: "Paid",
                    update_time: new Date().toISOString(),
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                },
                totalPrice,
                isPaid: true,
                paidAt: Date.now(),
                status: "Processing",
            });

            const createdOrder = await order.save();
            res.status(201).json({ message: "Payment Verified", orderId: createdOrder._id });
        } else {
            res.status(400).json({ message: "Invalid Signature" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
