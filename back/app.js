import express from "express";
import sequelize from "./config/database.js";
import linkRoutes from "./routes/linkRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", linkRoutes);

// Initialize database
export async function initializeDatabase() {
	try {
		await sequelize.authenticate();
		console.log("Connected to PostgreSQL");

		await sequelize.sync();
		console.log("Database synchronized");
	} catch (error) {
		console.error("Database connection failed:", error.message);
		process.exit(1);
	}
}

export default app;
