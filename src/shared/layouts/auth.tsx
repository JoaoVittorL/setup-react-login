import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeToggle } from '../components/theme/theme-toggle';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-150 dark:bg-gray-900 dark:text-gray-100">
      <div className="grid min-h-screen sm:grid-cols-[3fr_2fr]">
        
        <div className="relative hidden bg-muted/50 sm:block">
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>

        <div className="relative flex flex-col">
          <div className="absolute right-6 top-6">
            <ThemeToggle />
          </div>
          <div className="flex flex-1 flex-col justify-center bg-white px-4 py-8 dark:bg-gray-950 sm:px-16">
            <div className="mx-auto w-full max-w-[460px]">
              <div className="mb-8 flex justify-center"></div>
              <h2 className="mb-2 text-center text-lg font-bold dark:text-gray-200 sm:text-xl">
                Bem-vindo à <strong></strong>
              </h2>
              <p className="text-center text-base dark:text-gray-300 sm:text-base">Sistema de login</p>
              <div className="my-4 grid w-full grid-cols-1 items-center gap-4">
                <div className="h-[1px] bg-gray-200 dark:bg-gray-700" />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" richColors expand />
    </div>
  );
}
