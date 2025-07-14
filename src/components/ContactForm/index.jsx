import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import css from './ContactForm.module.css';
import { useId } from 'react';
import { addContact } from '@/redux/contactsOps';

const schema = Yup.object({
  name: Yup.string().min(3).max(50).required('Required'),
  number: Yup.string()
    .matches(
      /^[\d\s\-\+\(\)]+$/,
      'Phone number can only contain digits, spaces, dashes, plus sign and parentheses'
    )
    .min(7, 'Phone number must be at least 7 characters')
    .max(15, 'Phone number must be at most 15 characters')
    .required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameId = useId();
  const numberId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form className={css.form}>
        <div className={css.field}>
          <label htmlFor={nameId}>Name</label>
          <Field id={nameId} name="name" type="text" />
          <ErrorMessage name="name" component="span" />
        </div>

        <div className={css.field}>
          <label htmlFor={numberId}>Number</label>
          <Field id={numberId} name="number" type="text" />
          <ErrorMessage name="number" component="span" />
        </div>

        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
