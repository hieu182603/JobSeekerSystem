import express from "express";
import {
    getCompanyApplicants,
    scheduleInterview,
    rejectApplication
} from "./jobApplication.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

// 🔹 Lấy tất cả ứng viên của company
router.get(
    "/company/applicants",
    authMiddleware,
    getCompanyApplicants
);

// 🔹 Đặt lịch phỏng vấn
router.put(
    "/:id/interview",
    authMiddleware,
    scheduleInterview
);

// 🔹 Reject ứng viên
router.put(
    "/:id/reject",
    authMiddleware,
    rejectApplication
);

export default router;
