import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../context/authContext'
const ProtectedRoute = () => {
  const { user } = useUser()
  if (!user) {
    // or you can redirect to a different page and show a message
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default ProtectedRoute
