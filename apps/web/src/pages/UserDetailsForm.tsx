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
import { toast } from 'react-toastify'
import '../css/loginRegister.css'
import { Formik } from 'formik'
import registerFormSchema from '../schemas/registerFormSchema'

interface RegisterFormValues {
  firstName: string
  lastName: string
  age: number
}

function UserDetailsForm() {
  const [loading, setLoading] = useState(false)
  const { createUser } = useContext(UserContext)

  const handleSubmit = async (values: RegisterFormValues) => {
    setLoading(true)
    try {
      await createUser(values.firstName, values.lastName, values.age)
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
          <Formik
            initialValues={{ firstName: '', lastName: '', age: 0 }}
            validationSchema={registerFormSchema}
            onSubmit={handleSubmit}
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
                <Form.Group controlId="formFirstName">
                  <FloatingLabel controlId="floatingInput" label="First Name">
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.firstName && !!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="formLastName" className="mt-3">
                  <FloatingLabel controlId="floatingInput" label="Last Name">
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.lastName && !!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="formAge" className="mt-3">
                  <FloatingLabel controlId="floatingInput" label="Age">
                    <Form.Control
                      type="number"
                      placeholder="Enter Age"
                      name="age"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.age && !!errors.age}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.age}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 w-100"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Details'}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}

export default UserDetailsForm
