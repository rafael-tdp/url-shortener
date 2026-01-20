/**
 * API client for communicating with the backend
 */

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

interface CreateLinkResponse {
	url: string;
	shortenedUrl: string;
	slug: string;
}

/**
 * Creates a shortened link from a long URL
 * @param {string} url - The original URL to shorten
 * @returns {Promise<CreateLinkResponse>} The shortened URL and metadata
 * @throws {Error} If the request fails or URL is invalid
 */
export async function createLink(url: string): Promise<CreateLinkResponse> {
	try {
		const res = await fetch(`${API_BASE}/api/links`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ url }),
		});

		const json = await res.json();

		if (!res.ok) {
			throw new Error(json?.error || "Erreur lors de la création du lien raccourci");
		}

		return json;
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Erreur réseau");
	}
}