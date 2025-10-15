import { type LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/components/ui/sidebar';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router-dom';

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    inSidebar?: boolean;
    isActive?: boolean;
    items?: {
      icon?: LucideIcon;
      title: string;
      url: string;
    }[];
  }[];
  onNavigate?: () => void;
}

export function NavMain({ items, onNavigate }: NavMainProps) {
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          if (item.inSidebar === false) return null;

          const isItemActive = location.pathname === item.url;
          const hasMultipleSubItems = item.items && item.items.length > 1;

          if (!hasMultipleSubItems) {
            const targetUrl = item.items?.[0] ? item.url + item.items[0].url : item.url;
            const isActive = location.pathname === targetUrl;

            return (
              <SidebarMenuItem key={item.title}>
                <Link to={targetUrl} className="text-red-500" onClick={onNavigate}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={
                      isActive
                        ? 'bg-gray-600 text-white transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:text-white'
                        : 'text-white transition-colors duration-200 ease-in-out hover:bg-gray-50 hover:text-gray-500 dark:hover:bg-gray-500'
                    }
                  >
                    {item.icon && <item.icon className={isActive ? 'text-white' : 'text-white'} />}
                    <span className={`text-sm ${isActive ? 'text-white' : 'text-gray-500 dark:text-white'}`}>
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          }

          const isSubItemActive =
            location.pathname === item.url ||
            item.items?.some((subItem) => location.pathname === item.url + subItem.url);

          return (
            <Collapsible key={item.title} asChild defaultOpen={isItemActive} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={isSubItemActive ? 'bg-gray-600 dark:text-white' : 'dark:text-white'}
                  >
                    {item.icon && <item.icon className={isSubItemActive ? 'text-white' : 'text-gray-500'} />}
                    <span className={`text-sm ${isSubItemActive ? 'text-white' : 'text-gray-700 dark:text-white'}`}>
                      {item.title}
                    </span>
                    <ChevronRightIcon
                      className={`ml-auto font-bold text-gray-500 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 dark:text-white ${isSubItemActive ? 'text-white group-data-[state=open]/collapsible:text-white' : 'dark:group-data-[state=open]/collapsible:text-white'}`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubItemActive = location.pathname === item.url + subItem.url;

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <Link to={item.url + subItem.url} onClick={onNavigate}>
                            <SidebarMenuSubButton
                              asChild
                              className={isSubItemActive ? 'bg-gray-600 dark:hover:text-white' : ''}
                            >
                              <div className={isSubItemActive ? 'bg-gray-600 text-white hover:text-white' : ''}>
                                {subItem.icon && <subItem.icon className={isSubItemActive ? '!text-white' : ''} />}
                                <span className="text-sm">{subItem.title}</span>
                              </div>
                            </SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
