import * as Yup from 'yup';

export const validationSchemas = {
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),

  phoneNumber: Yup.string()
    .matches(
      /^[\d\s\-+()]+$/,
      'Phone number can only contain digits, spaces, dashes, plus sign and parentheses'
    )
    .min(7, 'Phone number must be at least 7 characters')
    .max(15, 'Phone number must be at most 15 characters')
    .required('Phone number is required'),
};

export const contactSchema = Yup.object({
  name: validationSchemas.name,
  number: validationSchemas.phoneNumber,
});

export const authRegistrationSchema = Yup.object({
  name: validationSchemas.name,
  email: validationSchemas.email,
  password: validationSchemas.password,
});

export const authLoginSchema = Yup.object({
  email: validationSchemas.email,
  password: validationSchemas.password,
});
