import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorValidationMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-600" />
      <p className="text-xs text-red-500 dark:text-white-600">{message}</p>
    </div>
  );
}
