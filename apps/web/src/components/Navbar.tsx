import { useContext } from 'react'
import { Navbar, Nav, Container, Dropdown, Image } from 'react-bootstrap'
import { UserContext } from '../context/authContext'

function NavbarWithAvatar() {
  const { user, userDetails, logout } = useContext(UserContext)

  const getInitials = () => {
    if (userDetails) {
      return userDetails.firstName[0] + userDetails.lastName[0]
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">KLP</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"> */}
        {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle
              as="div"
              id="dropdown-avatar"
              className="d-flex align-items-center"
            >
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  roundedCircle
                  height="40"
                  width="40"
                  className="me-2"
                />
              ) : (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#fbd1a2',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    textTransform: 'uppercase',
                  }}
                >
                  {getInitials()}
                </div>
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                zIndex: '1000',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Dropdown.Item href="#profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#settings">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => logout(true)}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  )
}

export default NavbarWithAvatar
