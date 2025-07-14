import { useSelector, useDispatch } from 'react-redux';
import css from './SearchBox.module.css';
import { changeFilter, selectNameFilter } from '@/redux/filtersSlice';

const SearchBox = () => {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.wrapper}>
      <label htmlFor="search">Find contacts by name</label>
      <input id="search" type="text" value={filter} onChange={handleChange} />
    </div>
  );
};

export default SearchBox;
