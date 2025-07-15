import { useCallback } from 'react';
import toast from 'react-hot-toast';

export const useErrorHandler = (defaultMessage = 'An error occurred') => {
  const handleError = useCallback(
    (error, customMessage) => {
      const message =
        customMessage || error?.message || error || defaultMessage;
      console.error('Error:', error);
      toast.error(message);
    },
    [defaultMessage]
  );

  const handleAsyncError = useCallback(
    async (asyncFn, errorMessage) => {
      try {
        return await asyncFn();
      } catch (error) {
        handleError(error, errorMessage);
        throw error;
      }
    },
    [handleError]
  );

  return { handleError, handleAsyncError };
};
