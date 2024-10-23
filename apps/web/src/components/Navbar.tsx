import { useContext, useState } from 'react'
import { Nav, Container, Image, Button, Collapse } from 'react-bootstrap'
import { UserContext } from '../context/authContext'
import { Link, useLocation } from 'react-router-dom'
type Props = { children: React.ReactNode }

function NavbarWithAvatar({ children }: Props) {
  const [open, setOpen] = useState(false)
  const { user, userDetails, logout } = useContext(UserContext)
  const location = useLocation()
  const getInitials = () => {
    if (userDetails) {
      return userDetails.firstName[0] + userDetails.lastName[0]
    } else {
      return 'NU'
    }
  }

  return (
    <div className="d-flex">
      <div
        className="bg-light border-right vh-100 position-relative"
        style={{
          width: open ? '250px' : '60px',
          transition: 'width 0.3s',
        }}
      >
        <div
          className="text-center mt-3"
          style={{
            paddingLeft: '10px',
            paddingRight: '10px',
            display: 'flex',
            justifyContent: open ? 'flex-start' : 'center',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              textAlign: 'left',
              paddingLeft: '5px',
              paddingTop: open ? '30px' : '5px',
              transition: 'right 0.3s, transform 0.3s',
              fontWeight: 'bold',
              width: open ? '250px' : '40px',
            }}
          >
            KLP
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: open ? '10px' : '50%',
            transform: open ? 'none' : 'translateX(50%)',
            transition: 'right 0.3s, transform 0.3s',
          }}
        >
          <Button
            onClick={() => setOpen(!open)}
            className="mt-3"
            style={{
              backgroundColor: 'transparent',
              color: 'black',
              border: 0,
              fontSize: '30px',
            }}
            aria-controls="collapse-sidebar"
            aria-expanded={open}
          >
            {open ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-list"></i>
            )}
          </Button>
        </div>

        {/* Collapsible Links - Only show when expanded */}
        <Collapse in={open}>
          <div id="collapse-sidebar">
            <Nav className="flex-column mt-4">
              <Container
                fluid
                style={{
                  paddingLeft: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {!(
                  location.pathname.includes('userNotVerified') ||
                  location.pathname.includes('registrationForm')
                ) && (
                  <>
                    <Link
                      style={{ textDecoration: 'none', padding: '10px 0px' }}
                      to="/app/dashboard"
                      onClick={() => setOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      style={{ textDecoration: 'none', padding: '10px 0px' }}
                      to="#"
                      onClick={() => setOpen(false)}
                    >
                      Report Generation
                    </Link>
                    <Link
                      style={{ textDecoration: 'none', padding: '10px 0px' }}
                      to="/app/profile"
                      onClick={() => setOpen(false)}
                    >
                      Profile Settings
                    </Link>
                  </>
                )}
                <Link
                  style={{ textDecoration: 'none', padding: '10px 0px' }}
                  onClick={() => {
                    setOpen(false)
                    logout(true)
                  }}
                  to="#"
                >
                  Logout
                </Link>
              </Container>
            </Nav>
          </div>
        </Collapse>
        <div
          className="d-flex align-items-center"
          style={{
            position: 'absolute',
            bottom: '20px',
            width: '100%',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {/* Avatar */}
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
          {/* Username - Only visible when expanded */}
          {open && (
            <span
              style={{
                whiteSpace: 'nowrap',
                transition: 'opacity 0.3s',
                marginLeft: '10px',
              }}
            >
              {userDetails ? (
                <>
                  {userDetails?.firstName} {userDetails?.lastName}
                </>
              ) : (
                'New User'
              )}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-3"
        onClick={() => {
          if (open) setOpen(false)
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default NavbarWithAvatar
