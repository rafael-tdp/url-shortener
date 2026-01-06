"use client";

import React from "react";
import { createLink } from "./lib/api";

export default function Home() {
	const [shortenedUrl, setShortenedUrl] = React.useState<string | null>(null);
	const [originalUrl, setOriginalUrl] = React.useState<string>("");
	const [error, setError] = React.useState<string>("");
	const [loading, setLoading] = React.useState(false);

	const generateUrl = async () => {
    // Check for empty input
		if (!originalUrl.trim()) {
			setError("Veuillez entrer une URL");
			return;
		}

		try {
			setLoading(true);
			setError("");
			const response = await createLink(originalUrl);
			setShortenedUrl(response.shortenedUrl);
			setOriginalUrl("");
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Erreur lors de la création du lien"
			);
		} finally {
			setLoading(false);
		}
	};

	const copyToClipboard = () => {
		if (shortenedUrl) {
			navigator.clipboard.writeText(shortenedUrl);
			alert("Lien copié !");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex flex-col items-center justify-center w-full max-w-3xl py-32 px-16 bg-white dark:bg-black gap-8">
				<h1 className="text-4xl font-bold">Raccourcisseur d'URL</h1>

				<div className="w-full max-w-md flex flex-col gap-4">
					<input
						type="url"
						placeholder="Collez votre URL ici..."
						value={originalUrl}
						onChange={(e) => setOriginalUrl(e.target.value)}
						disabled={loading}
						className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<button
						onClick={generateUrl}
						disabled={loading}
						className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
					>
						{loading ? "Génération..." : "Générer URL"}
					</button>

					{error && <p className="text-red-500 text-sm">{error}</p>}

					{shortenedUrl && (
						<div className="p-4 bg-green-50 border border-green-200 rounded-lg">
							<p className="text-sm font-semibold mb-2">
								Votre lien raccourci :
							</p>
							<div className="flex gap-2">
								<input
									type="text"
									value={shortenedUrl}
									readOnly
									className="flex-1 px-3 py-2 border rounded bg-white"
								/>
								<button
									onClick={copyToClipboard}
									className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
								>
									Copier
								</button>
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
