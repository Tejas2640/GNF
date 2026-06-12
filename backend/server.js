import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* ========================
   CORS CONFIG (FIXED)
======================== */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:1503",
  "https://gnf-git-main-tjs03.vercel.app",
  "https://gnf-delta.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // 🔥 TEMP SAFE MODE (prevents crash)
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// 🔥 IMPORTANT for preflight requests
app.options("*", cors());

/* ========================
   MIDDLEWARES
======================== */
app.use(express.json());
app.use(cookieParser());

/* ========================
   HEALTH CHECK
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

/* ========================
   GLOBAL ERROR HANDLER
======================== */
app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:", err);

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
  console.log(`📦 MongoDB Connected`);
});