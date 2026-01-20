import { ERROR_MESSAGES, HTTP_STATUS } from "../config/constants.js";
import logger from "../utils/logger.js";

/**
 * Global error handling middleware
 * Must be added after all other middlewares and routes
 *
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export function errorHandler(err, req, res, next) {
	const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
	const message = err.message || ERROR_MESSAGES.INTERNAL_ERROR;

	logger.error(`[${req.method}] ${req.path} - Status: ${statusCode} - ${message}`);

	// Don't expose internal error details in production
	const response = {
		error: message,
		...(process.env.NODE_ENV === "development" && { details: err.originalError?.message }),
	};

	res.status(statusCode).json(response);
}

/**
 * Async error wrapper for route handlers
 * Wraps async functions to catch and pass errors to error handler
 *
 * @param {Function} fn - The async route handler
 * @returns {Function} Wrapped function
 */
export function asyncHandler(fn) {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}
