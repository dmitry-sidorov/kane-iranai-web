import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, SignInPage, SignUpPage } from '@pages';
import { Layout } from '@/components/layout';
import { RoutePath } from './constants';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: RoutePath.signIn,
        element: <SignInPage />,
      },
      {
        path: RoutePath.signUp,
        element: <SignUpPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
