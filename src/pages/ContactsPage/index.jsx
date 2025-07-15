import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../../components/ContactForm';
import SearchBox from '../../components/SearchBox';
import ContactList from '../../components/ContactList';
import { fetchContacts } from '@/redux/contacts/operations';
import { selectIsLoading, selectError } from '@/redux/contacts/selectors';
import css from './ContactsPage.module.css';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {error && <p className={css.error}>Error: {error}</p>}
      {loading && <p className={css.loading}>Loading contacts...</p>}
      <ContactList />
    </div>
  );
}
