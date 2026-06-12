import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://gnf-delta.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Gates Business API Running 🚀");
});

app.use("/api/products", productRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/dashboard/products", productRoutes);
app.use("/dashboard/enquiries", enquiryRoutes);

const PORT = process.env.PORT || 1503;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`mongodb connected: ${process.env.MONGO_URI}`);
});