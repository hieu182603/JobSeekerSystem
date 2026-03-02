import Job from "./job.model.js";
import JobApplication from "./jobApplication.model.js";

/* ========================= */
/* Tạo Job */
/* ========================= */
const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ========================= */
/* Apply Job */
/* ========================= */
const applyJob = async (req, res) => {
  try {
    const { jobId, jobseekerId, resumeUrl } = req.body;

    const application = await JobApplication.create({
      jobId,
      jobseekerId,
      resumeUrl,
    });

    await Job.findByIdAndUpdate(jobId, {
      $inc: { applicationsCount: 1 },
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ========================= */
/* Recruiter xem danh sách apply */
/* ========================= */
const getJobWithApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId)
      .populate("recruiterId", "name email");

    const applicants = await JobApplication.find({ jobId })
      .populate("jobseekerId", "name email phone");

    res.json({
      job,
      applicants,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMyJobs = async (req, res) => {
  try {
    const recruiterId = req.user.userId; // lấy từ middleware

    const jobs = await Job.find({ recruiterId })
      .sort({ createdAt: -1 }); // mới nhất trước

    res.status(200).json({
      message: "Lấy danh sách job thành công",
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi lấy danh sách job",
    });
  }
};

export default {
  createJob,
  applyJob,
  getJobWithApplicants,
  getMyJobs
};
