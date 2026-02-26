import express from "express";
import controller from "./job.controller.js";

const router = express.Router();

// Lấy toàn bộ danh sách đơn ứng tuyển (Admin dùng)
router.get("/", controller.getAllApplications);

// Tạo đơn ứng tuyển mới (Job Seeker dùng)
router.post("/", controller.createApplication);

// Lấy chi tiết 1 Job và các ứng viên đã apply vào Job đó
// Route này sẽ gọi hàm có logic populate 3 bảng mà chúng ta vừa viết
router.get("/job/:jobId", controller.getJobDetailsWithApplicants); 

export default router;