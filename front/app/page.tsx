"use client";

import React from "react";
import { createLink } from "./lib/api";
import { validateUrl } from "./lib/validators";
import UrlInput from "./components/UrlInput";
import ShortenedUrlDisplay from "./components/ShortenedUrlDisplay";
import Toast from "./components/Toast";

/**
 * Home page - Main URL shortener component
 */
export default function Home() {
	const [shortenedUrl, setShortenedUrl] = React.useState<string | null>(null);
	const [originalUrl, setOriginalUrl] = React.useState<string>("");
	const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null);
	const [loading, setLoading] = React.useState(false);

	const generateUrl = async () => {
		// Validate URL on client side first
		const validation = validateUrl(originalUrl);
		if (!validation.isValid) {
			setToast({ message: validation.error || "URL invalide", type: "error" });
			return;
		}

		try {
			setLoading(true);
			const response = await createLink(originalUrl);
			setShortenedUrl(response.shortenedUrl);
			setOriginalUrl("");
			setToast({ message: "Lien créé avec succès !", type: "success" });
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Erreur lors de la création du lien";
			setToast({ message: errorMessage, type: "error" });
		} finally {
			setLoading(false);
		}
	};

	const copyToClipboard = async () => {
		if (shortenedUrl) {
			try {
				await navigator.clipboard.writeText(shortenedUrl);
				setToast({ message: "Lien copié dans le presse-papiers !", type: "success" });
			} catch {
				setToast({ message: "Erreur lors de la copie", type: "error" });
			}
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex flex-col items-center justify-center w-full max-w-3xl py-32 px-16 bg-white dark:bg-black gap-8">
				<h1 className="text-4xl font-bold text-center">Raccourcisseur d'URL</h1>
				<p className="text-gray-600 text-center">Transformez vos URLs longues en liens courts et partageables</p>

				<UrlInput
					value={originalUrl}
					onChange={setOriginalUrl}
					onSubmit={generateUrl}
					disabled={loading}
					loading={loading}
				/>

				{shortenedUrl && <ShortenedUrlDisplay url={shortenedUrl} onCopy={copyToClipboard} />}

				{toast && (
					<Toast
						message={toast.message}
						type={toast.type}
						onClose={() => setToast(null)}
					/>
				)}
			</main>
		</div>
	);
}

