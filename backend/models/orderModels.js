import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    name: { type: String },
    email: { type: String },
    contact: { type: String },
    items: [
      {
        itemId: { type: String },
        quantity: { type: Number },
      },
    ],
    address: { type: String },
    status: { type: String, default: "Paid" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
