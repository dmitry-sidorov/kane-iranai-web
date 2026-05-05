import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, SignInPage, SignUpPage } from '@pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
