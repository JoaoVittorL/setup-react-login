import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '../components/ui/sidebar';
import { AppSidebar } from '../components/sidebar/app-sidebar';
import { AppHeader } from '../components/sidebar/app-header';
import { Toaster } from 'sonner';

export function AppLayout() {
  return (
    <SidebarProvider>
      <Toaster position="bottom-right" richColors expand />
      <div className="flex min-h-screen w-full">
        <AppSidebar className="fixed left-0 top-0 z-20 hidden h-screen md:flex" />
        <div className="mx-auto w-full">
          <AppHeader tabTitle={''} />
          <main className="relative flex h-full w-full flex-1 flex-col gap-4 overflow-auto p-2 pt-14" id="main-content">
            <div className="relative mx-auto w-full flex-1 p-2 shadow-lg sm:bg-sidebar-accent sm:p-4 sm:dark:bg-sidebar md:min-h-min">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
