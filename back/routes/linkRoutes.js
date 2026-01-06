import express from "express";
import { createLink, redirectLink } from "../controllers/linkController.js"

const router = express.Router();

router.post("/api/links", createLink);

// Public redirect endpoint
router.get("/r/:slug", redirectLink);

export default router;
