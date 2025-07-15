import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Contact.module.css';
import { FaUser, FaPhone, FaEdit } from 'react-icons/fa';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import EditContactForm from '../EditContactForm';
import { useContactDelete } from '@/hooks/useContactDelete';

const Contact = ({ contact }) => {
  const { id, name, number } = contact;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteContactById, isDeleting } = useContactDelete();

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deleteContactById(id, name);
    if (success) {
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className={css.card}>
        <div className={css.info}>
          <p>
            <FaUser /> {name}
          </p>
          <p>
            <FaPhone /> {number}
          </p>
        </div>
        <div className={css.actions}>
          <button
            onClick={handleEditClick}
            className={css.editBtn}
            disabled={isDeleting}
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className={css.deleteBtn}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={handleCloseEdit}>
        <EditContactForm contact={contact} onClose={handleCloseEdit} />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={handleCancelDelete}>
        <ConfirmDialog
          title="Delete Contact"
          message={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmText="Delete"
          cancelText="Cancel"
        />
      </Modal>
    </>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;
