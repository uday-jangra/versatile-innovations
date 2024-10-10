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
import '../css/loginRegister.css'
import { Formik } from 'formik'
import registerSchema from '../schemas/registerSchema'
import { Link } from 'react-router-dom'

interface RegisterFormValues {
  email: string
  password: string
  confirmPassword: string
}

function Register() {
  const [loading, setLoading] = useState(false)
  const context = useContext(UserContext)

  const handleRegister = async (values: RegisterFormValues) => {
    setLoading(true)
    await context.register(values.email, values.password)
    setLoading(false)
  }

  return (
    <Container className="container-full-right">
      <Row className="justify-content-md-center">
        <Col className="form-container">
          <h3 className="text-center">Register</h3>
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
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

                <Form.Group controlId="formConfirmPassword" className="mt-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Confirm Password"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 w-100"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </Form>
            )}
          </Formik>
          <Container className="mt-2" style={{ textAlign: 'center' }}>
            <p>
              Already Registered? <Link to="/login">Login</Link>
            </p>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
