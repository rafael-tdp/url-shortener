/**
 * Shortened URL Display component
 * Shows the generated shortened URL with copy functionality
 */

interface ShortenedUrlDisplayProps {
	url: string;
	onCopy: () => void;
}

export default function ShortenedUrlDisplay({ url, onCopy }: ShortenedUrlDisplayProps) {
	return (
		<div
			className="w-full max-w-md p-4 bg-green-50 border border-green-200 rounded-lg"
			role="complementary"
		>
			<p className="text-sm font-semibold mb-2">Votre lien raccourci :</p>
			<div className="flex gap-2">
				<input
					type="text"
					value={url}
					readOnly
					className="flex-1 px-3 py-2 border rounded bg-white font-mono text-sm"
					aria-label="Lien raccourci généré"
				/>
				<button
					onClick={onCopy}
					className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
					aria-label="Copier le lien dans le presse-papiers"
				>
					Copier
				</button>
			</div>
		</div>
	);
}
