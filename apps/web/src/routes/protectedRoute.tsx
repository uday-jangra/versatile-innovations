import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { UserContext, useUser } from '../context/authContext'
import { useContext } from 'react'

const ProtectedRoute = () => {
  const { user } = useUser()
  const { isFirstTimeUser } = useContext(UserContext)
  const location = useLocation()
  if (!user) {
    // or you can redirect to a different page and show a message
    return <Navigate to="/login" />
  }
  if (!user.emailVerified && !location.pathname.includes('userNotVerified')) {
    return <Navigate to="/app/userNotVerified" />
  }
  // Check if the user is a first-time user, and if so, redirect to UserDetails page

  if (isFirstTimeUser && !location.pathname.includes('registrationForm')) {
    return <Navigate to="/app/registrationForm" />
  }
  return <Outlet />
}

export default ProtectedRoute
