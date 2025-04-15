import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  getAdminDashboard,
  getAllUsers,
  getAdminLogs,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect, adminOnly, getAdminDashboard);
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/logs", protect, adminOnly, getAdminLogs);

export default router;
