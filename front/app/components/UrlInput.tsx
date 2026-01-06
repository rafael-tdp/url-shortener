interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  loading: boolean;
}

export default function UrlInput({ value, onChange, onSubmit, disabled, loading }: UrlInputProps) {
  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      <input
        type="url"
        placeholder="Collez votre URL ici..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        disabled={disabled}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />

      <button
        onClick={onSubmit}
        disabled={disabled}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
      >
        {loading ? "Génération..." : "Générer URL"}
      </button>
    </div>
  );
}
