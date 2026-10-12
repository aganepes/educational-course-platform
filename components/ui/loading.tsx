interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Ýüklenýär..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-50 p-6 w-full">
      {/* Spinner Animator */}
      <div className="relative flex items-center justify-center mb-3">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-sm font-medium text-gray-600 animate-pulse">{message}</p>
    </div>
  );
}