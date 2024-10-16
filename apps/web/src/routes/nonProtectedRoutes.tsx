import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useUser } from '../context/authContext'
import { Container } from 'react-bootstrap'
import '../css/loginRegisterContainer.css'

const LoginRegisterContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Container className="container-full">
      <Container className="left-side">
        <h1 className="text-center">Kids Learning Platform</h1>
      </Container>
      <Container className="right-side">{children}</Container>
    </Container>
  )
}

const NonProtectedRoutes = () => {
  const location = useLocation()
  const { user } = useUser()
  if (user) {
    return <Navigate to="/app/dashboard" />
  }
  if (
    location.pathname.includes('/login') ||
    location.pathname.includes('/register') ||
    location.pathname.includes('/forgot-password')
  ) {
    return (
      <LoginRegisterContainer>
        <Outlet />
      </LoginRegisterContainer>
    )
  }
  return <Navigate to="/login" />
}

export default NonProtectedRoutes
