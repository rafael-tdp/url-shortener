/**
 * URL validation utility for frontend
 */

const URL_REGEX = /^https?:\/\/.+/i;

/**
 * Validates if a string is a valid URL
 * @param {string} url - URL to validate
 * @returns {Object} { isValid: boolean, error?: string }
 */
export function validateUrl(url: string): { isValid: boolean; error?: string } {
	if (!url || url.trim().length === 0) {
		return { isValid: false, error: "Veuillez entrer une URL" };
	}

	if (!URL_REGEX.test(url)) {
		return { isValid: false, error: "Format d'URL invalide (http:// ou https://)" };
	}

	return { isValid: true };
}

/**
 * Extracts the domain from a URL
 * @param {string} url - URL to extract domain from
 * @returns {string} Domain name or empty string if invalid
 */
export function extractDomain(url: string): string {
	try {
		return new URL(url).hostname;
	} catch {
		return "";
	}
}
