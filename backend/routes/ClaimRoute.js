import express from "express";
import {
  createClaim,
  getMyClaims,
  approveClaim,
  rejectClaim,
} from "../controllers/claimController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, createClaim);
router.get("/my", protect, getMyClaims);

// Admin routes to approve/reject
router.patch("/:id/approve", protect, adminOnly, approveClaim);
router.patch("/:id/reject", protect, adminOnly, rejectClaim);

export default router;
