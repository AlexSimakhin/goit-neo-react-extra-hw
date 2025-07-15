import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';
import ThemeToggle from '../ThemeToggle';
import { selectIsLoggedIn } from '@/redux/auth/selectors';
import css from './AppBar.module.css';

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleHeader = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <header className={`${css.header} ${!isExpanded ? css.collapsed : ''}`}>
      <div className={css.headerContent}>
        <Navigation />
        <div className={css.rightSection}>
          <ThemeToggle />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </div>
      <button
        className={css.toggleBtn}
        onClick={toggleHeader}
        aria-label={isExpanded ? 'Collapse header' : 'Expand header'}
      >
        <span className={`${css.toggleIcon} ${!isExpanded ? css.rotated : ''}`}>
          ▲
        </span>
      </button>
    </header>
  );
}
