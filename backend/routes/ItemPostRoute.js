import express from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItemStatus,
  getMyItems,
} from "../controllers/itemController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// user actions
router.post("/", protect, createItem);
router.get("/my", protect, getMyItems);
router.get("/:id", protect, getItemById);

// public listing
router.get("/", getAllItems);

// admin control
router.patch("/:id/status", protect, adminOnly, updateItemStatus);

export default router;
