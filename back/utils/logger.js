import { CONFIG } from "../config/constants.js";

/**
 * Simple logger utility
 * Supports different log levels: debug, info, warn, error
 */
const LOG_LEVELS = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3,
};

const currentLogLevel = LOG_LEVELS[CONFIG.LOG_LEVEL] || LOG_LEVELS.info;

const logger = {
	debug: (...args) => {
		if (currentLogLevel <= LOG_LEVELS.debug) {
			console.log("[DEBUG]", ...args);
		}
	},

	info: (...args) => {
		if (currentLogLevel <= LOG_LEVELS.info) {
			console.log("[INFO]", ...args);
		}
	},

	warn: (...args) => {
		if (currentLogLevel <= LOG_LEVELS.warn) {
			console.warn("[WARN]", ...args);
		}
	},

	error: (...args) => {
		if (currentLogLevel <= LOG_LEVELS.error) {
			console.error("[ERROR]", ...args);
		}
	},
};

export default logger;
