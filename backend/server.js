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

/* =========================
   CORS FIX (FINAL STABLE)
========================= */
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(cors({
  origin: function (origin, callback) {
    // allow Postman / server-to-server (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked Origin:", origin);
    return callback(new Error("CORS not allowed"), false);
    console.log("Request Origin:", origin);
  },
  credentials: true
}));


// FIXED PRE-FLIGHT
app.options(/.*/, cors());
/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use(cookieParser());

/* =========================
   ROUTES
========================= */
app.use("/api/products", productRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/admin", adminRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("🚀 API Running Successfully");
});

/* =========================
   ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 1503;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
  console.log(`📦 MongoDB Connected`);
});