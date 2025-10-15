import { PowerOff, User } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ThemeToggle } from '@/shared/components/theme/theme-toggle';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import { Link } from 'react-router-dom';
import { MobileNav } from './app-mobile';
import { HeaderBreadcrumb } from './app-breadcrumb';

import useAuth from '@/shared/context/auth';
export function AppHeader({ tabTitle }: { tabTitle: string }) {
  const { logout, user } = useAuth();
  const { open } = useSidebar();
  const leftClass = open ? 'md:left-64' : 'md:left-12';

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 flex h-12 items-center justify-between gap-2 border-b bg-sidebar-accent px-2 transition-all dark:bg-sidebar ${leftClass}`}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="hidden sm:block" />
        <MobileNav />
        <div className="sm:hidden"></div>
        <HeaderBreadcrumb tabTitle={tabTitle} />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          className="max-h-[30px]"
          variant="outline"
          size={'icon'}
          title="Sair do sistema"
          onClick={logout}
          icon={<PowerOff />}
        />
        <Link to={'/'}>
          <Button
            variant="outline"
            size="default"
            title="Perfil do usuário"
            label={user?.name.split(' ')[0]}
            icon={<User />}
          ></Button>
        </Link>
      </div>
    </header>
  );
}
