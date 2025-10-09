import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import { AuthLayout } from '../layouts/auth';
import { AppLayout } from '../layouts/app';
import useAuth from '../context/auth';
import PublicRoute from './routes-public';
import PrivateRoute from './routes-private';
import { data } from './routes-default';
import { LoginPage } from '@/pages/login';
import { UnauthorizedPage } from '@/pages/unauthorized';
import { NotFoundPage } from '@/pages/404';

export const RoutesComponent = () => {
  const { isAuthenticated, user } = useAuth();

  const routes = useMemo(() => {
    if (!isAuthenticated) {
      return createBrowserRouter([
        {
          path: '/',
          element: <AuthLayout />,
          children: [
            {
              path: '/',
              element: <PublicRoute element={<LoginPage />} />,
            },
            {
              path: '*',
              element: <PublicRoute element={<LoginPage />} redirectTo="/home" />,
            },
          ],
        },
      ]);
    }

    const userRole = user?.role as keyof typeof data;
    const userRouteGroups = [...(data.Common || []), ...(data[userRole] || data.Unauthorized)];
    console.log(userRouteGroups);

    if (!userRouteGroups || userRouteGroups.length === 0) {
      return createBrowserRouter([
        {
          path: '/',
          element: <AppLayout />,
          children: [
            {
              path: '/',
              element: <PrivateRoute element={<UnauthorizedPage />} />,
            },
            {
              path: '*',
              element: <PrivateRoute element={<UnauthorizedPage />} />,
            },
          ],
        },
      ]);
    }

    const allRoutePaths = new Set<string>();

    Object.keys(data).forEach((role) => {
      if (role !== 'Login' && role !== 'Unauthorized') {
        data[role as keyof typeof data].forEach((group) => {
          group.items.forEach((item) => {
            allRoutePaths.add(item.url);
          });
        });
      }
    });

    const flattenedRoutes = userRouteGroups.flatMap((group) =>
      group.items.map((item) => ({
        path: item.url,
        element: <PrivateRoute element={item.element} />,
        layout: group.layout,
      })),
    );

    const userAccessiblePaths = new Set(flattenedRoutes.map((route) => route.path));
    const defaultLayout = flattenedRoutes[0]?.layout || <AppLayout />;

    return createBrowserRouter([
      {
        path: '/',
        element: defaultLayout,
        children: [
          {
            path: '/',
            element: <PrivateRoute element={flattenedRoutes[0]?.element || <UnauthorizedPage />} />,
          },
          ...flattenedRoutes,
          {
            path: '/unauthorized',
            element: <PrivateRoute element={<UnauthorizedPage />} />,
          },
          ...Array.from(allRoutePaths)
            .filter((path) => !userAccessiblePaths.has(path))
            .map((path) => ({
              path,
              element: <PrivateRoute element={<UnauthorizedPage />} />,
            })),
          {
            path: '*',
            element: <PrivateRoute element={<NotFoundPage />} />,
          },
        ],
      },
    ]);
  }, [isAuthenticated, user]);

  return <RouterProvider router={routes} />;
};
