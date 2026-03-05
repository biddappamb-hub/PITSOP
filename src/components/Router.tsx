import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import DriversPage from '@/components/pages/DriversPage';
import DriverDetailPage from '@/components/pages/DriverDetailPage';
import TeamsPage from '@/components/pages/TeamsPage';
import TeamDetailPage from '@/components/pages/TeamDetailPage';
import CalendarPage from '@/components/pages/CalendarPage';
import StandingsPage from '@/components/pages/StandingsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "drivers",
        element: <DriversPage />,
        routeMetadata: {
          pageIdentifier: 'drivers',
        },
      },
      {
        path: "drivers/:id",
        element: <DriverDetailPage />,
        routeMetadata: {
          pageIdentifier: 'driver-detail',
        },
      },
      {
        path: "teams",
        element: <TeamsPage />,
        routeMetadata: {
          pageIdentifier: 'teams',
        },
      },
      {
        path: "teams/:id",
        element: <TeamDetailPage />,
        routeMetadata: {
          pageIdentifier: 'team-detail',
        },
      },
      {
        path: "calendar",
        element: <CalendarPage />,
        routeMetadata: {
          pageIdentifier: 'calendar',
        },
      },
      {
        path: "standings",
        element: <StandingsPage />,
        routeMetadata: {
          pageIdentifier: 'standings',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
