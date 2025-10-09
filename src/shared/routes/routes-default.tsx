import { HomeIcon, FileText, BookOpen } from 'lucide-react';
import type { RoutesPages } from '../../core/domain/entities/routes';
import { AppLayout } from '../layouts/app';
import { AuthLayout } from '../layouts/auth';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';

export const data: RoutesPages = {
  Common: [
    {
      title: 'Home',
      url: '',
      icon: HomeIcon,
      isActive: true,
      inSidebar: true,
      layout: <AppLayout />,
      items: [
        {
          icon: HomeIcon,
          title: 'Home',
          url: '/home',
          element: <HomePage />,
        },
      ],
    },
  ],
  Administrador: [],
  Almoxarifado: [],
  Login: [],
  Unauthorized: [
    {
      title: 'Login',
      url: '/login',
      icon: FileText,
      isActive: true,
      layout: <AuthLayout />,
      items: [
        {
          icon: BookOpen,
          title: 'Login',
          url: '/login',
          element: <LoginPage />,
        },
      ],
    },
  ],
};
