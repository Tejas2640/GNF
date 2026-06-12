import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

dotenv.config();

// DB connect
connectDB();

const app = express();

/* ========================
   CORS CONFIG (PRODUCTION FIX)
======================== */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:1503",
  "https://gnf-delta.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"), false);
      }
    },
    credentials: true,
  })
);

/* ========================
   MIDDLEWARES
======================== */
app.use(express.json());
app.use(cookieParser());

/* ========================
   HEALTH CHECK ROUTE
======================== */
app.get("/", (req, res) => {
  res.send("🚀 GNF API Running Successfully");
});

/* ========================
   ROUTES
======================== */
app.use("/api/products", productRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/admin", adminRoutes);

/* (optional legacy routes - remove if not needed) */
app.use("/dashboard/products", productRoutes);
app.use("/dashboard/enquiries", enquiryRoutes);

/* ========================
   GLOBAL ERROR HANDLER
======================== */
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ========================
   START SERVER
======================== */
const PORT = process.env.PORT || 1503;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 MongoDB: Connected`);
});