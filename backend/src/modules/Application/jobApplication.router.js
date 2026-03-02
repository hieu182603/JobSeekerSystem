import express from "express";
import { getCompanyApplicants, setInterviewDate } from "./jobApplication.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Lấy tất cả ứng viên apply vào các job của công ty
router.get(
    "/company/applicants",
    authMiddleware, // bắt buộc login
    getCompanyApplicants
);
router.put(
    "/:id/interview",
    authMiddleware,
    setInterviewDate
);
export default router;
