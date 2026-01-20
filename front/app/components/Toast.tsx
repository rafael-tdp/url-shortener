/**
 * Toast/Notification component for user feedback
 */

interface ToastProps {
	message: string;
	type: "success" | "error" | "info";
	onClose: () => void;
}

const toastStyles = {
	success: "bg-green-50 border-green-200 text-green-800",
	error: "bg-red-50 border-red-200 text-red-800",
	info: "bg-blue-50 border-blue-200 text-blue-800",
};

export default function Toast({ message, type, onClose }: ToastProps) {
	return (
		<div
			className={`
				fixed top-4 right-4 p-4 border rounded-lg shadow-lg
				${toastStyles[type]}
				animate-fade-in
				flex items-center justify-between
			`}
			role="alert"
		>
			<span>{message}</span>
			<button
				onClick={onClose}
				className="ml-4 font-bold text-lg hover:opacity-70"
				aria-label="Fermer"
			>
				×
			</button>
		</div>
	);
}
