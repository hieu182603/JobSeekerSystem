import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    requirements: String,
    jobType: String,
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "USD",
      },
    },
    location: {
      city: String,
      country: String,
    },
    status: {
      type: String,
      default: "open",
    },
    views: {
      type: Number,
      default: 0,
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "jobs",
  }
);

const Jobs = mongoose.model("Job", JobSchema);

export default Jobs;
