import mongoose from "mongoose";
import Job from "../jobs/job.model.js";
import JobApplication from "./jobApplication.model.js";

export const getCompanyApplicants = async (req, res) => {
    try {
        const recruiterId = req.user.userId;

        const jobs = await Job.find({ recruiterId }).select("_id");

        if (!jobs.length) {
            return res.status(200).json({
                applicants: [],
                total: 0,
            });
        }

        const jobIds = jobs.map(job => job._id);

        const applications = await JobApplication.find({
            jobId: { $in: jobIds }
        })
            .populate("jobseekerId", "name email phone")
            .populate("jobId", "title")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            applicants: applications,
            total: applications.length,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const scheduleInterview = async (req, res) => {
    try {
        const recruiterId = req.user?.userId;
        if (!recruiterId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;
        const { interviewDate } = req.body;

        if (!interviewDate) {
            return res.status(400).json({
                message: "Interview date is required",
            });
        }

        const application = await JobApplication.findById(id);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        const job = await Job.findById(application.jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        if (job.recruiterId.toString() !== recruiterId.toString()) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // ✅ Set interview
        application.interviewDate = new Date(interviewDate);
        application.status = "interview";

        await application.save();

        return res.status(200).json({
            message: "Interview scheduled successfully",
            data: application,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const rejectApplication = async (req, res) => {
    try {
        const recruiterId = req.user?.userId;
        if (!recruiterId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;

        const application = await JobApplication.findById(id);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        const job = await Job.findById(application.jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        if (job.recruiterId.toString() !== recruiterId.toString()) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // ✅ Reject
        application.status = "rejected";
        application.interviewDate = null;

        await application.save();

        return res.status(200).json({
            message: "Application rejected successfully",
            data: application,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};



