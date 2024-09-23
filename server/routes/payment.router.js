import express from "express";
import { verifyAdmin, verifyToken } from "../midleware/verifyToken.js";
import { bookingTicket,verifySubscription,allPayments,getRazorpayApiKey } from "../controllers/payment.controller.js";
const router = express.Router();

router.post('/booking',verifyToken, bookingTicket);
router.post( '/verify',verifyToken,verifySubscription);
router.get('/razorpay-key', getRazorpayApiKey);
router.get('/',verifyAdmin, allPayments);

export default router;