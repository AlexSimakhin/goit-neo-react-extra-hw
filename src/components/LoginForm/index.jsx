import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { selectIsLoading, selectAuthError } from '../../redux/auth/selectors';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import css from './LoginForm.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error);
      if (error.includes('email')) {
        actions.setFieldError('email', error);
      } else if (error.includes('password')) {
        actions.setFieldError('password', error);
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            <span>Email</span>
            <Field
              type="email"
              name="email"
              className={`${css.field} ${errors.email && touched.email ? css.fieldError : ''}`}
              placeholder="Enter your email"
              autoComplete="email"
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>
          
          <label className={css.label}>
            <span>Password</span>
            <Field
              type="password"
              name="password"
              className={`${css.field} ${errors.password && touched.password ? css.fieldError : ''}`}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </label>
          
          <button 
            type="submit" 
            className={css.btn} 
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? 'Logging in...' : 'Log In'}
          </button>
          
          {error && (
            <div className={css.generalError} role="alert">
              {error}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
