import app, { initializeDatabase } from "./app.js";
import http from "http";

const PORT = process.env.PORT || 3000;
app.set("port", PORT);

const server = http.createServer(app);

// Initialize database before starting server
async function start() {
	await initializeDatabase();
	server.listen(PORT, () => {
		console.log(`Server running on PORT ${PORT}`);
	});
}

start().catch(error => {
	console.error("Failed to start server:", error);
	process.exit(1);
});
