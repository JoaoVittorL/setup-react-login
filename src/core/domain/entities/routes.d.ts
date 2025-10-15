import { ComponentType } from 'react';

export interface RouteItem {
  icon: ComponentType<any>;
  title: string;
  url: string;
  element: JSX.Element;
}

export interface RouteGroup {
  title: string;
  url: string;
  role?: string;
  icon: ComponentType<any>;
  isActive: boolean;
  layout: JSX.Element;
  inSidebar?: boolean;
  items: RouteItem[];
}

export type UserRole = 'Common' | 'Administrador' | 'Unauthorized';

export type RoutesPages = Record<UserRole | 'Login', RouteGroup[]>;

export interface AccessRoute {
  path: string;
  element: JSX.Element;
}
