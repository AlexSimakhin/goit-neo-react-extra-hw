import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import { selectIsLoading } from '../../redux/contacts/selectors';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import css from './EditContactForm.module.css';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default function EditContactForm({ contact, onClose }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(updateContact({ 
        contactId: contact.id, 
        contactData: values 
      })).unwrap();
      toast.success(`Contact "${values.name}" updated successfully!`);
      onClose();
    } catch {
      toast.error('Failed to update contact');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: contact.name,
        number: contact.number,
      }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            <span>Name</span>
            <Field
              type="text"
              name="name"
              className={`${css.field} ${errors.name && touched.name ? css.fieldError : ''}`}
              placeholder="Enter contact name"
            />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>
          
          <label className={css.label}>
            <span>Number</span>
            <Field
              type="tel"
              name="number"
              className={`${css.field} ${errors.number && touched.number ? css.fieldError : ''}`}
              placeholder="Enter phone number"
            />
            <ErrorMessage name="number" component="div" className={css.error} />
          </label>
          
          <div className={css.buttons}>
            <button 
              type="submit" 
              className={css.submitBtn} 
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? 'Updating...' : 'Update Contact'}
            </button>
            <button 
              type="button" 
              className={css.cancelBtn} 
              onClick={onClose}
              disabled={isSubmitting || isLoading}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
