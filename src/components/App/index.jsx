import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { refreshUser } from '@/redux/auth/operations';
import { selectIsRefreshing } from '@/redux/auth/selectors';
import { PrivateRoute } from '@/components/PrivateRoute';
import { RestrictedRoute } from '@/components/RestrictedRoute';
import Layout from '@/components/Layout';

const HomePage = lazy(() => import('@/pages/HomePage'));
const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const ContactsPage = lazy(() => import('@/pages/ContactsPage'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div
      role="status"
      aria-live="polite"
      style={{ textAlign: 'center', padding: '2rem' }}
    >
      Refreshing user...
    </div>
  ) : (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<RegistrationPage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<ContactsPage />}
                />
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
