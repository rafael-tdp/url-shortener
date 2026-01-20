import app, { initializeDatabase } from "./app.js";
import http from "http";
import { CONFIG } from "./config/constants.js";
import logger from "./utils/logger.js";

app.set("port", CONFIG.PORT);

const server = http.createServer(app);

/**
 * Start the server
 */
async function start() {
	try {
		await initializeDatabase();
		server.listen(CONFIG.PORT, () => {
			logger.info(`✓ Server running on http://localhost:${CONFIG.PORT}`);
		});
	} catch (error) {
		logger.error("✗ Failed to start server:", error.message);
		process.exit(1);
	}
}

start();
