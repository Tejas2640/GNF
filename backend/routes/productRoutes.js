import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// memory storage (IMPORTANT for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE PRODUCT
router.post("/", protect, upload.array("images", 10), createProduct);

// GET PRODUCTS
router.get("/", getProducts);

// DELETE PRODUCT
router.delete("/:id", protect, deleteProduct);

export default router;