import linkService from "../services/linkService.js";
import { validateSlug } from "../utils/validators.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../config/constants.js";
import logger from "../utils/logger.js";

/**
 * Controller for link-related HTTP requests
 */

/**
 * Creates a new shortened link from a URL
 * POST /api/links
 *
 * @param {Object} req - Express request with body.url
 * @param {Object} res - Express response
 */
export const createLink = async (req, res, next) => {
	try {
		const { url } = req.body;

		// Service handles all validation and link creation
		const result = await linkService.createLink(url);

		return res.status(HTTP_STATUS.CREATED).json(result);
	} catch (error) {
		next(error);
	}
};

/**
 * Redirects to original URL based on slug
 * GET /r/:slug
 *
 * @param {Object} req - Express request with params.slug
 * @param {Object} res - Express response
 */
export const redirectLink = async (req, res, next) => {
	try {
		const { slug } = req.params;

		// Validate slug
		const validation = validateSlug(slug);
		if (!validation.isValid) {
			const error = new Error(validation.error);
			error.statusCode = HTTP_STATUS.NOT_FOUND;
			throw error;
		}

		// Get link from service
		const link = await linkService.getLinkBySlug(slug);

		if (!link) {
			logger.warn(`Redirect attempt with non-existent slug: ${slug}`);
			const error = new Error(ERROR_MESSAGES.SLUG_NOT_FOUND);
			error.statusCode = HTTP_STATUS.NOT_FOUND;
			throw error;
		}

		// HTTP 301 permanent redirect
		return res.redirect(HTTP_STATUS.OK + 101, link.url); // 301
	} catch (error) {
		next(error);
	}
};