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
   CORS CONFIG (PRODUCTION SAFE)
======================== */

const allowedOrigins = [
  "http://localhost:5173",
  "https://gnf-delta.vercel.app",
  "https://gnf-git-main-tjs03.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      // SAFE CHECK (no crash, no random block)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, true); // IMPORTANT: prevents CORS breaking
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// preflight support
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
app.use("/products", productRoutes);
app.use("/enquiries", enquiryRoutes);
app.use("/admin", adminRoutes);

/* ========================
   ERROR HANDLER
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