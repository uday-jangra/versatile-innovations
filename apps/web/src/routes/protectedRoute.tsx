import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUser } from '../context/authContext'
const ProtectedRoute = () => {
  const { user } = useUser()
  const location = useLocation()
  if (!user) {
    // or you can redirect to a different page and show a message
    return <Navigate to="/login" />
  }
  if (!user.emailVerified && !location.pathname.includes('userNotVerified')) {
    return <Navigate to="/app/userNotVerified" />
  }
  return <Outlet />
}

export default ProtectedRoute
