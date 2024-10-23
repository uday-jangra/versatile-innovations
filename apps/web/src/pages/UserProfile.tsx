import  { useState, useEffect, useContext } from 'react';
import { UserContext, UserDetails } from '../context/authContext';
import userProfileSchema from '../schemas/userProfileSchema';
import { Formik } from 'formik';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const UserProfile = () => {
  const [formUser, setFormUser] = useState<UserDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const {user, userDetails} = useContext(UserContext)
  const { updateUser } = useContext(UserContext)

  useEffect(() => {
    if(user && userDetails) {
      setFormUser(userDetails)
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (formUser) {
      try {
        await updateUser(formUser.firstName, formUser.lastName, formUser.age)
        setIsEditing(!isEditing);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="container-full-right">
      <Row className="justify-content-md-center" style={{ width: '80%' }}>
        <Col className="form-container">
          <h3 className="text-center mb-4">Profile Information</h3>

          {/* Display email and profile image */}
          <Row className="justify-content-center mb-4">
            <Col xs="auto">
              <img
                src="#"
                alt={
                  userDetails
                    ? `${userDetails.firstName?.charAt(0)}${userDetails.lastName?.charAt(0)}`
                    : 'User'
                }
              />
            </Col>
            <Col xs="auto">
              <p className="text-center">{user?.email}</p>
            </Col>
          </Row>

          {/* Edit Button */}
          <Button className="w-100 mb-4" variant="primary" onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>

          <Formik
            initialValues={{
              firstName: formUser?.firstName || '',
              lastName: formUser?.lastName || '',
              age: formUser?.age || '',
            }}
            validationSchema={userProfileSchema}
            onSubmit={() => handleSave()}
            enableReinitialize // This will reinitialize form values when formUser changes
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
                  <FloatingLabel controlId="floatingFirstName" label="First Name">
                    <Form.Control
                      type="text"
                      name="firstName"
                      className="input-custom"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.firstName && !!errors.firstName}
                      disabled={!isEditing}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="formLastName" className="mt-3">
                  <FloatingLabel controlId="floatingLastName" label="Last Name">
                    <Form.Control
                      type="text"
                      name="lastName"
                      className="input-custom"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.lastName && !!errors.lastName}
                      disabled={!isEditing}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="formAge" className="mt-3">
                  <FloatingLabel controlId="floatingAge" label="Age">
                    <Form.Control
                      type="number"
                      name="age"
                      className="input-custom"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.age && !!errors.age}
                      disabled={!isEditing}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.age}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                {/* Save button */}
                {isEditing && (
                  <Button className="mt-4 w-100 btn-custom" variant="custom" type="submit">
                    Save Changes
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
