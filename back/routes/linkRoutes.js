import express from "express";
import { createLink, redirectLink } from "../controllers/linkController.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = express.Router();

/**
 * Link routes
 */

// POST /api/links - Create a new shortened link
router.post("/api/links", asyncHandler(createLink));

// GET /r/:slug - Redirect to original URL
router.get("/r/:slug", asyncHandler(redirectLink));

export default router;

