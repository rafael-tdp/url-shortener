import Link from "../models/link.js";
import { CONFIG, ERROR_MESSAGES } from "../config/constants.js";
import { validateUrl } from "../utils/validators.js";
import logger from "../utils/logger.js";

/**
 * Service for managing shortened links
 */
export class LinkService {
	/**
	 * Creates a new shortened link
	 * @param {string} url - The original URL to shorten
	 * @returns {Promise<Object>} The created link with URL and shortened URL
	 * @throws {Error} If URL is invalid or database operation fails
	 */
	async createLink(url) {
		// Validate URL
		const validation = validateUrl(url);
		if (!validation.isValid) {
			const error = new Error(validation.error);
			error.statusCode = 400;
			throw error;
		}

		try {
			const newLink = await Link.create({ url });

			logger.info(`Created shortened link with slug: ${newLink.slug}`);

			return {
				url: newLink.url,
				shortenedUrl: `${CONFIG.BACKEND_URL}/r/${newLink.slug}`,
				slug: newLink.slug,
			};
		} catch (error) {
			logger.error(`Failed to create link for URL ${url}:`, error.message);
			const err = new Error(ERROR_MESSAGES.LINK_CREATION_FAILED);
			err.statusCode = 500;
			err.originalError = error;
			throw err;
		}
	}

	/**
	 * Retrieves a link by slug
	 * @param {string} slug - The slug to look up
	 * @returns {Promise<Object|null>} The link object or null if not found
	 * @throws {Error} If database operation fails
	 */
	async getLinkBySlug(slug) {
		try {
			const link = await Link.findOne({ where: { slug } });
			return link;
		} catch (error) {
			logger.error(`Failed to retrieve link for slug ${slug}:`, error.message);
			const err = new Error(ERROR_MESSAGES.DATABASE_ERROR);
			err.statusCode = 500;
			err.originalError = error;
			throw err;
		}
	}
}

export default new LinkService();
