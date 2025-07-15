import { useSelector, useDispatch } from 'react-redux';
import css from './SearchBox.module.css';
import { changeFilter } from '@/redux/filters/slice';
import { selectNameFilter } from '@/redux/filters/selectors';
import { selectContacts } from '@/redux/contacts/selectors';

const SearchBox = () => {
  const filter = useSelector(selectNameFilter);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  if (!contacts || contacts.length === 0) {
    return null;
  }

  const handleChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.wrapper}>
      <label htmlFor="search">Find contacts by name or phone</label>
      <input id="search" type="text" value={filter} onChange={handleChange} />
    </div>
  );
};

export default SearchBox;
