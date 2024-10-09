import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './protectedRoute.tsx'
import Login from '../pages/Login.tsx'
import NonProtectedRoutes from './nonProtectedRoutes.tsx'
import Dashboard from '../pages/Dashboard.tsx'
import Register from '../pages/Register.tsx'
import VerificationPage from '../pages/VerificationPage.tsx'
import VerifyEmail from '../pages/VerifyEmail.tsx'

const router = createBrowserRouter([
  {
    path: '/verify',
    element: <VerifyEmail />,
  },
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
        path: 'userNotVerified',
        element: <VerificationPage />,
      },
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
