import { useContext } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { UserContext } from '../context/authContext'

function Dashboard() {
  const context = useContext(UserContext)

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    context.logout()
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Button variant="primary" onClick={handleLogout} className="mt-4">
          Signout
        </Button>
      </Row>
    </Container>
  )
}

export default Dashboard
