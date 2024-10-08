import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '../context/authContext'
const NonProtectedRoutes = () => {
  const { user } = useUser()
  if (user) {
    return <Navigate to="/dashboard" />
  }
  return <Outlet />
}

export default NonProtectedRoutes
