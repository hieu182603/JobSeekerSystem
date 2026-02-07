import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../../utils/bcrypt.util.js";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },

    // Thông tin xác thực
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },

    // Vai trò người dùng
    role: {
      type: String,
      enum: ["ADMIN", "EMPLOYER", "JOB_SEEKER"],
      default: "JOB_SEEKER",
    },

    // Thông tin bổ sung
    phone: { type: String },
    address: { type: String },
    avatar: { type: String },
    avatarUrl: { type: String },
    isActive: { type: Boolean, default: true },

    // Thông tin cho Job Seeker
    resume: { type: String },
    skills: [{ type: String }],
    experience: { type: String },
    education: { type: String },

    // Thông tin cho Employer
    companyName: { type: String },
    companyDescription: { type: String },
    companyWebsite: { type: String },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Hash password trước khi lưu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

// So sánh mật khẩu khi đăng nhập
userSchema.methods.comparePassword = async function (candidatePassword) {
  return comparePassword(candidatePassword, this.password);
};

export const UserModel = mongoose.model("User", userSchema);

