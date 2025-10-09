import './shared/styles/index.css';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './shared/lib/react-query';
import { ThemeProvider } from './shared/components/theme/theme-provider';
import { RoutesComponent } from './shared/routes/routes';
import { AuthProvider } from './shared/context/auth';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from './shared/providers/modal-provider';
export function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <ThemeProvider storageKey="app-theme" defaultTheme="dark">
              <Helmet titleTemplate="Futuro | %s" />
              <Toaster position="bottom-right" reverseOrder={false} />
              <RoutesComponent />
            </ThemeProvider>
          </ModalProvider>
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
