import express from "express";
import controller from "./job.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import Job from "./job.model.js";

const router = express.Router();

/* ===== JOB ===== */
router.post("/", authMiddleware, async (req, res) => {
    try {
        console.log("USER FROM TOKEN:", req.user); // 🔥 debug

        const job = new Job({
            ...req.body,
            recruiterId: req.user.userId
        });

        await job.save();

        res.status(201).json(job);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});


/* ===== APPLY ===== */
router.post("/apply", controller.applyJob);

/* ===== RECRUITER XEM DANH SÁCH APPLY ===== */
router.get("/:jobId/applicants", controller.getJobWithApplicants);

router.get("/job-application", authMiddleware, controller.getMyJobs);


export default router;
