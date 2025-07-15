import { useState } from 'react';
import toast from 'react-hot-toast';

export const useFormSubmit = (
  submitAction,
  successMessage = 'Operation successful!',
  errorMessage = 'Operation failed',
  onSuccess
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, actions, dispatch) => {
    setIsSubmitting(true);
    try {
      await dispatch(submitAction(values)).unwrap();
      toast.success(successMessage);
      if (onSuccess) {
        onSuccess(values);
      }
      if (actions?.resetForm) {
        actions.resetForm();
      }
    } catch (error) {
      toast.error(`${errorMessage}: ${error}`);

      if (actions?.setFieldError) {
        Object.keys(values).forEach(field => {
          if (error.toLowerCase().includes(field.toLowerCase())) {
            actions.setFieldError(field, error);
          }
        });
      }
    } finally {
      setIsSubmitting(false);
      if (actions?.setSubmitting) {
        actions.setSubmitting(false);
      }
    }
  };

  return { handleSubmit, isSubmitting };
};
