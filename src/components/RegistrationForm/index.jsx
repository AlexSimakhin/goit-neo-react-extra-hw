import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import css from './RegistrationForm.module.css';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(7, 'Too Short!').required('Required'),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={RegistrationSchema}
      onSubmit={(values, actions) => {
        dispatch(register(values))
          .unwrap()
          .then(() => {
            toast.success('Registration successful!');
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
            <span>Username</span>
            <Field type="text" name="name" className={css.field} placeholder="Enter your full name" />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            <span>Email</span>
            <Field type="email" name="email" className={css.field} placeholder="Enter your email" />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            <span>Password</span>
            <Field type="password" name="password" className={css.field} placeholder="Create a secure password" />
            <ErrorMessage name="password" component="div" className={css.error} />
          </label>
          <button type="submit" className={css.btn} disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
