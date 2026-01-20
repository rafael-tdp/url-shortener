import { ERROR_MESSAGES } from "../config/constants.js";

/**
 * Validates if a string is a valid URL
 * @param {string} url - The URL to validate
 * @returns {Object} { isValid: boolean, error?: string }
 */
export function validateUrl(url) {
	if (!url || typeof url !== "string") {
		return { isValid: false, error: ERROR_MESSAGES.MISSING_URL };
	}

	if (url.trim().length === 0) {
		return { isValid: false, error: ERROR_MESSAGES.MISSING_URL };
	}

	try {
		new URL(url);
		return { isValid: true };
	} catch {
		return { isValid: false, error: ERROR_MESSAGES.INVALID_URL_FORMAT };
	}
}

/**
 * Validates if a slug exists and is valid
 * @param {string} slug - The slug to validate
 * @returns {Object} { isValid: boolean, error?: string }
 */
export function validateSlug(slug) {
	if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
		return { isValid: false, error: ERROR_MESSAGES.SLUG_NOT_FOUND };
	}

	return { isValid: true };
}
