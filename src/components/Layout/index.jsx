import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppBar from '../AppBar';
import css from './Layout.module.css';

export default function Layout() {
  return (
    <>
      <AppBar />
      <main className={css.main}>
        <Outlet />
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--backdrop-blur)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-color)',
            borderRadius: '12px',
            boxShadow: 'var(--glass-shadow)',
          },
        }}
      />
    </>
  );
}
