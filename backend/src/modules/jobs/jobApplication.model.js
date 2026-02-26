import mongoose from "mongoose";

// Application Model
const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  jobseekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
  resumeUrl: String
}, {
  collection: 'job_applications' 
});

const JobApplicationModel = mongoose.model(
  "JobApplication",
  applicationSchema
);

export default JobApplicationModel;
