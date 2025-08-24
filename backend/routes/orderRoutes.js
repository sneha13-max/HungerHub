import express from "express";
import Order from "../models/orderModels.js";

const router = express.Router();

router.post("/save-order", async (req, res) => {
  try {
    const {
      paymentId,
      amount,
      currency,
      name,
      email,
      contact,
      items,
      address,
    } = req.body;

    const newOrder = new Order({
      paymentId,
      amount,
      currency,
      name,
      email,
      contact,
      items,
      address,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ success: true, message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ success: false, message: "Failed to save order" });
  }
});

export default router;
