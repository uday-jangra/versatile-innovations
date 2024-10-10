import * as Yup from 'yup';

const registerFormSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .min(3, 'You must be at least 3 years old')
    .integer('Age must be a valid number'),
});

export default registerFormSchema;