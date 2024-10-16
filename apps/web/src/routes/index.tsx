import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './protectedRoute.tsx'
import Login from '../pages/Login.tsx'
import NonProtectedRoutes from './nonProtectedRoutes.tsx'
import Dashboard from '../pages/Dashboard.tsx'
import Register from '../pages/Register.tsx'
import VerificationPage from '../pages/VerificationPage.tsx'
import UserDetailsForm from '../pages/UserDetailsForm.tsx'
import ForgotPassword from '../pages/ForgotPassword.tsx'
import Verify from '../pages/Verify.tsx'

const router = createBrowserRouter([
  {
    path: '/verify',
    element: <Verify />,
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
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
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
        path: 'registrationForm',
        element: <UserDetailsForm />,
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
