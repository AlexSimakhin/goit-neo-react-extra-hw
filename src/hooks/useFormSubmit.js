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
      const errorMsg = error?.message || error || 'Unknown error';
      toast.error(`${errorMessage}: ${errorMsg}`);

      // Handle structured field errors if available
      if (actions?.setFieldError && error?.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, message]) => {
          if (Object.prototype.hasOwnProperty.call(values, field)) {
            actions.setFieldError(field, message);
          }
        });
      } else if (actions?.setFieldError && typeof errorMsg === 'string') {
        // Fallback: try to match error message to field names
        Object.keys(values).forEach(field => {
          if (errorMsg.toLowerCase().includes(field.toLowerCase())) {
            actions.setFieldError(field, errorMsg);
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
