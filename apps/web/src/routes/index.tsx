import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './protectedRoute.tsx'
import Login from '../pages/Login.tsx'
import NonProtectedRoutes from './nonProtectedRoutes.tsx'
import Dashboard from '../pages/Dashboard.tsx'
import Register from '../pages/Register.tsx'

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
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/app',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '*',
    element: <div>NOT FOUND</div>,
  },
])

export default router
