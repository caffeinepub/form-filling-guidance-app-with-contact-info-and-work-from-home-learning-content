import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import AppLayout from './components/AppLayout';
import GuidedFormFillingPage from './pages/GuidedFormFillingPage';
import ContactSupportPage from './pages/ContactSupportPage';
import LearnPage from './pages/LearnPage';
import LessonDetailPage from './pages/LessonDetailPage';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LearnPage,
});

const guidedFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guided-forms',
  component: GuidedFormFillingPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactSupportPage,
});

const learnRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learn',
  component: LearnPage,
});

const lessonDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learn/$lessonId',
  component: LessonDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  guidedFormRoute,
  contactRoute,
  learnRoute,
  lessonDetailRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
