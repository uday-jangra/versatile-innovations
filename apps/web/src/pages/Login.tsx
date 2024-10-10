import { useContext, useState } from 'react'
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
} from 'react-bootstrap'
import { UserContext } from '../context/authContext'
import { Formik } from 'formik'
import '../css/loginRegister.css'
import loginSchema from '../schemas/loginSchema'
import { Link } from 'react-router-dom'

// Define the types for form values
interface LoginFormValues {
  email: string
  password: string
}

function Login() {
  const [loading, setLoading] = useState(false)
  const context = useContext(UserContext)

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true)
    await context.login(values.email, values.password)
    setLoading(false)
  }

  return (
    <Container className="container-full-right">
      <Row className="justify-content-md-center">
        <Col className="form-container">
          <h3 className="text-center mb-4">Login</h3>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={(values) => handleLogin(values)}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email Address"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <FloatingLabel controlId="floatingInput" label="Password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 w-100"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>
          <Container style={{ textAlign: 'center' }}>
            <p>
              New User? <Link to="/register">Register Now</Link>
              <br />
              <Link to="#">Forgot Password</Link>
            </p>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
