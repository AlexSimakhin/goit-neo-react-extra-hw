import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { FaUser, FaPhone } from 'react-icons/fa';
import { deleteContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { id, name, number } = contact;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success('Contact deleted successfully!');
      })
      .catch((error) => {
        toast.error(error);
      });
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
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
        <button onClick={handleDeleteClick} className={css.deleteBtn}>
          Delete
        </button>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={handleCancelDelete}>
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
