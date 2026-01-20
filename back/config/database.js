import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	logger.error("DATABASE_URL environment variable is not set");
	process.exit(1);
}

/**
 * Database connection using Sequelize ORM
 */
const sequelize = new Sequelize(DATABASE_URL, {
	dialect: "postgres",
	logging: process.env.NODE_ENV === "development" ? (msg) => logger.debug(msg) : false,
});

export default sequelize;

