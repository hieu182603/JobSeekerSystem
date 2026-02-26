import Job from "./job.model.js";
import JobApplicationModel from "./jobApplication.model.js";
import mongoose from "mongoose";

/**
 * @swagger
 * tags:
 *   name: Application
 *   description: Job application management
 */

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Application]
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       500:
 *         description: Server error
 */
const getAllApplications = async (req, res) => {
  try {
    const applications = await Job.find()
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @swagger
 * /api/applications/{jobId}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Job]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job detail
 *       400:
 *         description: Invalid jobId
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.isValidObjectId(jobId)) {
      return res.status(400).json({ message: "Invalid jobId" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @swagger
 * /api/applications/job/{jobId}:
 * get:
 * summary: "Xem chi tiết 1 Job và danh sách ứng viên"
 * description: "Lấy thông tin công việc và toàn bộ danh sách User đã ứng tuyển."
 * tags: [Application]
 * parameters:
 * - in: path
 * name: jobId
 * required: true
 * schema:
 * type: string
 * description: "ID của công việc (ví dụ: 69a0122cc192...)"
 * responses:
 * 200:
 * description: "Thành công"
 * 404:
 * description: "Không tìm thấy Job"
 */
const getJobDetailsWithApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Truy vấn song song Job (bảng 1) và Applications (bảng 2)
    const [job, applications] = await Promise.all([
      Job.findById(jobId).lean(),
      JobApplicationModel.find({ jobId }).populate("jobseekerId", "name email phone").lean()
      // populate("jobseekerId") chính là liên kết sang bảng User (bảng 3)
    ]);

    if (!job) return res.status(404).json({ message: "Job không tồn tại" });

    res.status(200).json({
      ...job,
      applicants: applications
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Create new application
 *     tags: [Application]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       201:
 *         description: Application created
 *       400:
 *         description: Bad request
 */
const createApplication = async (req, res) => {
  try {
    if (!req.body.recruiterId) {
      return res.status(400).json({ message: "RecruiterId is required" });
    }

    const application = await Job.create(req.body);
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export default {
  getAllApplications,
  getJobById,
  createApplication,
  getJobDetailsWithApplicants,
};
