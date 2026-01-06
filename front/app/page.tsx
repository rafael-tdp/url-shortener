"use client";

import React from "react";
import { createLink } from "./lib/api";
import UrlInput from "./components/UrlInput";
import ShortenedUrlDisplay from "./components/ShortenedUrlDisplay";
import ErrorMessage from "./components/ErrorMessage";

export default function Home() {
	const [shortenedUrl, setShortenedUrl] = React.useState<string | null>(null);
	const [originalUrl, setOriginalUrl] = React.useState<string>("");
	const [error, setError] = React.useState<string>("");
	const [loading, setLoading] = React.useState(false);

	const generateUrl = async () => {
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

				<UrlInput
					value={originalUrl}
					onChange={setOriginalUrl}
					onSubmit={generateUrl}
					disabled={loading}
					loading={loading}
				/>

				{error && <ErrorMessage message={error} />}

				{shortenedUrl && (
					<ShortenedUrlDisplay url={shortenedUrl} onCopy={copyToClipboard} />
				)}
			</main>
		</div>
	);
}
