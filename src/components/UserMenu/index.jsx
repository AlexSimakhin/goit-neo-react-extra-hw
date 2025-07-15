import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';
import css from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully!');
    } catch {
      toast.error('Logout failed!');
    }
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>{user.name}</p>
      <button type="button" onClick={handleLogout} className={css.btn}>
        Logout
      </button>
    </div>
  );
}
