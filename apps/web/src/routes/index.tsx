import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './protectedRoute.tsx'
import Login from '../pages/Login.tsx'
import NonProtectedRoutes from './nonProtectedRoutes.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <NonProtectedRoutes />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            element: <div>Home</div>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>NOT FOUND</div>,
  },
])

export default router
