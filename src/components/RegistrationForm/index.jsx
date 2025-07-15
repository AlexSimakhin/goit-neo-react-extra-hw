import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { selectIsLoading } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';
import css from './RegistrationForm.module.css';
import { authRegistrationSchema } from '../../utils/validationSchemas';

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={authRegistrationSchema}
      onSubmit={(values, actions) => {
        dispatch(register(values))
          .unwrap()
          .then(() => {
            toast.success(`Welcome, ${values.name}! Registration successful!`);
          })
          .catch(error => {
            toast.error(`Registration failed: ${error}`);
            if (error.includes('email')) {
              actions.setFieldError('email', error);
            } else if (error.includes('password')) {
              actions.setFieldError('password', error);
            }
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            <span>Username</span>
            <Field
              type="text"
              name="name"
              className={css.field}
              placeholder="Enter your full name"
            />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            <span>Email</span>
            <Field
              type="email"
              name="email"
              className={css.field}
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            <span>Password</span>
            <Field
              type="password"
              name="password"
              className={css.field}
              placeholder="Create a secure password"
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
            {isSubmitting || isLoading ? 'Registering...' : 'Register'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
