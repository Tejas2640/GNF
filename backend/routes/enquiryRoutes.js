import express from "express";
import {
  createEnquiry,
  getEnquiries,
  deleteEnquiry,
  updateEnquiryStatus,
} from "../controllers/enquiryController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// PUBLIC
router.post("/", createEnquiry);

// ADMIN
router.get("/", protect, getEnquiries);
router.delete("/:id", protect, deleteEnquiry);
router.put("/:id", protect, updateEnquiryStatus);

export default router;