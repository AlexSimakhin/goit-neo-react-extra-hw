import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { FaUser, FaPhone } from 'react-icons/fa';
import { deleteContact } from '@/redux/contactsOps';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { id, name, number } = contact;

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.card}>
      <div className={css.info}>
        <p>
          <FaUser /> {name}
        </p>
        <p>
          <FaPhone /> {number}
        </p>
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
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
