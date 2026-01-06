import Link from "../models/link.js";

export const createLink = async (req, res) => {
	try {
		const { url } = req.body;

		if (!url) {
			return res.status(400).json({ error: "URL is required" });
		}

		// Validate URL format
		try {
			new URL(url);
		} catch {
			return res.status(400).json({ error: "Invalid URL format" });
		}

		const newLink = await Link.create({ url });
		return res.status(201).json({
			url: newLink.url,
			shortenedUrl: `http://localhost:3000/r/${newLink.slug}`,
		});
	} catch (error) {
		res.status(500).json({ error: `Failed to create shortened URL: ${error.message}` });
	}
};

export const redirectLink = async (req, res) => {
	try {
		const { slug } = req.params;

		if (!slug) {
			return res.status(400).json({ error: "Slug is required" });
		}

		const link = await Link.findOne({ where: { slug } });
		
		if (!link) {
			return res.status(404).send("Lien non trouvé");
		}

		// HTTP redirection
		return res.redirect(301, link.url);
	} catch (error) {
		res.status(500).json({ error: `Failed to redirect: ${error.message}` });
	}
};