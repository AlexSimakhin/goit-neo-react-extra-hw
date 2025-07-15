import { useSelector } from 'react-redux';
import Contact from '../Contact';
import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/contacts/selectors';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
