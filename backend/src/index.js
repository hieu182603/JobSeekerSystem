import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import { connectDatabase } from "./config/database.js";
import { swaggerSpec } from "./config/swagger.js";

import { authRouter } from "./modules/auth/auth.router.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "*",
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Swagger
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "JobSeeker System API Documentation",
  })
);

// REGISTER ROUTES
app.use("/api/auth", authRouter);

// Error handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Server start
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost');

async function start() {
  try {
    // Validate required environment variables
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
      const displayHost = HOST === '0.0.0.0' ? 'localhost' : HOST;
      const serverUrl = `http://${displayHost}:${PORT}`;
      const docsUrl = `${serverUrl}/api/docs`;

      if (process.env.NODE_ENV !== 'production') {
        console.log("\n🚀 ========================================");
        console.log(`✅ Server đang chạy tại: ${serverUrl}`);
        console.log(`📚 API Documentation: ${docsUrl}`);
        console.log("🚀 ========================================\n");
      } else {
        console.log(`✅ Server listening on ${HOST}:${PORT}`);
        console.log(`✅ Health check available at /api/health`);
      }
    });

    // Graceful shutdown handlers
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    console.error("Error details:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  }
}

start();

