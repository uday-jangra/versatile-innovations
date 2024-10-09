import { useContext, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { UserContext } from '../context/authContext'
import { toast } from 'react-toastify'
import '../css/loginRegister.css'

function UserDetailsForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const { user, createUser } = useContext(UserContext)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isNaN(Number(age)) || Number(age) <= 0) {
      toast.error('Please enter a valid age')
      return
    }

    setLoading(true)
    try {
      await createUser(firstName, lastName, age);
    } catch (error: any) {
      toast.error(`Error saving details: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="container-full-right">
      <Row className="justify-content-md-center">
        <Col className="form-container">
          <h3 className="text-center">User Details</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAge" className="mt-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mt-4"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Details'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default UserDetailsForm
