import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, SignUpPage } from '@pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
