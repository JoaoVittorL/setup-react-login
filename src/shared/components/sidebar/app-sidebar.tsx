import * as React from 'react';
import { NavMain } from '@/shared/components/sidebar/app-main';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/shared/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';

import useAuth from '@/shared/context/auth';
import { data } from '@/shared/routes/routes-default';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  const role = user?.type ?? 'Unauthorized';

  return (
    <Sidebar className="z-50" collapsible="icon" {...props}>
      <SidebarHeader className="flex w-full justify-center border-b bg-sidebar-accent text-center dark:bg-sidebar">
        <div className="mx-auto flex h-8 items-center"></div>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar-accent dark:bg-sidebar">
        {role !== 'Unauthorized' && (
          <NavMain
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
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="mx-auto flex w-full justify-center p-2"></SidebarFooter>
    </Sidebar>
  );
}
