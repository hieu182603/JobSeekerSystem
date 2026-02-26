import express from "express";
import applicationController from "./application.controller.js";

const router = express.Router();

router.get("/", applicationController.getAllApplications);
router.get("/:id", applicationController.getApplicationById);

export default router;
