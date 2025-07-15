import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import css from './LoginForm.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function LoginForm() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        dispatch(login(values))
          .unwrap()
          .then(() => {
            toast.success('Login successful!');
          })
          .catch((error) => {
            toast.error(error);
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            <span>Email</span>
            <Field type="email" name="email" className={css.field} placeholder="Enter your email" />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            <span>Password</span>
            <Field type="password" name="password" className={css.field} placeholder="Enter your password" />
            <ErrorMessage name="password" component="div" className={css.error} />
          </label>
          <button type="submit" className={css.btn} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
