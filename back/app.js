import express from "express";
import sequelize from "./config/database.js";
import linkRoutes from "./routes/linkRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import { CONFIG } from "./config/constants.js";
import { errorHandler } from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", linkRoutes);

/**
 * Initialize database connection and sync models
 * @throws {Error} If database connection fails
 */
export async function initializeDatabase() {
	try {
		await sequelize.authenticate();
		logger.info("✓ Connected to PostgreSQL");

		await sequelize.sync();
		logger.info("✓ Database synchronized");
	} catch (error) {
		logger.error("✗ Database connection failed:", error.message);
		process.exit(1);
	}
}

// Error handling middleware (must be after all routes)
app.use(errorHandler);

export default app;

