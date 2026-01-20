/**
 * URL Input component
 * Handles user input for URLs with validation feedback
 */

interface UrlInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	disabled: boolean;
	loading: boolean;
}

export default function UrlInput({
	value,
	onChange,
	onSubmit,
	disabled,
	loading,
}: UrlInputProps) {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !disabled) {
			onSubmit();
		}
	};

	return (
		<div className="w-full max-w-md flex flex-col gap-4">
			<div>
				<label htmlFor="url-input" className="block text-sm font-medium mb-2">
					Collez votre URL ici :
				</label>
				<input
					id="url-input"
					type="url"
					placeholder="https://example.com/very/long/url"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={handleKeyDown}
					disabled={disabled}
					className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
					aria-label="URL à raccourcir"
				/>
			</div>

			<button
				onClick={onSubmit}
				disabled={disabled}
				className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
				aria-label={loading ? "Génération en cours" : "Générer URL raccourcie"}
			>
				{loading ? "Génération..." : "Générer URL"}
			</button>
		</div>
	);
}
