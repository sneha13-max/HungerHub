import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import authRouter from "./routes/authRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";

//app config
const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


//db connection
dotenv.config();
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", orderRoutes);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send({success: true, message: "API Working"});
});

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});
