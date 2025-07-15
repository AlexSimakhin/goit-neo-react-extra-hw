import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contacts/operations';
import toast from 'react-hot-toast';

export const useContactDelete = () => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteContactById = async (contactId, contactName) => {
    setIsDeleting(true);
    try {
      await dispatch(deleteContact(contactId)).unwrap();
      toast.success('Contact deleted successfully!');
      return true;
    } catch (error) {
      toast.error(error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteContactById, isDeleting };
};
