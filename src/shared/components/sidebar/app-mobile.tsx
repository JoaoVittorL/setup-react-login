import { LucideIcon, Menu } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components/ui/sheet';
import { cn } from '@/shared/lib/utils';
import { NavMain } from './app-main';
import { useState } from 'react';

import useAuth from '@/shared/context/auth';
import { data } from '@/shared/routes/routes-default';

export function MobileNav() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const role = user?.role ?? 'Unauthorized';

  return (
    <div className="relative">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4 text-gray-600" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className={cn(
            'fixed inset-y-0 left-0 h-[100dvh] w-full border-r p-0',
            '!dark:bg-sidebar text-sidebar-primary-foreground',
            'transition-transform duration-300 ease-in-out',
            'data-[state=closed]:slide-out-to-left',
            'data-[state=open]:slide-in-from-left',
          )}
        >
          <div className="flex h-full w-full flex-col overflow-hidden">
            <div className="itens-center flex w-full px-4 py-2"></div>
            <div className="flex-1 overflow-y-auto">
              {role !== 'Unauthorized' && (
                <NavMain
                  onNavigate={() => setIsOpen(false)}
                  items={data[role as keyof typeof data].map((routeGroup) => ({
                    title: routeGroup.title,
                    url: routeGroup.url,
                    icon: routeGroup.icon as LucideIcon,
                    inSidebar: routeGroup.inSidebar,
                    isActive: routeGroup.isActive,
                    items: routeGroup.items?.map((item) => ({
                      icon: item.icon as LucideIcon,
                      title: item.title,
                      url: item.url,
                    })),
                  }))}
                />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
