import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", protect, upload.array("images", 10), createProduct);

router.get("/", getProducts);

router.delete("/:id", protect, deleteProduct);

export default router;