import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";

import { connectDatabase } from "./config/database.js";
import { swaggerSpec } from "./config/swagger.js";

import { authRouter } from "./modules/auth/auth.router.js";
import { cvRouter } from "./modules/cv/cv.router.js";
import { userRouter } from "./modules/users/user.router.js";

import applicationRouter from "./modules/application/application.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ===== HEALTH CHECK =====
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ===== SWAGGER =====
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "JobSeeker System API Documentation",
  })
);

// ===== REGISTER ROUTES =====
app.use("/api/auth", authRouter);
app.use("/api/cv", cvRouter);
app.use("/api/users", userRouter);
app.use("/api/applications", applicationRouter);


// ===== ERROR HANDLER =====
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

// ===== 404 FALLBACK =====
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ===== SERVER START =====
const PORT = process.env.PORT || 4000;
const HOST =
  process.env.HOST ||
  (process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost");

async function start() {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI environment variable is required");
      process.exit(1);
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET environment variable is required");
      process.exit(1);
    }

    console.log("🔄 Connecting to database...");
    await connectDatabase();
    console.log("✅ Database connected successfully");

    const server = app.listen(PORT, HOST, () => {
      const displayHost = HOST === "0.0.0.0" ? "localhost" : HOST;
      const serverUrl = `http://${displayHost}:${PORT}`;

      console.log("\n🚀 ========================================");
      console.log(`✅ Server running at: ${serverUrl}`);
      console.log(`📚 Swagger: ${serverUrl}/api/docs`);
      console.log("🚀 ========================================\n");
    });

    process.on("SIGTERM", () => {
      server.close(() => process.exit(0));
    });

    process.on("SIGINT", () => {
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

start();
