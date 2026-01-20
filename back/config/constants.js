/**
 * Application constants and configuration
 */

export const CONFIG = {
	// Server configuration
	PORT: process.env.PORT || 3000,
	NODE_ENV: process.env.NODE_ENV || "development",

	// Database configuration
	DATABASE_URL: process.env.DATABASE_URL,

	// Frontend URL (for CORS and URL generation)
	FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3001",
	BACKEND_URL: process.env.BACKEND_URL || "http://localhost:3000",

	// Slug configuration
	SLUG_LENGTH: 6,

	// Logging
	LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

// Error messages constants
export const ERROR_MESSAGES = {
	MISSING_URL: "URL is required",
	INVALID_URL_FORMAT: "Invalid URL format",
	SLUG_NOT_FOUND: "Link not found",
	LINK_CREATION_FAILED: "Failed to create shortened URL",
	LINK_REDIRECT_FAILED: "Failed to redirect",
	DATABASE_ERROR: "Database error occurred",
	INTERNAL_ERROR: "Internal server error",
};

// HTTP status codes
export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
};
