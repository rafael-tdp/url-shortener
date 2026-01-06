interface ShortenedUrlDisplayProps {
  url: string;
  onCopy: () => void;
}

export default function ShortenedUrlDisplay({ url, onCopy }: ShortenedUrlDisplayProps) {
  return (
    <div className="w-full max-w-md p-4 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-sm font-semibold mb-2">Votre lien raccourci :</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          readOnly
          className="flex-1 px-3 py-2 border rounded bg-white"
        />
        <button
          onClick={onCopy}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Copier
        </button>
      </div>
    </div>
  );
}
