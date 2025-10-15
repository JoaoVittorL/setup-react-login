import { Loader2 } from 'lucide-react';

export function LoadingSpinner({
  title = 'Buscando dados...',
  message = 'Por favor, aguarde um momento',
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse rounded-full bg-green-500/20 blur-xl"></div>
        <div className="bg-white relative rounded-full p-4 shadow-lg dark:bg-gray-800">
          <Loader2 className="h-8 w-8 animate-spin text-green-500" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
      </div>
      <div className="mt-2 flex gap-1.5">
        <div className="h-2 w-2 animate-bounce rounded-full bg-green-500" style={{ animationDelay: '0ms' }}></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-green-500" style={{ animationDelay: '150ms' }}></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-green-500" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}
