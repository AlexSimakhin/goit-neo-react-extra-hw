import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './components/ContactForm';
import SearchBox from './components/SearchBox';
import ContactList from './components/ContactList';
import { fetchContacts } from './redux/contactsOps';
import { selectLoading, selectError } from './redux/contactsSlice';

import css from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {error && <p className={css.error}>Error: {error}</p>}
      {loading && <p>Loading contacts...</p>}
      <ContactList />
    </div>
  );
};

export default App;
